# Professional Portfolio Website

A modern, responsive portfolio website built for deployment on GitHub Pages. This site showcases professional experience, skills, projects, and contact information in a clean, accessible design.

## 🚀 Live Demo

Once deployed, your portfolio will be available at: `https://[your-username].github.io/[repository-name]`

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean design using Tailwind CSS with smooth animations
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance Optimized**: Fast loading with optimized images and minimal JavaScript
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Contact Form**: Functional contact form with validation
- **Smooth Scrolling**: Navigation with smooth scroll effects
- **LinkedIn Integration**: Ready to populate with LinkedIn profile data

## 📁 Project Structure

```
├── docs/                    # GitHub Pages deployment folder
│   ├── index.html          # Main HTML file
│   ├── style.css           # Custom CSS styles
│   ├── script.js           # JavaScript functionality
│   └── assets/             # Static assets
│       └── README.md       # Asset guidelines
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
└── README.md               # This file
```

## 🛠️ Technology Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Custom styles with CSS Grid and Flexbox
- **Tailwind CSS**: Utility-first CSS framework via CDN
- **JavaScript (ES6+)**: Interactive functionality
- **Google Fonts**: Inter font family
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: Automated deployment

## 📋 Setup Instructions

### 1. Clone or Download

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Customize Content

#### Update Personal Information

Edit `docs/index.html` and replace the placeholder content with your actual information:

- **Name and Title**: Update the hero section
- **About Section**: Replace with your professional summary
- **Experience**: Add your work history with descriptions
- **Skills**: List your top 8-10 technical skills
- **Education**: Add your educational background
- **Projects**: Include your best projects or academic work
- **Contact**: Update email and LinkedIn URL

#### Add Profile Photo

1. Download your LinkedIn profile photo
2. Save it as `docs/assets/profile-photo.jpg`
3. Recommended size: 400x400 pixels, square aspect ratio

#### Customize Colors and Styling

To change the color scheme, edit the CSS variables in `docs/style.css`:

```css
:root {
    --primary-color: #3B82F6;    /* Main blue color */
    --primary-dark: #1E40AF;     /* Darker blue */
    --secondary-color: #64748B;   /* Gray color */
    --accent-color: #F59E0B;     /* Orange accent */
}
```

### 3. Deploy to GitHub Pages

#### Option A: Automatic Deployment (Recommended)

1. Create a new repository on GitHub
2. Push your code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio setup"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/docs" folder
   - Click "Save"

4. The GitHub Actions workflow will automatically deploy your site

#### Option B: Manual Setup

If you prefer not to use GitHub Actions:

1. Go to repository Settings → Pages
2. Select "Deploy from a branch"
3. Choose "main" branch and "/docs" folder
4. Your site will be available at `https://your-username.github.io/repository-name`

## 📝 Customization Guide

### Adding LinkedIn Data

To populate the site with your actual LinkedIn information:

1. Visit your LinkedIn profile
2. Copy the following information:
   - Professional headline
   - About/Summary section
   - Work experience (company, role, dates, descriptions)
   - Education details
   - Skills list
   - Certifications and awards

3. Replace the placeholder content in `docs/index.html`

### Adding Projects

To add your projects:

1. Replace the project cards in the Projects section
2. Add project images to `docs/assets/`
3. Update project descriptions, technologies used, and links

### Modifying Sections

To add, remove, or reorder sections:

1. Update the navigation menu in the HTML
2. Add/remove corresponding sections
3. Update the JavaScript navigation logic if needed

## 🎨 Design Customization

### Changing Fonts

The site uses Inter from Google Fonts. To change the font:

1. Update the Google Fonts link in `index.html`
2. Update the font-family in `style.css`

### Layout Modifications

The layout uses CSS Grid and Flexbox for responsiveness. Key classes:

- `.grid-cols-1 md:grid-cols-2 lg:grid-cols-3`: Responsive grid
- `.flex flex-col md:flex-row`: Flexible layouts
- `.px-4 sm:px-6 lg:px-8`: Responsive padding

## 🧪 Testing

### Local Testing

1. Open `docs/index.html` in a web browser
2. Test all navigation links
3. Verify responsive design on different screen sizes
4. Test the contact form functionality

### Cross-browser Testing

Test in major browsers:
- Chrome
- Firefox
- Safari
- Edge

## 📱 Mobile Optimization

The site is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized images and fonts
- Fast loading on mobile networks

## ♿ Accessibility Features

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard navigation support
- High contrast colors
- Screen reader compatibility

## 🔧 Troubleshooting

### Common Issues

**Site not loading on GitHub Pages:**
- Check that files are in the `/docs` folder
- Verify GitHub Pages is enabled with correct source
- Check for any JavaScript errors in browser console

**Images not displaying:**
- Ensure images are in the `docs/assets/` folder
- Check file paths are correct
- Verify image file formats are supported

**Styling issues:**
- Check Tailwind CSS CDN link is working
- Verify custom CSS file is linked correctly
- Clear browser cache

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify all file paths are correct
3. Ensure all files are committed and pushed to GitHub
4. Check GitHub Actions logs for deployment errors

## 🚀 Future Enhancements

Potential additions for future versions:
- Blog section
- Dark mode toggle
- Multi-language support
- Advanced animations
- Portfolio analytics
- CMS integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, consider submitting a pull request.

---

**Happy coding!** 🎉

Remember to replace all placeholder content with your actual information before deploying.
