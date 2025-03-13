# Whiz

A travel chatbot powered by LMStudio's local AI model.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/whiz.git
cd whiz
```

2. Install dependencies:
```bash
npm install
```

3. Set up LMStudio:
   - Download and install [LMStudio Desktop](https://lmstudio.ai/)
   - Launch LMStudio
   - Load the `deepseek-r1-distill-qwen-7b` model

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## Features
- Chat interface for travel-related queries
- Powered by local AI model (no API keys needed)
- Real-time responses
- Node.js/Express backend
- Simple HTML/JS frontend

## Dependencies
- @lmstudio/sdk
- express
- body-parser
- nodemon (dev dependency)

## Contributing
Feel free to submit issues and pull requests.

## License
MIT
