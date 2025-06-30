# Deployment Configuration for Portfolio Contact Form

## Environment Variables Required

The following environment variables must be set on your hosting provider:

### SMTP Configuration (Gmail)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
FROM_EMAIL=your-gmail@gmail.com
FROM_NAME=Portfolio Contact Form
TO_EMAIL=gatdulajastine@gmail.com
```

### How to Set Environment Variables on Different Platforms:

#### 1. **Heroku**
```bash
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USERNAME=your-gmail@gmail.com
heroku config:set SMTP_PASSWORD=your-app-password
heroku config:set FROM_EMAIL=your-gmail@gmail.com
heroku config:set FROM_NAME="Portfolio Contact Form"
heroku config:set TO_EMAIL=gatdulajastine@gmail.com
```

#### 2. **DigitalOcean App Platform**
Set in the App's Environment Variables section in the control panel.

#### 3. **Vercel**
Set in Project Settings > Environment Variables

#### 4. **Netlify**
Set in Site Settings > Environment Variables

#### 5. **Shared Hosting (cPanel)**
Create a `.env` file in your domain's public_html folder with:
```
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USERNAME="your-gmail@gmail.com"
SMTP_PASSWORD="your-app-password"
FROM_EMAIL="your-gmail@gmail.com"
FROM_NAME="Portfolio Contact Form"
TO_EMAIL="gatdulajastine@gmail.com"
```

## Files Needed for Deployment:

### Required Files:
- `index.html` - Main portfolio page
- `style.css` - Styling
- `script.js` - JavaScript functionality
- `send_email.php` - Contact form handler
- `composer.json` - PHP dependencies
- `composer.lock` - Dependency lock file

### Optional Files (for local development):
- `.env` - Local environment variables (DO NOT upload to public repo)
- `test_email.php` - Testing script
- `debug_env.php` - Debug script

## Deployment Steps:

1. **Upload Files**: Upload all required files to your hosting provider
2. **Install Dependencies**: Run `composer install` on the server
3. **Set Environment Variables**: Configure the SMTP settings
4. **Test**: Submit a contact form to verify functionality

## Security Notes:

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Enable rate limiting (already implemented in the PHP script)
- Use HTTPS in production
- Regularly update dependencies

## Troubleshooting:

- **500 Error**: Check if Composer dependencies are installed
- **SMTP Error**: Verify Gmail App Password is correct
- **Permission Error**: Ensure PHP has write permissions
- **CORS Error**: Check if your hosting provider allows CORS

## Local Testing:

For local development, use:
```bash
cd docs
php -S localhost:8000
```
Then visit: http://localhost:8000/index.html
