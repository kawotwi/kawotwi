# Robotics Portfolio Website

A clean, professional portfolio website template for robotics engineers and researchers. This template is based on modern web design principles and provides a comprehensive structure to showcase your robotics projects.

## 🌟 Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Project Showcase**: Grid layout for displaying multiple projects with images and descriptions
- **Individual Project Pages**: Detailed pages for each project with sections for overview, approach, results, and more
- **About Page**: Showcase your skills, expertise, and background
- **Contact Page**: Multiple contact methods for potential employers or collaborators
- **Resume Page**: Professional resume layout that's also print-friendly
- **Clean Code**: Well-structured HTML and CSS for easy customization

## 📁 File Structure

```
robotics-portfolio/
├── index.html              # Homepage with project cards
├── about.html              # About page
├── contact.html            # Contact information page
├── resume.html             # Resume page
├── styles.css              # Main stylesheet
├── projects/               # Individual project pages
│   ├── project-1.html
│   ├── project-2.html
│   ├── project-3.html
│   └── project-4.html
├── assets/                 # Images and media files
│   └── placeholder.jpg
└── README.md              # This file
```

## 🚀 Getting Started

### Option 1: GitHub Pages (Recommended)

1. **Create a GitHub Repository**
   - Go to [GitHub](https://github.com) and sign in
   - Click the "+" icon in the top right and select "New repository"
   - Name it `yourusername.github.io` (replace `yourusername` with your actual GitHub username)
   - Make it public
   - Click "Create repository"

2. **Upload Your Files**
   - Click "uploading an existing file"
   - Drag and drop all files from this portfolio into the upload area
   - Commit the changes

3. **Enable GitHub Pages**
   - Go to your repository's "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at `https://yourusername.github.io` in a few minutes!

### Option 2: Local Development

1. **Clone or download this repository**
2. **Open `index.html` in your web browser** to preview locally
3. **Edit the files** to customize with your information
4. **Test thoroughly** before deploying

## ✏️ Customization Guide

### 1. Update Personal Information

**In ALL HTML files**, replace:
- `Your Name` → Your actual name
- `your.email@example.com` → Your email address
- `linkedin.com/in/yourprofile` → Your LinkedIn URL
- `github.com/yourusername` → Your GitHub URL

### 2. Add Your Projects

**For each project:**

1. **Add a project card** in `index.html`:
   ```html
   <div class="project-card">
       <a href="projects/your-project.html">
           <img src="assets/your-image.jpg" alt="Project Name" class="project-image">
           <div class="project-content">
               <h3 class="project-title">Your Project Title</h3>
               <p class="project-description">Brief description here.</p>
               <div class="project-tags">
                   <span class="tag">Technology 1</span>
                   <span class="tag">Technology 2</span>
               </div>
           </div>
       </a>
   </div>
   ```

2. **Create a project page** in the `projects/` folder:
   - Copy `project-1.html` as a template
   - Update the content with your project details
   - Add images to the `assets/` folder

### 3. Update About Page

Edit `about.html`:
- Write your introduction and background
- Update the skills lists with your actual skills
- Add your research interests
- Include personal interests

### 4. Update Resume

Edit `resume.html`:
- Add your education details
- List your work experience
- Update technical skills
- Add publications, awards, etc.

### 5. Add Project Images

1. **Add your images** to the `assets/` folder
2. **Recommended image sizes:**
   - Project cards: 800x600px (4:3 aspect ratio)
   - Project detail pages: 1200x800px or similar
3. **Optimize images** before uploading (compress to reduce file size)
4. **Use descriptive filenames** (e.g., `drone-project-setup.jpg`)

### 6. Customize Colors

To change the color scheme, edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2c3e50;      /* Main dark color */
    --secondary-color: #3498db;     /* Accent blue */
    --accent-color: #e74c3c;        /* Highlight red */
    --text-color: #333;             /* Text color */
    --light-bg: #f8f9fa;            /* Light background */
}
```

## 📸 Adding Images and Media

### Images
- **Format**: Use JPG for photos, PNG for graphics with transparency
- **Size**: Optimize images (use tools like TinyPNG or ImageOptim)
- **Placement**: Store all images in the `assets/` folder

### Videos
- **Option 1**: Upload to YouTube and embed:
  ```html
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/VIDEO_ID" 
    frameborder="0" allowfullscreen>
  </iframe>
  ```
- **Option 2**: Use GIFs for short demonstrations

### Code Snippets
Add code blocks in your project pages:
```html
<pre><code>
# Your code here
def example():
    return "Hello, World!"
</code></pre>
```

## 🎨 Design Tips

1. **Consistency**: Use the same image aspect ratios for all project cards
2. **Quality**: Use high-resolution images that look professional
3. **Brevity**: Keep descriptions concise - let your work speak for itself
4. **Updates**: Regularly update with new projects and achievements
5. **Testing**: Test your site on different devices and browsers

## 🔧 Advanced Customization

### Add Google Analytics
1. Create a Google Analytics account
2. Add the tracking code before the closing `</head>` tag in all HTML files

### Add Contact Form
Consider using services like:
- Formspree
- Google Forms
- Netlify Forms (if deploying on Netlify)

### Add Blog Section
Create a `blog/` folder and add blog post HTML files following the same structure

## 📱 Responsive Design

The template is already responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (< 768px)

## 🌐 Deployment Options

### GitHub Pages (Free, Recommended)
- Free hosting
- Custom domain support
- Automatic HTTPS
- Version control with Git

### Netlify (Free)
- Drag and drop deployment
- Continuous deployment from Git
- Custom domains
- Form handling

### Vercel (Free)
- Fast deployment
- Good for React/Next.js if you expand later
- Custom domains

## 📝 SEO Tips

1. **Meta tags**: Already included in each page
2. **Descriptive titles**: Update the `<title>` tags to be specific
3. **Alt text**: Add descriptive alt text to all images
4. **Keywords**: Use relevant keywords in your content naturally
5. **Sitemap**: Consider adding a sitemap.xml for better search engine indexing

## 🤝 Contributing

This is a template for your personal use. Feel free to:
- Customize it completely
- Add new sections
- Change the design
- Share it with others

## 📄 License

This template is free to use for personal and commercial purposes. No attribution required, but appreciated!

## 💡 Tips for Success

1. **Keep it updated**: Regularly add new projects
2. **Quality over quantity**: Showcase your best work
3. **Tell a story**: Each project should have a clear narrative
4. **Show results**: Include metrics, videos, or demonstrations
5. **Be professional**: Proofread all content
6. **Link to code**: Include GitHub links when possible
7. **Make it yours**: Customize the design to reflect your personality

## 🆘 Troubleshooting

**Images not showing?**
- Check file paths are correct
- Ensure images are in the `assets/` folder
- Check file extensions match (case-sensitive)

**Site not deploying on GitHub Pages?**
- Ensure repository is public
- Check that the main HTML file is named `index.html`
- Wait a few minutes after pushing changes

**Styling looks broken?**
- Verify `styles.css` path is correct in all HTML files
- Clear browser cache

## 📧 Questions?

If you need help customizing this template, feel free to:
- Open an issue on GitHub
- Reach out via email
- Check GitHub Pages documentation

---

**Good luck with your robotics portfolio! 🤖**
