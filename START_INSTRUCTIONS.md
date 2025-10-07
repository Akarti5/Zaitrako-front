# How to Start the Zaitrako Application

## Important: This project contains BOTH frontend and backend

### Step 1: Start the Backend API (Port 8000)
\`\`\`bash
# Make sure you're in the project root directory
node index.js
\`\`\`
The backend will run on http://localhost:8000

### Step 2: Start the Frontend (Port 3000)
Open a NEW terminal window and run:
\`\`\`bash
# In the same project directory
npm run dev
\`\`\`
The frontend will run on http://localhost:3000

### Troubleshooting "Index Of" Error

If you see an "index of" directory listing page:

1. **Make sure you ran `npm install` first:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Stop any running servers (Ctrl+C)**

3. **Clear everything and restart:**
   \`\`\`bash
   # Windows
   rmdir /s /q node_modules
   rmdir /s /q dist
   del /f /q .env
   
   # Then reinstall
   npm install
   npm run dev
   \`\`\`

4. **Check if port 3000 is already in use:**
   - Close any other applications using port 3000
   - Or change the port in `vite.config.js`

5. **Make sure you're running the correct command:**
   - ✅ `npm run dev` (starts Vite frontend)
   - ❌ `node index.js` (starts backend API)

### What You Should See

When `npm run dev` runs successfully, you should see:
\`\`\`
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
\`\`\`

Then open http://localhost:3000 in your browser.

### Full Application Setup

For the complete application to work:

1. **Terminal 1 - Backend:**
   \`\`\`bash
   node index.js
   \`\`\`
   Should show: "Server is running on port 8000"

2. **Terminal 2 - Frontend:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Should show: "Local: http://localhost:3000/"

3. **Browser:**
   Open http://localhost:3000
