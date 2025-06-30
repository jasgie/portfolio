# GitHub Pages Contact Form Solutions

Since GitHub Pages only supports static files and cannot execute PHP, here are alternative solutions for your contact form:

## Current Implementation ✅

Your contact form now automatically detects GitHub Pages and:
1. **Collects form data** from the user
2. **Opens email client** with pre-filled message
3. **User sends email** directly from their email client

This ensures your contact form works on GitHub Pages without any external dependencies.

## Alternative Solutions (Optional)

### 1. **Formspree** (Recommended)
Free tier: 50 submissions/month
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <input type="email" name="email" placeholder="Your email" required>
    <textarea name="message" placeholder="Your message" required></textarea>
    <button type="submit">Send</button>
</form>
```

### 2. **Netlify Forms**
If you deploy to Netlify instead of GitHub Pages:
```html
<form name="contact" method="POST" data-netlify="true">
    <input type="email" name="email" placeholder="Your email" required>
    <textarea name="message" placeholder="Your message" required></textarea>
    <button type="submit">Send</button>
</form>
```

### 3. **EmailJS**
Client-side email sending:
```javascript
emailjs.send("service_id", "template_id", {
    from_name: "John Doe",
    to_name: "You",
    message: "Hello from contact form"
});
```

## Current Form Features on GitHub Pages:

✅ **Automatic Detection**: Knows when running on GitHub Pages  
✅ **Mailto Fallback**: Opens email client with pre-filled message  
✅ **User-Friendly**: Clear instructions for users  
✅ **No External Dependencies**: No API keys or third-party services needed  
✅ **Privacy Friendly**: No data sent to external services  

## How It Works:

1. User fills out the contact form
2. JavaScript detects GitHub Pages hosting
3. Creates a mailto link with all form data
4. Opens user's default email client
5. User reviews and sends the email

This approach ensures your contact form works reliably on GitHub Pages while maintaining a professional user experience.
