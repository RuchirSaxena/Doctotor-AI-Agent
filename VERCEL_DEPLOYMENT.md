# Vercel Deployment Guide

This guide will help you deploy the Doctor AI Agent application to Vercel.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Node.js and npm installed on your machine
3. Your OpenAI API key

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended for beginners)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to https://vercel.com/dashboard
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variable:
     - **Name:** `OPENAI_API_KEY`
     - **Value:** Your OpenAI API key (the one from your .env file)
   - Make sure to add it for all environments (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   cd "c:\Work Related\doctor-ai-agent"
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - What's your project's name? (press Enter for default)
   - In which directory is your code located? **.**
   - Want to override the settings? **N**

5. **Add Environment Variable**
   ```bash
   vercel env add OPENAI_API_KEY
   ```
   - When prompted, paste your OpenAI API key
   - Select "Production", "Preview", and "Development" (use spacebar to select all)

6. **Deploy to production**
   ```bash
   vercel --prod
   ```

## Important Configuration

### Environment Variables Required

- `OPENAI_API_KEY`: Your OpenAI API key (required)
- `PORT`: Automatically set by Vercel (no need to configure)

### Project Structure

The project uses a monorepo structure:
- `/backend` - Node.js/Express API
- `/frontend` - React application

The `vercel.json` file has been configured to:
- Build the backend as a serverless function
- Build the frontend as a static site
- Route API calls to `/api/*` to the backend
- Route all other requests to the frontend

## Post-Deployment

### Update Frontend API URL

After deployment, you need to update the frontend to use the Vercel backend URL:

1. Open `frontend/src/services/api.js`
2. Update the `BASE_URL` to your Vercel deployment URL:
   ```javascript
   const BASE_URL = 'https://your-project-name.vercel.app/api';
   ```

3. Commit and push the changes, or redeploy:
   ```bash
   vercel --prod
   ```

### Verify Deployment

1. Visit your Vercel URL
2. Check the health endpoint: `https://your-project-name.vercel.app/api/health`
3. Test file upload functionality

## Troubleshooting

### Issue: "OPENAI_API_KEY is not defined"
- **Solution**: Make sure you've added the environment variable in Vercel dashboard
- Go to Settings → Environment Variables → Add your key
- Redeploy the project

### Issue: "npm run build" exited with 1
- **Solution**: This usually means the build failed
- Check if all frontend dependencies are properly listed in `frontend/package.json`
- Make sure the `vercel-build` script exists in root `package.json`
- Check Vercel build logs for specific error details

### Issue: API routes return 404
- **Solution**: Check that `vercel.json` is properly configured
- The routes section should redirect `/api/*` to the backend
- Make sure `api/index.js` exists and exports the Express app

### Issue: File upload fails
- **Solution**: Vercel has limitations on file uploads in serverless functions
- Maximum request body size is 4.5MB on free plan
- Consider using external storage (S3, Cloudinary) for larger files
- The current implementation uses local file storage which has limitations on Vercel

### Issue: Function timeout
- **Solution**: Increase the function timeout in `vercel.json`
- Free plan allows up to 10 seconds, Pro plan up to 60 seconds

## File Upload Limitations on Vercel

⚠️ **Important Note**: Vercel serverless functions have limitations:
- Maximum request size: 4.5MB (Hobby plan) / 4.5MB (Pro plan)
- Maximum execution time: 10s (Hobby) / 60s (Pro)

For production use with larger files, consider:
1. Using Vercel Blob Storage
2. Implementing client-side upload to AWS S3 or similar
3. Using a dedicated file processing service

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Node.js Apps](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## Security Notes

- ✅ Never commit your `.env` file to Git
- ✅ The `.env` file is already in `.gitignore`
- ✅ Always use environment variables in Vercel for sensitive data
- ✅ Rotate your OpenAI API key if it's ever exposed

---

**Your OpenAI API Key:** Already configured in your `.env` file
**Note:** Make sure to add it to Vercel's environment variables as shown above!
