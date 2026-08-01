# EmailJS Setup Guide for Portfolio Contact Form

## 📧 Beautiful HTML Email Template Created!

A professional, responsive HTML email template has been created with:
- ✅ Orange gradient header matching your portfolio
- ✅ Organized sections for all form data
- ✅ Star rating display
- ✅ Quick reply button
- ✅ Professional footer
- ✅ Mobile-responsive design

---

## 🚀 Setup Instructions

### Step 1: Install EmailJS (if not done)
```bash
npm install @emailjs/browser
```

### Step 2: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (free plan available)
3. Verify your email address

### Step 3: Add Email Service

1. Go to **Email Services** in dashboard
2. Click **Add New Service**
3. Choose **Gmail** (recommended)
4. Click **Connect Account**
5. Sign in with your Gmail: **benikamsrikar06@gmail.com**
6. Allow EmailJS permissions
7. Copy the **Service ID** (e.g., `service_abc123`)

### Step 4: Create Email Template

1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. **Template Name**: `portfolio_contact_form`
4. Copy and paste the HTML from `email-template.html` into the **Content** field
5. Set these fields:

**From:**
```
{{from_name}} <{{from_email}}>
```

**To:**
```
benikamsrikar06@gmail.com
```

**Subject:**
```
New Portfolio Contact from {{from_name}}
```

**Reply To:**
```
{{from_email}}
```

6. Click **Save**
7. Copy the **Template ID** (e.g., `template_xyz789`)

### Step 5: Get Public Key

1. Go to **Account** → **General**
2. Find **Public Key** section
3. Copy your **Public Key** (e.g., `abcDEF123ghiJKL`)

### Step 6: Update Contact.js

Replace these lines in `src/app/components/Contact.js`:

```javascript
const serviceId = 'YOUR_SERVICE_ID';      // Replace with your Service ID
const templateId = 'YOUR_TEMPLATE_ID';    // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY';      // Replace with your Public Key
```

**Example:**
```javascript
const serviceId = 'service_abc123';
const templateId = 'template_xyz789';
const publicKey = 'abcDEF123ghiJKL';
```

---

## 📝 Email Template Variables

The template uses these variables (automatically filled from form):

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Visitor's full name | "John Doe" |
| `{{from_email}}` | Visitor's email | "john@example.com" |
| `{{social_links}}` | Social profile links | LinkedIn, GitHub URLs |
| `{{improvements}}` | Feedback text | Portfolio suggestions |
| `{{rating}}` | Star rating | "4/5 stars" |
| `{{to_email}}` | Your email (static) | benikamsrikar06@gmail.com |
| `{{to_name}}` | Your name (static) | Benikam Srikar |

---

## 🎨 Email Template Features

### Header
- Orange gradient background (#ea580c → #f97316)
- Welcome message with emoji
- Professional typography

### Content Sections
1. **Visitor Info Card** - Name with avatar icon
2. **Contact Details** - Email and social links
3. **Feedback Section** - Yellow highlight box for improvements
4. **Rating Display** - Star emojis with score
5. **Quick Action** - Reply button with mailto link

### Footer
- Professional branding
- Copyright notice
- Source information

---

## ✅ Testing Your Setup

### Test Email Sending:

1. Fill out the contact form on your portfolio
2. Complete all 4 steps
3. Submit the form
4. Check **benikamsrikar06@gmail.com** inbox
5. Verify the email looks correct

### Troubleshooting:

**Error: "Service not found"**
- Check Service ID is correct
- Ensure Gmail service is connected

**Error: "Template not found"**
- Verify Template ID matches
- Ensure template is saved

**Error: "Invalid public key"**
- Copy Public Key exactly (no spaces)
- Check Account settings

**Emails not arriving:**
- Check Gmail spam folder
- Verify EmailJS account is verified
- Check EmailJS usage limits (free plan: 200/month)

---

## 🔒 Security Notes

- ✅ Public Key is safe to expose in frontend code
- ✅ EmailJS handles email sending securely
- ✅ No backend server required
- ✅ Rate limiting prevents spam
- ✅ Your Gmail password is NEVER exposed

---

## 📊 EmailJS Free Plan Limits

- 200 emails per month
- 1 email service
- 2 email templates
- Community support

*Upgrade to paid plan for more emails if needed*

---

## 🎯 What Happens When Form is Submitted?

1. User fills out 4-step form
2. Clicks "Complete" on final step
3. EmailJS sends beautiful HTML email to **benikamsrikar06@gmail.com**
4. Success message shows in stepper
5. Form resets automatically after 3 seconds
6. You receive formatted email with all details

---

## 📞 Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com
- Common Issues: https://www.emailjs.com/docs/faq/

---

✨ **Your portfolio now has a professional multi-step contact form with beautiful email notifications!**
