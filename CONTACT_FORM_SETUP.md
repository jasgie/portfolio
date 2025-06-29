# Contact Form Setup Guide

This guide will help you set up the PHP contact form with PHPMailer and Google SMTP integration.

## Prerequisites

1. **PHP 7.4 or higher** installed on your server
2. **Composer** (PHP dependency manager) installed
3. **Web server** (Apache/Nginx) that supports PHP
4. **Gmail account** with App Password enabled

## Installation Steps

### 1. Install Dependencies using Composer

Navigate to your project directory and run:

```bash
cd docs
composer install
```

This will install PHPMailer and PHP-DotEnv and create the `vendor/` directory with all dependencies.

### 2. Configure Environment Variables (IMPORTANT FOR SECURITY)

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the .env file** with your actual credentials:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USERNAME=your_email@gmail.com
   SMTP_PASSWORD=your_app_password
   SMTP_FROM_EMAIL=your_email@gmail.com
   SMTP_FROM_NAME=Portfolio Contact Form
   RECIPIENT_EMAIL=your_main_email@gmail.com
   RECIPIENT_NAME=Your Name
   ```

3. **⚠️ NEVER commit the .env file to version control!** 
   - The .gitignore file already includes .env to prevent accidental commits
   - Only commit .env.example (without real credentials)

### 3. Server Requirements

Make sure your web server has:
- PHP with `openssl` extension enabled (for SMTP SSL/TLS)
- `allow_url_fopen` enabled in php.ini
- Proper write permissions for error logging

### 4. File Structure

After installation, your docs folder should look like this:

```
docs/
├── vendor/                 # Composer dependencies (auto-generated)
├── .env                    # Your environment variables (DO NOT COMMIT)
├── .env.example           # Environment template (safe to commit)
├── composer.json          # Composer configuration
├── composer.lock          # Composer lock file (auto-generated)
├── send_email.php         # Email handling script
├── test_email.php         # Email testing script
├── index.html             # Your portfolio (updated with form)
├── script.js              # JavaScript (updated with form handling)
└── ... (other files)
```

### 5. Testing the Setup

1. **Local Testing** (XAMPP/WAMP/MAMP):
   - Place the project in your web server's document root
   - Make sure .env file is configured with your credentials
   - Access via `http://localhost/your-project/docs/test_email.php`
   - Test the contact form at `http://localhost/your-project/docs/`

2. **Production Server**:
   - Upload all files EXCEPT .env to your web hosting
   - Create a new .env file on the server with your credentials
   - Make sure composer dependencies are installed
   - Test the contact form

## Configuration Details

### Environment Variables Explained

- **SMTP_HOST**: Gmail SMTP server (smtp.gmail.com)
- **SMTP_PORT**: Port for STARTTLS (587)
- **SMTP_USERNAME**: Your Gmail address
- **SMTP_PASSWORD**: Your Gmail App Password (NOT regular password)
- **SMTP_FROM_EMAIL**: Email address for sending emails
- **SMTP_FROM_NAME**: Display name for outgoing emails
- **RECIPIENT_EMAIL**: Where contact form messages will be sent
- **RECIPIENT_NAME**: Recipient's display name

### Email Flow

1. **Visitor fills out the contact form**
2. **Form submission triggers two emails**:
   - **Email to you**: Contains the visitor's message
   - **Auto-reply to visitor**: Confirmation that you'll respond soon

### Security Features

- ✅ **Environment Variables**: Credentials stored securely outside code
- ✅ **Git Protection**: .env file excluded from version control
- ✅ **Form Validation**: Client-side and server-side validation
- ✅ **Email Sanitization**: Prevents injection attacks
- ✅ **CSRF Protection**: Form origin checking
- ✅ **Input Sanitization**: All inputs properly escaped

## Troubleshooting

### Common Issues:

1. **"Vendor directory not found"**
   ```bash
   cd docs
   composer install
   ```

2. **"SMTP connection failed"**
   - Check if your server allows outbound SMTP connections
   - Verify Gmail credentials are correct
   - Ensure `openssl` PHP extension is enabled

3. **"Permission denied" errors**
   - Check file permissions on the server
   - Ensure PHP can write to log files

4. **Form not submitting**
   - Check browser console for JavaScript errors
   - Verify `send_email.php` path is correct
   - Check PHP error logs

### Testing Commands:

```bash
# Check PHP version
php -v

# Check if composer is installed
composer --version

# Check if required PHP extensions are enabled
php -m | grep openssl
php -m | grep curl
```

## Customization

### Modifying Email Templates

Edit the HTML templates in `send_email.php`:
- `$messageToMe`: Email sent to you
- `$messageToVisitor`: Confirmation email to visitor

### Adding Form Fields

1. Add the field to `index.html` form
2. Update `send_email.php` to handle the new field
3. Update validation logic as needed

### Changing Email Settings

If you need to use different email credentials:
1. Update the SMTP settings in `send_email.php`
2. Change the `$mail->Username` and `$mail->Password`
3. Update sender addresses as needed

## Security Recommendations

1. **Environment Variables**: Consider moving email credentials to environment variables
2. **Rate Limiting**: Implement rate limiting to prevent spam
3. **Captcha**: Add reCAPTCHA for additional spam protection
4. **SSL Certificate**: Ensure your website uses HTTPS

## Support

If you encounter any issues:
1. Check PHP error logs
2. Check browser console for JavaScript errors
3. Test with a simple PHP script first
4. Contact your hosting provider for server-specific issues

---

**Note**: The contact form is now fully functional with:
- ✅ Professional email templates
- ✅ Automatic responses to visitors
- ✅ Form validation and error handling
- ✅ Loading states and user feedback
- ✅ Mobile-responsive design
- ✅ Security features implemented
