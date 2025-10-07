# Setup Instructions

Follow these steps to get the Zaitrako frontend running.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on port 8000

## Step-by-Step Setup

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Create Environment File

Copy the example environment file:

\`\`\`bash
cp .env.example .env
\`\`\`

Or create a new `.env` file with:

\`\`\`
VITE_API_URL=http://localhost:8000
\`\`\`

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will start on `http://localhost:5173` (or the next available port).

### 4. Verify Backend Connection

Make sure your backend API is running and accessible at `http://localhost:8000/api/produit/getall`

## If You Encounter the Placeholder Error

If you see: `Failed to resolve import "/placeholder.svg"`, follow these steps:

1. **Stop the dev server** (press `Ctrl+C`)

2. **Delete the Vite cache folder:**
   \`\`\`bash
   # On Mac/Linux:
   rm -rf .vite
   
   # On Windows (PowerShell):
   Remove-Item -Recurse -Force .vite
   
   # On Windows (Command Prompt):
   rmdir /s /q .vite
   \`\`\`

3. **Restart the dev server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **If the error persists, do a full clean:**
   \`\`\`bash
   # On Mac/Linux:
   rm -rf node_modules .vite dist
   npm install
   npm run dev
   
   # On Windows (PowerShell):
   Remove-Item -Recurse -Force node_modules,.vite,dist
   npm install
   npm run dev
   \`\`\`

## Build for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the `dist` folder.

## Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
zaitrako-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # CSS and images
│   ├── components/     # Vue components
│   │   ├── Header.vue
│   │   ├── Footer.vue
│   │   └── ProductCard.vue
│   ├── views/          # Page components
│   │   ├── Home.vue
│   │   ├── Catalogue.vue
│   │   ├── About.vue
│   │   └── Contact.vue
│   ├── router/         # Vue Router
│   ├── services/       # API services
│   ├── App.vue         # Root component
│   └── main.js         # Entry point
├── .env.example        # Environment template
├── package.json
├── vite.config.js
└── index.html
\`\`\`

## Need Help?

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.
