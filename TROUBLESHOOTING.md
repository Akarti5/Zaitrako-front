# Troubleshooting Guide

## Vite Cache Issues

If you encounter errors like "Failed to resolve import" for files that don't exist, this is likely a Vite caching issue.

### Solution 1: Clear Vite Cache (Quick)

\`\`\`bash
# Stop the dev server (Ctrl+C)
# Delete the .vite folder
rm -rf .vite
# Or on Windows:
rmdir /s .vite

# Restart the dev server
npm run dev
\`\`\`

### Solution 2: Full Clean (Recommended)

\`\`\`bash
# Stop the dev server (Ctrl+C)
# Run the clean script
npm run clean

# Or manually:
rm -rf node_modules .vite dist
npm install
npm run dev
\`\`\`

### Solution 3: Clear Browser Cache

Sometimes the browser caches old assets. Try:
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Open DevTools → Network tab → Check "Disable cache"
- Clear browser cache completely

## Common Errors

### "Failed to resolve import /placeholder.svg"

This error occurs when Vite has cached old imports. Follow Solution 1 or 2 above.

### "Cannot find module"

Make sure all dependencies are installed:
\`\`\`bash
npm install
\`\`\`

### API Connection Issues

1. Check that your backend is running on `http://localhost:8000`
2. Verify your `.env` file has the correct `VITE_API_URL`
3. Check CORS settings in your backend

### Port Already in Use

If port 3000 is already in use:
\`\`\`bash
# Vite will automatically try the next available port
# Or specify a different port:
npm run dev -- --port 3001
