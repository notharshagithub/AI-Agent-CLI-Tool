import "dotenv/config";
import readline from "readline";
import chalk from "chalk";
import ora from "ora";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import {
  generateWebsiteHTML,
  analyzeScalerWebsite,
  executeCommand,
} from "./tools.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error(chalk.red("❌ Error: GEMINI_API_KEY not found in .env file"));
  process.exit(1);
}

const MODEL = "gemini-flash-latest";
const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// Function to call Gemini API directly with retry logic
async function callGeminiAPI(prompt, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        const errorData = error.error || {};
        
        // Handle rate limiting (429) and overload (503)
        if ((response.status === 429 || response.status === 503) && attempt < retries) {
          // Try to extract retry delay from API response
          let waitTime = 5000; // Default 5 seconds
          
          if (errorData.details) {
            const retryInfo = errorData.details.find(d => d["@type"] && d["@type"].includes("RetryInfo"));
            if (retryInfo && retryInfo.retryDelay) {
              const delayStr = retryInfo.retryDelay;
              waitTime = parseInt(delayStr) * 1000 || 5000;
            }
          }
          
          const statusText = response.status === 429 ? "Rate limited" : "Overloaded";
          console.log(
            chalk.yellow(
              `⚠️  API ${statusText} (${response.status}). Waiting ${waitTime / 1000}s... (Attempt ${attempt}/${retries})`
            )
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          continue;
        }
        
        throw new Error(`API Error ${response.status}: ${errorData.message || JSON.stringify(error)}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error) {
      if (attempt === retries) {
        console.error(chalk.red("❌ API Error (max retries reached):"), error.message);
        throw error;
      }
      const waitTime = Math.pow(2, attempt) * 1000;
      console.log(
        chalk.yellow(`⏳ Retrying in ${waitTime / 1000}s... (Attempt ${attempt}/${retries})`)
      );
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
}

// Tool mapping for the agent
const tool_map = {
  generateWebsiteHTML: generateWebsiteHTML,
  analyzeScalerWebsite: analyzeScalerWebsite,
  executeCommand: executeCommand,
};

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

const SYSTEM_PROMPT = `You are an expert AI Agent that helps users build websites. You work in a structured workflow:

INPUT → THINK → TOOL → OBSERVE → OUTPUT

You have access to these tools:
1. generateWebsiteHTML(projectName, description, templateType): Generates a complete HTML/CSS/JS website file

RULES:
- Always follow JSON format for responses
- Take one step at a time
- Do minimal thinking steps to save API quota
- For "clone scaler" requests: projectName="Scaler Academy", description="Learn In-Demand Skills from Industry Experts", templateType="scaler"
- For custom requests: analyze the request and generate appropriate projectName and description
- Be brief and efficient
- Generate high-quality, visually appealing websites

Response format:
{
  "step": "START | THINK | TOOL | OUTPUT",
  "content": "Your response text",
  "tool_name": "generateWebsiteHTML (only for TOOL step)",
  "tool_args": "JSON string (only for TOOL step)"
}

Always respond in valid JSON format. Be efficient with API calls.`;

async function runAgent(userMessage) {
  const spinner = ora();
  let stepCount = 0;
  const maxSteps = 20;
  let conversationHistory = "";

  try {
    while (stepCount < maxSteps) {
      stepCount++;
      spinner.start("Agent is thinking...");

      const prompt =
        stepCount === 1
          ? `${SYSTEM_PROMPT}\n\nUser request: ${userMessage}\n\nRespond with your first step in JSON format.`
          : `${SYSTEM_PROMPT}\n\nContinue the conversation.\nUser original request: ${userMessage}\n\nConversation history:\n${conversationHistory}\n\nRespond with the next step in JSON format.`;

      const responseText = await callGeminiAPI(prompt);
      spinner.stop();

      let parsedResponse;

      try {
        // Extract JSON from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          console.log(
            chalk.yellow("⚠️  Could not parse JSON response, retrying...")
          );
          continue;
        }
        parsedResponse = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.log(chalk.red("❌ Failed to parse response as JSON"));
        console.log("Raw response:", responseText);
        continue;
      }

      // Display step
      if (parsedResponse.step === "START") {
        console.log(chalk.cyan("\n📍 START"));
        console.log(chalk.gray(parsedResponse.content));
      } else if (parsedResponse.step === "THINK") {
        console.log(chalk.blue("\n💭 THINKING"));
        console.log(chalk.gray(parsedResponse.content));
      } else if (parsedResponse.step === "TOOL") {
        console.log(chalk.magenta("\n🔧 USING TOOL"));
        console.log(chalk.gray(`Tool: ${parsedResponse.tool_name}`));

        let toolResult;
        if (!tool_map[parsedResponse.tool_name]) {
          toolResult = `Tool '${parsedResponse.tool_name}' not available`;
          console.log(chalk.red(`❌ ${toolResult}`));
        } else {
          try {
            const args = JSON.parse(parsedResponse.tool_args);
            spinner.start(`Executing ${parsedResponse.tool_name}...`);
            toolResult = await tool_map[parsedResponse.tool_name](args);
            spinner.stop();
            console.log(chalk.green(`✅ Tool executed successfully`));
          } catch (toolError) {
            spinner.stop();
            toolResult = `Error: ${toolError.message}`;
            console.log(chalk.red(`❌ ${toolResult}`));
          }
        }

        // Add to conversation history
        conversationHistory += `\nAssistant: ${JSON.stringify(parsedResponse)}\nObservation: ${toolResult}`;
      } else if (parsedResponse.step === "OBSERVE") {
        console.log(chalk.yellow("\n👁️  OBSERVATION"));
        console.log(chalk.gray(parsedResponse.content));
      } else if (parsedResponse.step === "OUTPUT") {
        console.log(chalk.green("\n✨ OUTPUT"));
        console.log(chalk.white(parsedResponse.content));
        console.log(chalk.green("\n🎉 Agent task completed!\n"));
        break;
      }

      // Add to conversation history
      conversationHistory += `\nStep ${stepCount}: ${JSON.stringify(parsedResponse)}`;
    }

    if (stepCount >= maxSteps) {
      console.log(
        chalk.yellow(
          "\n⚠️  Reached maximum steps. Ending agent loop to prevent infinite loops."
        )
      );
    }
  } catch (error) {
    console.error(chalk.red("\n❌ Error during agent execution:"), error);
  }
}

async function main() {
  console.clear();
  console.log(
    chalk.cyan.bold(
      "\n╔════════════════════════════════════════════════════════════╗"
    )
  );
  console.log(
    chalk.cyan.bold(
      "║           AI AGENT - Website Cloning System               ║"
    )
  );
  console.log(
    chalk.cyan.bold(
      "║                                                            ║"
    )
  );
  console.log(
    chalk.cyan.bold(
      "║   Build professional websites using AI reasoning loop      ║"
    )
  );
  console.log(
    chalk.cyan.bold(
      "╚════════════════════════════════════════════════════════════╝\n"
    )
  );

  console.log(
    chalk.yellow(
      "Available Commands:\n  • clone scaler    - Clone Scaler Academy website\n  • create [name]   - Create custom website\n  • exit             - Exit the application\n"
    )
  );

  while (true) {
    try {
      const userInput = await question(chalk.cyan("🤖 You: "));

      if (userInput.toLowerCase() === "exit") {
        console.log(chalk.green("\n👋 Goodbye!\n"));
        rl.close();
        break;
      }

      if (userInput.toLowerCase() === "clone scaler") {
        await runAgent(
          "Create a professional HTML/CSS/JavaScript clone of the Scaler Academy website. Include a responsive header with navigation, a hero section with call-to-action, course listings, and a footer. Make it visually stunning and modern."
        );
      } else if (userInput.toLowerCase().startsWith("create ")) {
        const projectName = userInput.substring(7).trim();
        await runAgent(
          `Create a professional website for: ${projectName}. Make it look modern, include a header, hero section with value proposition, features/services section, and footer. Use attractive colors and professional styling.`
        );
      } else if (userInput.trim()) {
        await runAgent(userInput);
      }
    } catch (error) {
      if (error.code !== "ERR_USE_AFTER_CLOSE") {
        console.error(chalk.red("Error:"), error);
      }
    }
  }
}

main().catch(console.error);
