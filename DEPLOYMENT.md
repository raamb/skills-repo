# Deployment Guide

This guide will walk you through deploying the Skills & Agents Registry to GitHub Pages.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Custom Domain Setup](#custom-domain-setup)
- [Updating Your Site](#updating-your-site)

---

## Prerequisites

Before you begin, ensure you have:

- [x] A GitHub account
- [x] Git installed on your machine
- [x] Node.js 20+ and npm installed
- [x] This repository cloned or downloaded locally

---

## Quick Start

For experienced users, here's the TL;DR:

```bash
# 1. Update astro.config.mjs with your GitHub username and repo name
# 2. Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main

# 3. Enable GitHub Pages in repository Settings → Pages → Source: "GitHub Actions"
# 4. Wait 2-3 minutes and visit: https://YOUR-USERNAME.github.io/YOUR-REPO
```

---

## Detailed Setup

### Step 1: Configure Your Repository Settings

#### 1.1 Update `astro.config.mjs`

Open `astro.config.mjs` and replace the placeholder values:

```javascript
export default defineConfig({
  site: 'https://YOUR-GITHUB-USERNAME.github.io',  // ← Replace this
  base: '/YOUR-REPO-NAME',                          // ← Replace this
  integrations: [react()],
  output: 'static',
  image: {
    service: { entrypoint: 'astro/assets/services/noop' }
  }
});
```

**Example:**

If your GitHub username is `johndoe` and you name your repository `skills-registry`:

```javascript
site: 'https://johndoe.github.io',
base: '/skills-registry',
```

> **Important:** The `base` value must match your repository name exactly (case-sensitive).

#### 1.2 Test Locally

Before deploying, test that everything works:

```bash
# Build the site
npm run build

# Preview the production build
npm run preview

# Visit http://localhost:4321/YOUR-REPO-NAME
# Verify all links and navigation work correctly
```

### Step 2: Create GitHub Repository

#### 2.1 Create Repository on GitHub

1. Go to [GitHub](https://github.com)
2. Click the "+" icon in the top-right → "New repository"
3. Fill in the details:
   - **Repository name:** `skills-repo` (or your chosen name)
   - **Description:** "A community-driven collection of reusable skills and agents"
   - **Visibility:** Public (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

#### 2.2 Initialize Git and Push

In your project directory, run:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Skills & Agents Registry"

# Add your GitHub repository as remote
# Replace YOUR-USERNAME and YOUR-REPO with your actual values
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**

```bash
git remote add origin https://github.com/johndoe/skills-registry.git
```

### Step 3: Enable GitHub Pages

#### 3.1 Configure GitHub Pages Settings

1. Go to your repository on GitHub: `https://github.com/YOUR-USERNAME/YOUR-REPO`
2. Click the **"Settings"** tab (top navigation)
3. In the left sidebar, scroll down and click **"Pages"**
4. Under **"Build and deployment"**:
   - **Source:** Select `GitHub Actions` from the dropdown
   - (This tells GitHub to use the workflow file at `.github/workflows/deploy.yml`)
5. The page will refresh - no need to click "Save"

#### 3.2 Verify Workflow File

The repository includes `.github/workflows/deploy.yml` which handles automatic deployment. You can view it to understand the deployment process:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

# ... (rest of the workflow)
```

This workflow:
- Triggers on every push to the `main` branch
- Installs dependencies with `npm ci`
- Builds the site with `npm run build`
- Deploys to GitHub Pages

#### 3.3 Monitor Deployment

1. Go to the **"Actions"** tab in your repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Click on it to see the progress
4. Wait for all steps to complete (green checkmarks)
5. First deployment takes 2-5 minutes

### Step 4: Access Your Site

Once deployment completes:

**Your site will be available at:**
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME
```

**Example:**
```
https://johndoe.github.io/skills-registry
```

---

## Configuration

### Changing the Base URL

If you want to deploy to a different path or use a custom domain:

#### Deploy to Root (username.github.io)

If your repository is named `YOUR-USERNAME.github.io`:

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/',  // Root path
  // ...
});
```

#### Deploy to Subdirectory

For any other repository name:

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://YOUR-USERNAME.github.io',
  base: '/REPO-NAME',  // Must match repository name
  // ...
});
```

### Updating Example Content

Before deploying, you may want to:

1. **Remove example content:**
   ```bash
   rm src/content/skills/git-commit-helper.md
   rm src/content/skills/api-client-generator.md
   rm src/content/agents/code-reviewer.md
   rm src/content/agents/test-generator.md
   ```

2. **Add your own skills/agents** following the [Contributing Guide](README.md#contributing)

3. **Rebuild and redeploy:**
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

---

## Troubleshooting

### Problem: 404 Page Not Found

**Symptoms:** Visiting your site shows GitHub's 404 page

**Solutions:**

1. **Check the base path:**
   - Open `astro.config.mjs`
   - Verify `base: '/YOUR-REPO-NAME'` matches your repository name exactly
   - Repository names are case-sensitive!

2. **Wait for deployment:**
   - First deployment can take up to 5 minutes
   - Check the Actions tab to ensure deployment completed successfully

3. **Verify GitHub Pages is enabled:**
   - Go to Settings → Pages
   - Source should be "GitHub Actions"

4. **Check the deployment URL:**
   - In Settings → Pages, you'll see "Your site is live at..."
   - Use this exact URL

### Problem: Blank Page or Broken Styles

**Symptoms:** Page loads but has no styling or images don't load

**Solutions:**

1. **Base URL mismatch:**
   ```javascript
   // astro.config.mjs - Ensure base matches repo name
   base: '/skills-repo',  // Must match exactly!
   ```

2. **Rebuild after config changes:**
   ```bash
   npm run build
   git add .
   git commit -m "Fix base URL"
   git push
   ```

3. **Check browser console:**
   - Press F12 → Console tab
   - Look for 404 errors on CSS/JS files
   - The paths should include your base URL

### Problem: Build Fails in GitHub Actions

**Symptoms:** Red X in Actions tab, deployment never completes

**Solutions:**

1. **View the error log:**
   - Go to Actions tab
   - Click the failed workflow
   - Click the failed step to see error details

2. **Common issues:**

   **Schema validation errors:**
   ```bash
   # Test locally first
   npm run build

   # Fix any schema validation errors in your content files
   ```

   **Node version mismatch:**
   ```yaml
   # .github/workflows/deploy.yml
   - name: Setup Node
     uses: actions/setup-node@v4
     with:
       node-version: 20  # Ensure this is 20+
   ```

   **Missing dependencies:**
   ```bash
   # Ensure all dependencies are in package.json
   npm install
   git add package.json package-lock.json
   git commit -m "Update dependencies"
   git push
   ```

3. **Re-run workflow:**
   - Go to Actions tab
   - Click on the failed workflow
   - Click "Re-run all jobs" (top-right)

### Problem: Changes Not Appearing

**Symptoms:** You pushed changes but site hasn't updated

**Solutions:**

1. **Check workflow ran:**
   - Go to Actions tab
   - Verify a new workflow run started after your push
   - Wait for it to complete (green checkmark)

2. **Clear browser cache:**
   - Press Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
   - Or open an incognito/private window

3. **Check commit was pushed:**
   ```bash
   git status  # Should show "nothing to commit"
   git log     # Verify your latest commit appears
   ```

### Problem: Permission Denied

**Symptoms:** `git push` fails with permission error

**Solutions:**

1. **Use personal access token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens
   - Generate new token (classic) with `repo` scope
   - Use token as password when pushing

2. **Use SSH instead of HTTPS:**
   ```bash
   # Change remote URL to SSH
   git remote set-url origin git@github.com:YOUR-USERNAME/YOUR-REPO.git
   ```

3. **Check repository ownership:**
   - Ensure you're pushing to your fork, not the original repo
   - Verify with: `git remote -v`

---

## Custom Domain Setup

Want to use your own domain (e.g., `skills.yourdomain.com`)?

### Step 1: Update Configuration

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://skills.yourdomain.com',  // Your custom domain
  base: '/',                               // Root path for custom domain
  // ...
});
```

### Step 2: Add Custom Domain in GitHub

1. Go to repository Settings → Pages
2. Under "Custom domain", enter: `skills.yourdomain.com`
3. Click "Save"
4. Check "Enforce HTTPS" (once DNS propagates)

### Step 3: Configure DNS

Add these DNS records at your domain provider:

**For subdomain (skills.yourdomain.com):**

| Type  | Name   | Value                               |
|-------|--------|-------------------------------------|
| CNAME | skills | YOUR-USERNAME.github.io             |

**For apex domain (yourdomain.com):**

| Type | Name | Value            |
|------|------|------------------|
| A    | @    | 185.199.108.153  |
| A    | @    | 185.199.109.153  |
| A    | @    | 185.199.110.153  |
| A    | @    | 185.199.111.153  |

### Step 4: Wait for DNS Propagation

- DNS changes can take 24-48 hours to fully propagate
- Check status: `nslookup skills.yourdomain.com`

### Step 5: Rebuild and Deploy

```bash
npm run build
git add astro.config.mjs
git commit -m "Configure custom domain"
git push
```

---

## Updating Your Site

### Adding New Skills or Agents

1. **Create new content file:**
   ```bash
   # Create a new skill
   touch src/content/skills/my-new-skill.md

   # Or create a new agent
   touch src/content/agents/my-new-agent.md
   ```

2. **Add content following the schema** (see [README.md](README.md))

3. **Test locally:**
   ```bash
   npm run dev
   # Visit http://localhost:4321/skills-repo
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Add new skill: My New Skill"
   git push
   ```

5. **Wait 2-3 minutes** for automatic deployment

### Updating Existing Content

1. **Edit the file** in `src/content/skills/` or `src/content/agents/`
2. **Test locally** with `npm run dev`
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Update: improve skill description"
   git push
   ```

### Changing Site Configuration

If you update `astro.config.mjs`, `package.json`, or any component:

1. **Test the build:**
   ```bash
   npm run build
   npm run preview
   ```

2. **If successful, deploy:**
   ```bash
   git add .
   git commit -m "Update site configuration"
   git push
   ```

---

## Deployment Checklist

Use this checklist before deploying:

- [ ] Updated `site` and `base` in `astro.config.mjs`
- [ ] Tested locally with `npm run build` and `npm run preview`
- [ ] All content files follow the schema (name, description, tags, etc.)
- [ ] Created GitHub repository (public)
- [ ] Pushed code to GitHub
- [ ] Enabled GitHub Pages with Source: "GitHub Actions"
- [ ] Verified workflow completed successfully in Actions tab
- [ ] Tested site URL: `https://USERNAME.github.io/REPO-NAME`
- [ ] Navigation works (Skills ↔️ Agents tabs)
- [ ] Search functionality works
- [ ] Cards display correctly
- [ ] Modal opens when clicking cards

---

## Continuous Deployment

Once set up, your site automatically deploys when you push to the `main` branch:

```bash
# Make changes
git add .
git commit -m "Add new features"
git push

# GitHub Actions automatically:
# 1. Runs the build
# 2. Validates content
# 3. Deploys to GitHub Pages
# 4. Site updates in 2-3 minutes
```

No manual deployment needed! 🎉

---

## Additional Resources

- [Astro Documentation](https://docs.astro.build)
- [GitHub Pages Documentation](https://docs.github.com/pages)
- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Custom Domain Setup Guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## Getting Help

If you encounter issues not covered in this guide:

1. **Check the Actions tab** for build logs
2. **Review browser console** (F12) for client-side errors
3. **Test locally** with `npm run dev` and `npm run build`
4. **Open an issue** in the repository with:
   - Error message
   - Steps to reproduce
   - Build logs (if applicable)

---

## Summary

Congratulations! Your Skills & Agents Registry is now live on GitHub Pages.

**Your deployment URL:**
```
https://YOUR-USERNAME.github.io/YOUR-REPO-NAME
```

Every time you push changes to the `main` branch, your site will automatically rebuild and deploy within 2-3 minutes.

Happy coding! 🚀
