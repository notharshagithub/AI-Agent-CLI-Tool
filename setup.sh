#!/bin/bash

# AI Agent Website Cloner - Quick Start Guide

echo "🚀 Setting up AI Agent Website Cloner..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"
echo "✅ npm is installed: $(npm --version)"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check .env file
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create it with your Gemini API key."
    echo "Create .env file with:"
    echo "GEMINI_API_KEY=your_api_key_here"
    exit 1
fi

echo "✅ Setup complete!"
echo ""
echo "📖 To get started:"
echo "   npm start"
echo ""
echo "🎯 Commands in the CLI:"
echo "   • clone scaler    - Clone Scaler Academy website"
echo "   • create MyApp    - Create a custom website"
echo "   • exit            - Exit the application"
echo ""
echo "Happy website cloning! 🎉"
