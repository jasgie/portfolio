# Formspree Integration

## Date: October 25, 2025

### Overview
The portfolio contact form now uses Formspree, a secure third-party form handling service that eliminates the need for backend code and credentials.

### Configuration

**Formspree Endpoint:** `https://formspree.io/f/xeopjbwb`

### Features

✅ **Secure** - No credentials stored in the codebase
✅ **No Backend Required** - Works perfectly with GitHub Pages
✅ **Spam Protection** - Built-in spam filtering by Formspree
✅ **Email Notifications** - You'll receive emails when someone submits the form
✅ **Fallback** - Automatically falls back to mailto: link if Formspree is unavailable
✅ **Form Validation** - Client-side validation before submission

### How It Works

1. User fills out the contact form on your portfolio
2. JavaScript sends the form data to Formspree endpoint via POST request
3. Formspree processes the submission and sends you an email notification
4. User receives success/error notification
5. If Formspree fails, the system opens the user's email client as a fallback

### Form Data Structure

```json
{
  "name": "User's Name",
  "email": "user@example.com",
  "message": "User's message",
  "_subject": "Portfolio Contact from [Name]"
}
```

### Formspree Dashboard

Access your Formspree dashboard at: https://formspree.io/forms/xeopjbwb/integration

From there you can:
- View form submissions
- Configure email notifications
- Set up integrations with other services
- Add custom redirect URLs
- Enable/disable spam filtering
- Export submission data

### Security Benefits

Compared to the previous PHPMailer implementation:
- ✅ No SMTP credentials in code
- ✅ No server-side PHP processing
- ✅ No environment variables needed
- ✅ No risk of credential exposure
- ✅ Professional spam protection
- ✅ GDPR compliant

### Free Tier Limits

Formspree Free Plan includes:
- 50 submissions per month
- Unlimited forms
- Email notifications
- Spam filtering
- File uploads (if needed in future)

### Future Enhancements

If you need more submissions or features, consider:
- **Formspree Gold** ($10/month) - 1,000 submissions/month
- **Formspree Platinum** ($40/month) - Unlimited submissions
- Custom thank you page redirect
- Webhook integrations
- Custom email templates

### Maintenance

No maintenance required! Formspree handles everything. Just monitor your email for form submissions and manage settings in your Formspree dashboard.

---

**Note:** This integration was implemented after removing PHPMailer to enhance security and simplify the deployment process.
