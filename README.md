# Zaitrako Frontend

Vue.js frontend application for Zaitrako pattern generation platform.

## Installation

\`\`\`bash
npm install
\`\`\`

## Development

\`\`\`bash
npm run dev
\`\`\`

The application will run on `http://localhost:3000`

## Configuration

Create a `.env` file based on `.env.example`:

\`\`\`
VITE_API_URL=http://localhost:8000
\`\`\`

Make sure your backend API is running on port 8000.

## Features

- Responsive design for all devices
- Product catalog with filtering
- Category browsing
- Newsletter subscription
- Contact form
- Integration with backend API

## Project Structure

\`\`\`
src/
├── assets/          # CSS and static assets
├── components/      # Reusable Vue components
├── views/           # Page components
├── router/          # Vue Router configuration
├── services/        # API service layer
├── App.vue          # Root component
└── main.js          # Application entry point
