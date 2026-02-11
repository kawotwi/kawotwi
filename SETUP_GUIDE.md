# GitHub Pages Deployment Guide

This guide will walk you through deploying your robotics portfolio to GitHub Pages step-by-step.

## Prerequisites

- A GitHub account (create one at [github.com](https://github.com) if you don't have one)
- Your customized portfolio files ready to upload

## Step-by-Step Instructions

### Step 1: Create a GitHub Repository

1. **Log in to GitHub**
   - Go to [github.com](https://github.com) and sign in

2. **Create a new repository**
   - Click the **"+"** icon in the top-right corner
   - Select **"New repository"**

3. **Configure your repository**
   - **Repository name**: `yourusername.github.io`
     - Replace `yourusername` with your actual GitHub username
     - Example: If your username is `john-doe`, name it `john-doe.github.io`
     - ⚠️ **Important**: The name must exactly match this format for GitHub Pages to work automatically
   
   - **Description** (optional): "My Robotics Portfolio"
   
   - **Visibility**: Select **"Public"**
     - ⚠️ **Important**: Must be public for free GitHub Pages
   
   - **Initialize repository**: 
     - ❌ Do NOT check "Add a README file"
     - ❌ Do NOT add .gitignore
     - ❌ Do NOT choose a license (you can add these later)
   
   - Click **"Create repository"**

### Step 2: Upload Your Files

#### Method A: Upload via Web Interface (Easiest)

1. **On the new repository page**, you'll see a "Quick setup" section
   
2. **Click** "uploading an existing file"
   
3. **Prepare your files**:
   - Open your portfolio folder on your computer
   - Select ALL files and folders:
     - `index.html`
     - `about.html`
     - `contact.html`
     - `resume.html`
     - `styles.css`
     - `README.md`
     - `SETUP_GUIDE.md`
     - `projects/` folder (with all project HTML files)
     - `assets/` folder (with images)

4. **Drag and drop**:
   - Drag all selected files into the GitHub upload area
   - OR click "choose your files" to browse and select them
   
5. **Commit the files**:
   - Scroll down to "Commit changes"
   - In the commit message, type: "Initial portfolio upload"
   - Click **"Commit changes"**

#### Method B: Upload via Git (For Git Users)

If you're familiar with Git and have it installed:

```bash
# Navigate to your portfolio folder
cd path/to/robotics-portfolio

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio upload"

# Add remote repository (replace USERNAME with your GitHub username)
git remote add origin https://github.com/USERNAME/USERNAME.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages (Usually Automatic)

For repositories named `username.github.io`, GitHub Pages is usually enabled automatically. To verify:

1. **Go to your repository** on GitHub

2. **Click "Settings"** (gear icon in the top navigation)

3. **In the left sidebar**, click **"Pages"**

4. **Under "Source"**:
   - Branch should be set to **"main"** (or "master")
   - Folder should be **"/ (root)"**
   - If not, select these options and click **"Save"**

5. **You'll see a message**: "Your site is ready to be published at `https://username.github.io/`"

### Step 4: Wait for Deployment

1. **GitHub Pages takes a few minutes** to build and deploy your site (usually 2-5 minutes)

2. **Check deployment status**:
   - Go to the main page of your repository
   - Look for a small orange dot (building) or green checkmark (deployed) next to your latest commit

3. **Once deployed**, the Pages settings will show:
   - ✅ "Your site is published at `https://username.github.io/`"

### Step 5: View Your Live Site!

1. **Visit your site**: `https://username.github.io/`

2. **Test everything**:
   - Click all navigation links
   - Check that images load
   - Test project links
   - View on mobile devices

## Making Updates

### To Update Your Portfolio:

1. **Go to your repository** on GitHub

2. **Navigate to the file** you want to edit

3. **Click the pencil icon** (Edit this file)

4. **Make your changes**

5. **Scroll down and commit**:
   - Add a commit message describing your change
   - Click "Commit changes"

6. **Wait 1-2 minutes** for changes to deploy

### Or Upload New Files:

1. **Click "Add file"** → "Upload files"
2. **Drag and drop** your updated files
3. **Commit changes**

## Using a Custom Domain (Optional)

If you own a domain name (e.g., `roboticsportfolio.com`):

1. **In repository Settings** → **Pages**

2. **Under "Custom domain"**:
   - Enter your domain name
   - Click "Save"

3. **Configure DNS** at your domain registrar:
   - Add a CNAME record pointing to `username.github.io`
   - Or add A records pointing to GitHub's IPs

4. **Enable HTTPS** (recommended):
   - Check "Enforce HTTPS" in Pages settings
   - May take up to 24 hours to activate

## Troubleshooting

### Site Not Loading?

**Check these common issues:**

1. **Repository name format**:
   - Must be exactly `username.github.io`
   - Username must match your GitHub account name exactly
   - Check for typos

2. **Repository visibility**:
   - Must be public for free GitHub Pages
   - Go to Settings → General → scroll down to change visibility

3. **File names**:
   - Main page must be named `index.html` (lowercase)
   - File names are case-sensitive

4. **Wait time**:
   - First deployment can take 5-10 minutes
   - Check the Actions tab to see build status

### Images Not Showing?

1. **Check file paths**:
   - Paths are case-sensitive: `assets/Image.jpg` ≠ `assets/image.jpg`
   - Use relative paths: `assets/image.jpg` not `/assets/image.jpg`

2. **Verify file upload**:
   - Click on `assets/` folder in repository
   - Confirm all images are there

3. **Image file extensions**:
   - Ensure extensions match: `.jpg`, `.png`, `.gif`

### CSS Not Loading?

1. **Check `styles.css` path** in HTML files:
   - Should be `<link rel="stylesheet" href="styles.css">`
   - In project pages: `<link rel="stylesheet" href="../styles.css">`

2. **Clear browser cache**:
   - Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### 404 Error on Project Pages?

1. **Check folder structure**:
   - Project files should be in `projects/` folder
   - Links should be `projects/project-1.html`

2. **Check file names** match exactly with links

## Best Practices

### Regular Updates
- Update your portfolio monthly with new projects
- Keep resume current
- Add new skills as you learn them

### Git Workflow
For frequent updates, use Git locally:

```bash
# Make changes to your files locally

# See what changed
git status

# Add changes
git add .

# Commit with descriptive message
git commit -m "Add new autonomous drone project"

# Push to GitHub
git push
```

### Backup
- Keep a local copy of all files
- Consider using version control (Git) for history
- Export/backup images separately

## Getting Help

### Resources:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Community Forum](https://github.community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages)

### Common Questions:

**Q: Can I use a different repository name?**
A: Yes, but your URL will be `username.github.io/repo-name` instead

**Q: Is it really free forever?**
A: Yes! GitHub Pages is free for public repositories

**Q: Can I see who visits my site?**
A: GitHub Pages doesn't provide analytics, but you can add Google Analytics

**Q: How do I delete my site?**
A: Delete the repository or disable Pages in Settings

**Q: Can I password-protect my site?**
A: Not directly on free GitHub Pages. Consider other hosting for private sites.

## Next Steps

After deployment:

1. ✅ **Share your URL** on LinkedIn, resume, business cards
2. ✅ **Add Google Analytics** to track visitors
3. ✅ **Link from GitHub profile** README
4. ✅ **Submit to portfolio directories**
5. ✅ **Share on social media** (LinkedIn, Twitter)

---

**Congratulations! Your robotics portfolio is now live! 🎉**

For questions or issues, refer to the main README.md or open an issue on GitHub.
