# Service Inquiry Forms

## Overview
Each service modal now includes a dedicated inquiry form that allows potential clients to request quotes directly with service-specific context.

## Features

### 📋 Form Fields

**Required Fields:**
- **Full Name** - Client's full name
- **Email Address** - For sending quotes and communication
- **Project Details** - Detailed description of what they need

**Optional Fields:**
- **Phone Number** - Alternative contact method
- **Preferred Timeline** - Helps prioritize and schedule work
  - Urgent (1-2 days)
  - Normal (3-7 days)
  - Flexible (1-2 weeks)
  - No rush

**Auto-filled:**
- **Service Requested** - Automatically populated based on which service modal was opened

## How It Works

### 1. User Journey
1. User browses services section
2. Clicks on a service card
3. Service modal opens with details
4. Scrolls down to see the "Request a Quote" form
5. Fills out the form with their information
6. Submits the inquiry

### 2. Form Submission
- Validates required fields
- Sends data to Formspree endpoint: `https://formspree.io/f/xeopjbwb`
- Shows loading state while sending
- Displays success/error notification
- Closes modal on success
- Falls back to mailto if Formspree fails

### 3. Email Format
When submitted, you'll receive an email with subject:
```
Service Inquiry: [Service Name] - [Client Name]
```

Email content includes:
- Service requested
- Client name
- Client email
- Phone number (if provided)
- Preferred timeline
- Detailed project description

## Technical Implementation

### JavaScript Functions
- `submitServiceForm()` - Handles form validation and submission
- `sendServiceInquiry()` - Sends data to Formspree
- `resetServiceForm()` - Clears form after submission
- `openServiceModal(serviceId)` - Auto-fills service name

### State Management
```javascript
serviceForm: {
    name: '',
    email: '',
    phone: '',
    service: '',        // Auto-filled
    details: '',
    preferredTimeline: '',
    sending: false
}
```

### Validation
- Client-side validation for required fields
- Email format validation (HTML5)
- Form disabled while sending to prevent double submission

## Benefits

### For Clients
✅ **Context-aware** - Service is pre-filled, no confusion
✅ **Comprehensive** - All necessary info collected upfront
✅ **Fast response** - More details = faster, accurate quotes
✅ **Flexible** - Optional phone and timeline fields
✅ **Professional** - Inline help text and validation

### For You
✅ **Better information** - All details needed to provide accurate quotes
✅ **Organized** - Service-specific inquiries clearly labeled
✅ **Prioritization** - Timeline preference helps scheduling
✅ **Less back-and-forth** - Comprehensive initial info
✅ **Professional image** - Polished, modern form experience

## Example Inquiry

**Subject:** Service Inquiry: Data Recovery Services - John Doe

**Body:**
```
Service: Data Recovery Services

Name: John Doe
Email: john.doe@example.com
Phone: +63 917 123 4567
Preferred Timeline: Urgent (1-2 days)

Details:
I have a 500GB external hard drive that was accidentally formatted. 
It contained important family photos and work documents from the past 
5 years. The drive is still recognized by my computer but shows as 
empty. I stopped using it immediately after realizing what happened. 
Can you help recover the data?
```

## Form Flow

```
Service Modal Opened
        ↓
Service Name Auto-filled
        ↓
User Fills Form
        ↓
Client-side Validation
        ↓
Submit to Formspree
        ↓
Success Notification
        ↓
Modal Closes
        ↓
You Receive Email
```

## Maintenance

### No maintenance required!
- Uses existing Formspree endpoint
- Same configuration as contact form
- Counts toward your 50 submissions/month limit
- All submissions visible in Formspree dashboard

### Future Enhancements (Optional)
- Add file upload for service materials (screenshots, documents)
- Budget range selector
- Service-specific custom fields
- Auto-response email templates
- Integration with project management tools

## Testing

To test the forms:
1. Visit your portfolio
2. Click on any service card
3. Scroll down in the modal
4. Fill out and submit the form
5. Check your email for the inquiry

---

**Note:** Each service has its own inquiry form, but all submissions go to the same Formspree endpoint and your email. The service type is included in the email subject for easy filtering and organization.
