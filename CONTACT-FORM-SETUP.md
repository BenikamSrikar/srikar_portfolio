# Contact Form Setup Guide

## 📦 Required Packages

Run these commands in your terminal:

```bash
npm install @emailjs/browser canvas-confetti
```

Or with yarn:

```bash
yarn add @emailjs/browser canvas-confetti
```

---

## 🔧 EmailJS Configuration Steps

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up (free account)
3. Verify your email

### Step 2: Add Gmail Service
1. Dashboard → **Email Services** → **Add New Service**
2. Select **Gmail**
3. Connect your account: `benikamsrikar06@gmail.com`
4. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Dashboard → **Email Templates** → **Create New Template**
2. Use the HTML from `email-template.html`
3. Set **To Email**: `benikamsrikar06@gmail.com`
4. Set **From**: `{{from_name}} <{{from_email}}>`
5. Set **Reply To**: `{{from_email}}`
6. Set **Subject**: `New Portfolio Contact from {{from_name}}`
7. Copy the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Dashboard → **Account** → **General**
2. Copy your **Public Key** (e.g., `abcDEF123xyz`)

### Step 5: Update Contact.js

Find these 3 lines in `src/app/components/Contact.js`:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");  // Line ~95

const response = await emailjs.send(
  'YOUR_SERVICE_ID',              // Line ~108
  'YOUR_TEMPLATE_ID',             // Line ~109
  templateParams
);
```

Replace with your actual values:

```javascript
emailjs.init("abcDEF123xyz");

const response = await emailjs.send(
  'service_abc123',
  'template_xyz789',
  templateParams
);
```

---

## ✨ New Features Implemented

### 1. Contact Link Added
- ✅ Sidebar navigation (Mail icon)
- ✅ Homepage social buttons (orange Mail button)

### 2. Form Validation
- ✅ Step 1: First Name required
- ✅ Step 2: Valid email required
- ✅ Step 3: Optional (no validation)
- ✅ Step 4: Rating required (1-5 stars)
- ✅ "Next" button disabled until step is complete

### 3. Success Animation
- ✅ Confetti explosion on successful send
- ✅ Success card with checkmark
- ✅ Orange confetti colors matching theme
- ✅ Auto-reset to step 1 after 3 seconds

### 4. Error Handling
- ✅ Shows error message if email fails
- ✅ Console logs error details
- ✅ Form doesn't reset on error

---

## 🎯 How It Works

### Validation Logic:

**Step 1 (Personal Info):**
- First Name must have at least 1 character
- Last Name is optional
- "Next" button enabled only when first name is filled

**Step 2 (Contact Details):**
- Email must match regex pattern: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- Social links are optional
- "Next" button enabled only when email is valid

**Step 3 (Feedback):**
- All fields optional
- "Next" button always enabled

**Step 4 (Rating):**
- Must select at least 1 star (1-5)
- "Complete" button enabled only when rating is selected

### Submission Flow:

1. User completes all 4 steps
2. Clicks "Complete" on Step 4
3. Form validates rating
4. EmailJS sends email to `benikamsrikar06@gmail.com`
5. If successful:
   - Shows success card with checkmark
   - Triggers colorful confetti explosion
   - Waits 3 seconds
   - Resets form to Step 1
   - Hides success card
6. If failed:
   - Shows error message
   - Form stays on Step 4
   - User can try again

---

## 🎨 Visual Features

### Confetti Effect:
- **Color Palette**: Orange shades (#ea580c, #f97316, #fb923c, #fdba74, #fed7aa)
- **Duration**: 3 seconds
- **Particles**: 50 per interval
- **Launch Points**: Left and right sides of screen
- **Z-Index**: 9999 (appears above everything)

### Success Card:
- Green checkmark icon
- "Success!" heading
- Confirmation message
- Pulsing sparkles icon
- White background with shadow

---

## 🐛 Troubleshooting

### "Module not found: canvas-confetti"
```bash
npm install canvas-confetti
```

### "EmailJS Error: {}"
- Check if Service ID, Template ID, and Public Key are correct
- Verify EmailJS account is verified
- Check browser console for detailed error
- Ensure template variables match exactly

### "Next button not working"
- Check console for validation errors
- Ensure fields are filled correctly
- Email must be valid format

### "Email not arriving"
- Check spam folder
- Verify EmailJS service is connected
- Check EmailJS dashboard for send history
- Verify template is set to send to `benikamsrikar06@gmail.com`

---

## 📧 Email Template Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Full name | "John Doe" |
| `{{from_email}}` | Email address | "john@example.com" |
| `{{social_links}}` | Social URLs | LinkedIn, GitHub links |
| `{{improvements}}` | Feedback | User suggestions |
| `{{rating}}` | Star rating | "4/5 stars" |
| `{{to_email}}` | Your email | benikamsrikar06@gmail.com |
| `{{to_name}}` | Your name | Benikam Srikar |

---

## ✅ Testing Checklist

1. ☐ Install both packages
2. ☐ Set up EmailJS account
3. ☐ Add Gmail service
4. ☐ Create email template
5. ☐ Update Contact.js with credentials
6. ☐ Test Step 1 validation (first name required)
7. ☐ Test Step 2 validation (email required)
8. ☐ Test Step 4 validation (rating required)
9. ☐ Submit form and check email arrives
10. ☐ Verify confetti animation works
11. ☐ Verify form resets to Step 1
12. ☐ Test error handling

---

## 🎉 Complete Feature List

✅ 4-step contact form with Stepper
✅ Form validation on each step
✅ Disabled "Next" button until step complete
✅ Beautiful HTML email template
✅ EmailJS integration
✅ Orange confetti celebration
✅ Success card with checkmark
✅ Auto-reset after 3 seconds
✅ Contact link in sidebar
✅ Contact button on homepage
✅ Error handling and feedback
✅ Mobile responsive
✅ Orange color palette throughout

---

Your portfolio now has a professional, validated contact form with celebration effects! 🚀
