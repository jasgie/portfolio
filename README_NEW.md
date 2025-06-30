# 🌟 iOS-Inspired Portfolio Website

A beautiful, modern portfolio website featuring iOS-style glassmorphism design, dark mode support, and interactive components.

## ✨ Features

### 🎨 Design
- **Glassmorphism UI**: Translucent panels with backdrop blur effects
- **iOS-Style Components**: Toggle switches, sliders, and buttons
- **Responsive Design**: Mobile-first approach with full responsiveness
- **Modern Typography**: San Francisco-like fonts for clean aesthetics

### 🌙 Dark Mode
- **Smart Toggle**: Automatic detection of system preference
- **Persistent Storage**: Remembers user preference using localStorage
- **Smooth Transitions**: Beautiful animations between light and dark themes

### 🚀 Interactive Features
- **Floating Glass Navigation**: Fixed navbar with blur and transparency
- **Contact Modal**: Glass-style modal form with smooth animations
- **GitHub Integration**: Real-time GitHub API integration for repositories and stats
- **iOS Sliders**: Interactive skill progress bars with smooth animations
- **Hover Effects**: Motion blur and scaling effects on GitHub cards

### 📱 Mobile Experience
- **Touch-Friendly**: Optimized for mobile interaction
- **Collapsible Menu**: Hamburger menu for small screens
- **Gesture Support**: Smooth scrolling and touch interactions

## 🛠️ Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **Tailwind CSS**: Utility-first CSS framework with custom configurations
- **Alpine.js**: Lightweight JavaScript framework for reactivity
- **GitHub API**: Real-time repository and statistics integration
- **CSS Grid & Flexbox**: Modern layout techniques
- **Web APIs**: Local Storage, Intersection Observer, Fetch API

## 📁 Project Structure

```
docs/
├── index.html          # Main HTML file
├── style.css           # Custom CSS with glassmorphism styles
├── script.js           # JavaScript with Alpine.js components
├── send_email.php      # PHP email handler (optional)
├── assets/             # Images and icons
│   ├── profile.jpg     # Profile picture
│   ├── favicon.ico     # Favicon files
│   └── ...
└── vendor/             # PHP dependencies (if using email)
```

## 🚀 Quick Start

### 1. **Clone & Setup**
```bash
git clone <your-repo-url>
cd portfolio
```

### 2. **Customize Content**
Edit the following in `index.html`:
- Personal information in the hero section
- About section content
- Experience and education details
- Skills and certifications
- Contact information

### 3. **Update GitHub Username**
In `script.js`, update the GitHub username:
```javascript
const username = 'your-github-username';
```

### 4. **Replace Profile Image**
Add your profile picture to `assets/profile.jpg`

### 5. **Deploy**
#### GitHub Pages (Recommended)
1. Push to GitHub repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/docs` folder
5. Your site will be available at `https://yourusername.github.io/repository-name`

#### Other Hosting Platforms
- **Netlify**: Drag and drop the `docs` folder
- **Vercel**: Connect your GitHub repository
- **Traditional Hosting**: Upload `docs` folder contents to your web server

## ⚙️ Configuration

### GitHub API
The portfolio automatically fetches your GitHub repositories and statistics. If you hit rate limits, the fallback shows placeholder content.

### Contact Form
Two options available:
1. **PHP Backend** (if supported): Uses `send_email.php`
2. **Mailto Fallback**: Opens default email client

### Dark Mode
The theme automatically detects system preference and can be toggled manually. Preference is saved in localStorage.

## 🎨 Customization

### Colors & Themes
Modify CSS variables in `style.css`:
```css
:root {
    --glass-bg: rgba(255, 255, 255, 0.25);
    --glass-border: rgba(255, 255, 255, 0.18);
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Skills & Progress
Update skill percentages in the HTML:
```html
<div class="slider-fill ... style="width: 90%"></div>
```

### Animations
Modify animation durations and easing in `style.css`:
```css
.glass-panel {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## 🔧 Advanced Features

### Adding New Sections
1. Add HTML section with `glass-panel` class
2. Update navigation links
3. Add scroll animations in JavaScript

### Email Integration
For full email functionality:
1. Set up PHP hosting
2. Configure SMTP settings in `send_email.php`
3. Add environment variables for security

### Performance Optimization
- Images are optimized for web
- CSS is minified for production
- JavaScript uses efficient event handling
- Intersection Observer for smooth animations

## 📱 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🛡️ Security

- Input validation on contact forms
- CSRF protection in PHP handler
- Sanitized data output
- Secure API calls

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your needs! If you create something cool, consider sharing it with the community.

## 📞 Support

If you need help customizing or deploying your portfolio:
- Open an issue on GitHub
- Check the documentation
- Review the code comments for guidance

---

**Built with ❤️ using modern web technologies**

*Ready to showcase your work in style!* ✨
