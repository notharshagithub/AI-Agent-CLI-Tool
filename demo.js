#!/usr/bin/env node

import "dotenv/config";
import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { generateWebsiteHTML } from "./tools.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function quickDemo() {
  console.clear();
  console.log(
    chalk.cyan.bold(
      "\n╔════════════════════════════════════════════════════════════╗"
    )
  );
  console.log(
    chalk.cyan.bold(
      "║   🚀 AI AGENT - Quick Demo (No API Quota Needed!)          ║"
    )
  );
  console.log(
    chalk.cyan.bold(
      "║                                                            ║"
    )
  );
  console.log(
    chalk.cyan.bold(
      "║   Generate professional websites instantly!               ║"
    )
  );
  console.log(
    chalk.cyan.bold(
      "╚════════════════════════════════════════════════════════════╝\n"
    )
  );

  console.log(
    chalk.yellow("📋 Generating Scaler Academy Website Clone...\n")
  );

  try {
    const result = await generateWebsiteHTML({
      projectName: "Scaler Academy",
      description:
        "Master in-demand programming skills from industry experts with live classes, hands-on projects, and lifetime access.",
      templateType: "scaler",
    });

    const parsed = JSON.parse(result);

    if (parsed.success) {
      console.log(chalk.green("✅ Website Generated Successfully!\n"));
      console.log(chalk.cyan("📂 File Details:"));
      console.log(chalk.gray(`   Name: ${parsed.filename}`));
      console.log(chalk.gray(`   Size: ${parsed.filesize} bytes`));
      console.log(chalk.gray(`   Path: ${parsed.path}\n`));

      console.log(chalk.cyan("📖 Instructions:"));
      console.log(chalk.gray(`   1. Open the file in your browser:`));
      console.log(chalk.white.bold(`      ${parsed.path}\n`));
      console.log(chalk.gray(`   2. Or use these commands:\n`));
      console.log(chalk.yellow(`      Linux/Mac:  open ${parsed.filename}`));
      console.log(chalk.yellow(`      Windows:    start ${parsed.filename}`));
      console.log(chalk.yellow(`      Firefox:    firefox ${parsed.filename}\n`));

      console.log(chalk.green("🎉 Your website is ready to view!"));
      console.log(
        chalk.cyan(
          "\n💡 Features included: Responsive header, hero section, features showcase,"
        )
      );
      console.log(chalk.cyan("   course listings, smooth animations, and professional footer.\n"));
    } else {
      console.error(chalk.red("❌ Generation failed:"), parsed.error);
    }
  } catch (error) {
    console.error(chalk.red("❌ Error:"), error.message);
  }
}

quickDemo();
