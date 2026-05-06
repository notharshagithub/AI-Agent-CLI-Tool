# Quick Start Guide - AI Agent Website Cloner

## 🎯 5-Minute Setup

### Step 1: Verify Installation
```bash
cd /home/harsha/Documents/GenAi/ass2
npm install
```

### Step 2: Start the Agent
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════════════════════╗
║           AI AGENT - Website Cloning System               ║
╚════════════════════════════════════════════════════════════╝
```

### Step 3: Clone Scaler Website
Type this command:
```
clone scaler
```

Watch as the AI agent:
1. Analyzes the Scaler design
2. Generates HTML file
3. Creates your website

### Step 4: Open the Generated File
```bash
# On Linux/Mac
open scaler.html

# On Windows
start scaler.html

# Or in your file manager, double-click scaler.html
```

## 📝 Available Commands

### Clone Popular Websites
```
clone scaler        # Scaler Academy website
```

### Create Custom Websites
```
create my-portfolio
create startup-app
create digital-agency
create online-course
```

### Ask the Agent Anything
```
Create a modern landing page with dark theme
Build an e-commerce website
Generate a tech startup homepage
Create a portfolio for graphic designers
```

### Exit
```
exit
```

## 🎬 What You'll See

The agent reasoning loop displays 4 key steps:

**💭 THINKING** - Agent reasons about the task
**🔧 TOOL** - Agent uses a tool (generate, analyze)
**👁️ OBSERVE** - Agent sees the result
**✨ OUTPUT** - Final result with instructions

## 📂 Generated Files

After each command, an HTML file is created:
- `scaler.html` - From "clone scaler"
- `my_portfolio.html` - From "create my-portfolio"
- `startup_app.html` - From "create startup-app"

All files are in: `/home/harsha/Documents/GenAi/ass2/`

## 🎨 Website Features

Each generated website includes:
- ✅ Responsive header with navigation
- ✅ Hero section with call-to-action
- ✅ Features showcase
- ✅ Course/service listings
- ✅ Professional footer
- ✅ Smooth animations
- ✅ Mobile-friendly design
- ✅ Interactive buttons

## 🐛 Troubleshooting

**Problem: "GEMINI_API_KEY not found"**
- Check `.env` file exists
- Verify API key is correct
- Don't add spaces around `=`

**Problem: Agent seems stuck**
- Give it 5-10 seconds per step
- If it takes too long, press Ctrl+C
- Try again with a simpler request

**Problem: File won't open in browser**
- Make sure file was created: `ls -lh *.html`
- Try different browser: Chrome, Firefox, Safari
- Check file path is correct

## 💡 Pro Tips

1. **First time?** Start with `clone scaler`
2. **Custom sites?** Be specific: "Create a dark-themed portfolio"
3. **Multiple requests?** Keep the CLI running
4. **Reopen websites?** Files stay in the folder, just open them
5. **Share websites?** Send the `.html` file to others - it's standalone

## 📊 Performance

- **API Response:** 2-5 seconds per step
- **File Generation:** < 1 second
- **File Size:** 22-25 KB
- **Compatibility:** All modern browsers

## 🎥 For YouTube Demo

Record these steps:
1. Run `npm start`
2. Type `clone scaler`
3. Wait for ✨ OUTPUT
4. Open the generated file
5. Show website in browser
6. Resize to show responsive design
7. Demo interactivity (click buttons)

## 📱 Testing on Mobile

Generated websites are fully responsive:
1. Open HTML on phone/tablet
2. Try landscape/portrait
3. Scroll and test buttons
4. Check animations

## 🔒 Security Reminder

- Keep `.env` file private
- Never commit to public git
- Don't share API key
- Delete `.env` before sharing code

## ✨ Next Steps

1. Try: `clone scaler`
2. Try: `create my-startup`
3. Try custom request: "Create a photography portfolio"
4. Record a YouTube demo
5. Push to GitHub (without .env)
6. Submit both links

---

**Questions?** Check README.md for detailed documentation.

Good luck! 🚀
