# Git Workflow for Portfolio Updates

This guide explains how to use Git to manage and update your portfolio efficiently.

## 🎯 Why Use Git?

- **Version Control**: Track changes and revert if needed
- **Easy Updates**: Push changes from your computer to GitHub
- **Backup**: All changes are saved with history
- **Professional**: Shows you understand developer workflows

## 📋 One-Time Setup

### Install Git

**Windows:**
1. Download from [git-scm.com](https://git-scm.com/)
2. Run installer with default settings

**Mac:**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Git
brew install git
```

**Linux:**
```bash
sudo apt-get install git  # Ubuntu/Debian
sudo yum install git      # CentOS/RHEL
```

### Configure Git

Open terminal/command prompt and run:

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use GitHub email)
git config --global user.email "your.email@example.com"

# Verify settings
git config --list
```

### Clone Your Repository

After creating your repository on GitHub:

```bash
# Navigate to where you want the folder
cd ~/Documents  # or any directory

# Clone your repository (replace USERNAME)
git clone https://github.com/USERNAME/USERNAME.github.io.git

# Enter the directory
cd USERNAME.github.io
```

## 🔄 Daily Workflow

### Basic Workflow (Recommended for Beginners)

Every time you make changes:

```bash
# 1. Check what files changed
git status

# 2. Add all changed files
git add .

# 3. Commit with a descriptive message
git commit -m "Add new drone project page"

# 4. Push to GitHub
git push
```

That's it! Changes will be live in 1-2 minutes.

### Detailed Workflow (For More Control)

```bash
# See what files changed
git status

# Add specific files (instead of all)
git add index.html
git add projects/new-project.html
git add assets/new-image.jpg

# Or add all files
git add .

# Review changes before committing
git diff

# Commit with message
git commit -m "Descriptive commit message"

# Push to GitHub
git push origin main
```

## 📝 Commit Message Best Practices

### Good Commit Messages:
```bash
git commit -m "Add autonomous drone project page"
git commit -m "Update resume with new internship"
git commit -m "Fix broken link on about page"
git commit -m "Optimize project images for faster loading"
git commit -m "Update contact information"
```

### Bad Commit Messages:
```bash
git commit -m "update"           # Too vague
git commit -m "stuff"            # Not descriptive
git commit -m "asdfasdf"         # Meaningless
git commit -m "fixed things"     # What things?
```

### Format:
- Start with a verb (Add, Update, Fix, Remove)
- Be specific about what changed
- Keep it under 50 characters if possible

## 🔍 Common Scenarios

### Scenario 1: Added a New Project

```bash
# After creating project-5.html and adding images
git status                                      # See changes
git add projects/project-5.html                 # Add project file
git add assets/project5-image.jpg               # Add image
git add index.html                              # Add homepage (if updated)
git commit -m "Add machine learning project"    # Commit
git push                                        # Push to GitHub
```

### Scenario 2: Updated Multiple Files

```bash
# After editing several files
git add .                                       # Add all changes
git commit -m "Update about page and resume"   # Commit
git push                                        # Push
```

### Scenario 3: Fixed a Typo

```bash
# After fixing typo in about.html
git add about.html                              # Add changed file
git commit -m "Fix typo in about page"         # Commit
git push                                        # Push
```

### Scenario 4: Updated Images

```bash
# After replacing/adding images
git add assets/                                 # Add all assets
git commit -m "Update project images"          # Commit
git push                                        # Push
```

## 🚨 Troubleshooting

### Error: "Permission denied"

**Problem**: Can't push to GitHub

**Solution**: Set up authentication

**Option 1: HTTPS (Easier)**
```bash
# GitHub will prompt for username/password when you push
# Use a Personal Access Token as password:
# 1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
# 2. Generate new token with 'repo' permissions
# 3. Use token as password when pushing
```

**Option 2: SSH (More Secure)**
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Add key to GitHub
# 1. Copy public key: cat ~/.ssh/id_ed25519.pub
# 2. Go to GitHub Settings > SSH Keys > New SSH key
# 3. Paste key and save

# Change remote to SSH
git remote set-url origin git@github.com:USERNAME/USERNAME.github.io.git
```

### Error: "Your branch is behind"

**Problem**: GitHub has changes you don't have locally

**Solution**: Pull changes first
```bash
git pull origin main    # Get latest changes
git push               # Then push your changes
```

### Error: "Merge conflict"

**Problem**: Same file edited in two places

**Solution**: Resolve manually
```bash
# 1. Open conflicted file in text editor
# 2. Look for conflict markers: <<<<<<<, =======, >>>>>>>
# 3. Choose which version to keep
# 4. Remove conflict markers
# 5. Save file
git add filename.html
git commit -m "Resolve merge conflict"
git push
```

### Undo Last Commit (Before Push)

```bash
# Undo commit but keep changes
git reset --soft HEAD~1

# Undo commit AND changes (careful!)
git reset --hard HEAD~1
```

### Undo Changes to a File

```bash
# Before committing
git checkout -- filename.html

# After committing but before pushing
git reset HEAD filename.html
git checkout -- filename.html
```

## 📊 Useful Git Commands

### Viewing History

```bash
# See commit history
git log

# See commit history (one line per commit)
git log --oneline

# See recent commits with changes
git log -p -2
```

### Checking Status

```bash
# See current status
git status

# See what changed
git diff

# See staged changes
git diff --staged
```

### Branching (Advanced)

```bash
# Create new branch for experimental changes
git checkout -b new-feature

# Make changes and commit
git add .
git commit -m "Experiment with new design"

# Switch back to main
git checkout main

# Merge changes if you like them
git merge new-feature

# Delete branch
git branch -d new-feature
```

## 🎓 Learning More

### Essential Commands Reference:

| Command | Purpose |
|---------|---------|
| `git status` | See what changed |
| `git add .` | Stage all changes |
| `git add filename` | Stage specific file |
| `git commit -m "message"` | Commit changes |
| `git push` | Upload to GitHub |
| `git pull` | Download from GitHub |
| `git log` | View history |
| `git diff` | See changes |

### Resources:
- [Official Git Documentation](https://git-scm.com/doc)
- [GitHub Git Guides](https://github.com/git-guides)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

## 🎯 Best Practices

1. **Commit Often**: Small, frequent commits are better than large ones
2. **Pull Before Push**: Always pull latest changes before pushing
3. **Write Good Messages**: Future you will thank present you
4. **Test Locally**: Preview changes before committing
5. **Don't Commit Secrets**: Never commit passwords, API keys, etc.

## 🔐 What NOT to Commit

Never commit:
- Passwords or API keys
- Personal information (SSN, credit cards)
- Large binary files (videos > 100MB)
- Operating system files (.DS_Store, Thumbs.db)
- IDE config files (unless team needs them)

Create a `.gitignore` file:
```
# macOS
.DS_Store

# Windows
Thumbs.db

# IDEs
.vscode/
.idea/

# Large files
*.mp4
*.mov
```

## 🚀 Quick Reference Card

Save this for quick access:

```bash
# Daily workflow
git status                          # Check status
git add .                          # Add all changes
git commit -m "Description"        # Commit
git push                           # Push to GitHub

# When starting work
git pull                           # Get latest changes

# If stuck
git status                         # See what's happening
git log --oneline                  # See recent commits
```

---

**Remember**: Git seems complicated at first, but these 4 commands handle 90% of your needs:
- `git add .`
- `git commit -m "message"`
- `git push`
- `git pull`

Practice these and you'll be comfortable in no time! 🎉
