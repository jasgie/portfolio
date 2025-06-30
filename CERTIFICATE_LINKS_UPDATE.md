# Certificate Links Update Guide

## Your Coursera Profile
**Main Profile Link:** https://www.coursera.org/user/3e342298e986447d3ecd81c18bdf444f

## How to Get Your Certificate Share Links

1. Go to your Coursera profile (link above)
2. Find each certificate you want to showcase
3. Click the "Share" button on each certificate
4. Copy the share URL that looks like: `https://coursera.org/share/[unique-id]`

## Certificate Links to Update in index.html

Search for these placeholder URLs in the `index.html` file and replace them with your actual certificate share links:

### Major Professional Certificates (Large Cards)

1. **Google IT Support Professional Certificate**
   - Current placeholder: `https://coursera.org/share/4c8b2a3d1e5f6789abcd1234567890ef`
   - Replace with your actual share link

2. **Google Cybersecurity Professional Certificate**
   - Current placeholder: `https://coursera.org/share/7d9e1a2b3c4f5678901234567890abcd`
   - Replace with your actual share link

3. **Google Data Analytics Professional Certificate**
   - Current placeholder: `https://coursera.org/share/2a3b4c5d6e7f8901234567890abcdef1`
   - Replace with your actual share link

4. **Google Business Intelligence Certificate**
   - Current placeholder: `https://coursera.org/share/8f9g0h1i2j3k4567890abcdef123456789`
   - Replace with your actual share link

### Specialized Certificates (Compact Cards)

5. **Automate Cybersecurity Tasks with Python**
   - Current placeholder: `https://coursera.org/share/5l6m7n8o9p0q1234567890abcdef123456`
   - Replace with your actual share link

6. **Computer Networking Fundamentals**
   - Current placeholder: `https://coursera.org/share/2r3s4t5u6v7w8901234567890abcdef12`
   - Replace with your actual share link

7. **Operating Systems and You**
   - Current placeholder: `https://coursera.org/share/9x0y1z2a3b4c5678901234567890abcdef`
   - Replace with your actual share link

## Quick Find & Replace Instructions

1. Open `docs/index.html` in your text editor
2. Use Ctrl+F (Find) to search for each placeholder URL
3. Replace with your actual certificate share link
4. Save the file

## Example of What to Look For in the HTML

```html
<a href="https://coursera.org/share/4c8b2a3d1e5f6789abcd1234567890ef" target="_blank" 
   class="glass-button p-3 rounded-xl text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
   title="View Certificate">
    <i class="fas fa-external-link-alt text-lg"></i>
</a>
```

Replace the `href` value with your actual certificate link.

## Notes

- Keep the `target="_blank"` attribute so certificates open in new tabs
- Don't change any other attributes or classes
- Only replace the URL in the `href` attribute
- Test each link after updating to make sure they work correctly

## Certificate Sections in Skills

There are also certificate links in the Skills section (right side panel). These use the same placeholder URLs and should be updated with the same actual links.

---

**Your portfolio is ready to showcase your professional certifications with working links!**
