# Benikam Srikar Portfolio

A modern, interactive portfolio website built with Next.js, featuring 3D animations, AI image processing demonstrations, and responsive design.

## 🚀 Features

- **Interactive 3D Models**: Three.js integration with animated GLB models
- **AI Enhancement Demo**: Before/after image comparison with smooth slider interaction
- **Animated Skill Showcase**: GSAP-powered skill transition animations  
- **Black Hole Simulation**: WebGL shader-based particle system
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Contact Form**: Integrated email functionality with validation
- **Performance Optimized**: Lazy loading and efficient animations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **3D Graphics**: Three.js
- **Email**: Nodemailer
- **UI Components**: Lucide React Icons

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- Gmail account (for contact form)

## ⚡ Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd portfolio-16
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values:
# EMAIL_USER=your-gmail@gmail.com  
# EMAIL_PASS=your-app-password
```

### 3. Gmail App Password Setup

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Generate an App Password for "Mail"
4. Use this password in `EMAIL_PASS`

### 4. Development

```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
src/
├── app/
│   ├── components/         # React components
│   │   ├── About.js       # About section
│   │   ├── Projects.js    # Project showcase with image splitter
│   │   ├── Skills.js      # Animated skills section
│   │   ├── ModelView.js   # 3D model viewer
│   │   └── ...
│   ├── api/
│   │   └── contact/       # Email API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout with error boundary
│   └── page.js            # Home page
├── public/
│   ├── models/            # 3D GLB files
│   ├── images/            # Static images
│   └── videos/            # Video assets
```

## 🎨 Key Components

### Projects Section
- **SWIFT**: File transfer platform with live demo
- **VEDA**: AI enhancement tool with before/after comparison
- Interactive image slider for VEDA project

### Skills Section
- Animated transition between tech stack and soft skills
- GSAP scroll-triggered animations
- Categorized skill badges

### 3D Model Viewer
- Animated GLB model with video texture
- Three.js scene with optimized lighting
- Auto-play video integration

## 🔧 Configuration

### Email Configuration
The contact form requires Gmail SMTP setup:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-16-char-app-password
```

### Asset Management
- Place 3D models in `public/models/`
- Add images to `public/images/`
- Videos go in `public/videos/`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Common Issues

**Contact form not working**
- Verify Gmail app password is correct
- Check console for authentication errors
- Ensure 2FA is enabled on Google account

**3D model not loading**
- Check file paths in `public/models/`
- Verify GLB file format
- Check browser console for Three.js errors

**PowerShell execution errors (Windows)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 📄 License

This project is for portfolio purposes. Feel free to use as inspiration, but please don't copy directly.

## 🤝 Contact

**Benikam Srikar**  
Software Engineer  
Email: [your-email@domain.com]  
LinkedIn: [your-linkedin-profile]  
GitHub: [your-github-profile]

---

Built with ❤️ using Next.js and modern web technologies.