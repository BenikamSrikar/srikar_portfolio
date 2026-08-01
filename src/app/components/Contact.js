"use client";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import Stepper, { Step } from './Stepper';
import { Star, Mail, User, MessageSquare, Send, MapPin, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import TextReveal from './TextReveal';
import confetti from 'canvas-confetti';

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    socialLinks: '',
    improvements: '',
    rating: 0
  });
  
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa']
      });
    }, 250);
  };

  // Validation functions
  const isStep1Valid = () => {
    return formData.firstName.trim().length > 0;
  };

  const isStep2Valid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email);
  };

  const isStep3Valid = () => {
    return true; // Optional field
  };

  const isStep4Valid = () => {
    return formData.rating > 0;
  };

  const canProceed = (step) => {
    switch(step) {
      case 1: return isStep1Valid();
      case 2: return isStep2Valid();
      case 3: return isStep3Valid();
      case 4: return isStep4Valid();
      default: return true;
    }
  };

  const handleFinalStepCompleted = async () => {
    if (!isStep4Valid()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Initialize EmailJS with your public key
      emailjs.init("4tPKGE0ACOBbVfhC-");

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        from_email: formData.email,
        social_links: formData.socialLinks || 'Not provided',
        improvements: formData.improvements || 'No improvements suggested',
        rating: `${formData.rating}/5 stars`,
        to_email: 'benikamsrikar06@gmail.com',
        to_name: 'Benikam Srikar',
      };

      // Send email with your service and template IDs
      const response = await emailjs.send(
        'service_lm5edq3',
        'template_e5slprp',
        templateParams
      );

      console.log('Email sent successfully:', response);
      setSubmitStatus('success');
      setShowSuccess(true);
      
      // Trigger confetti
      triggerConfetti();
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          socialLinks: '',
          improvements: '',
          rating: 0
        });
        setCurrentStep(1);
        setShowSuccess(false);
        setSubmitStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact" className="w-full min-h-screen bg-[#f8faff] flex items-center justify-center px-6 sm:px-12 md:px-20 py-20">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Side - Thank You Message */}
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-black tracking-tight leading-none mb-6">
            <TextReveal text="Thank You" />
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 tracking-tight leading-none mb-8">
            <TextReveal text="for visiting" />
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            I appreciate you taking the time to explore my portfolio. If you have any questions, 
            opportunities, or just want to connect, feel free to reach out.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-black font-medium">benikamsrikar06@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-black font-medium">Hyderabad, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Stepper Contact Form */}
        <div className="flex flex-col justify-center">
          {showSuccess ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600">Your message has been sent successfully.</p>
              </div>
              <Sparkles className="w-8 h-8 text-orange-600 mx-auto animate-pulse" />
            </div>
          ) : (
            <Stepper
              initialStep={currentStep}
              onStepChange={(step) => setCurrentStep(step)}
              onFinalStepCompleted={handleFinalStepCompleted}
              backButtonText="Previous"
              nextButtonText="Next"
              nextButtonProps={{
                disabled: !canProceed(currentStep)
              }}
            >
            {/* Step 1: Name */}
            <Step>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </Step>

            {/* Step 2: Email & Social Links */}
            <Step>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Contact Details</h3>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-700 mb-2">
                    Social Links <span className="text-gray-400 text-xs">(LinkedIn, GitHub, etc.)</span>
                  </label>
                  <textarea
                    id="socialLinks"
                    rows="3"
                    value={formData.socialLinks}
                    onChange={(e) => handleInputChange('socialLinks', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="linkedin.com/in/yourprofile&#10;github.com/yourprofile"
                  />
                </div>
              </div>
            </Step>

            {/* Step 3: Improvements */}
            <Step>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Feedback & Suggestions</h3>
                </div>
                <div>
                  <label htmlFor="improvements" className="block text-sm font-medium text-gray-700 mb-2">
                    How can I improve my portfolio?
                  </label>
                  <textarea
                    id="improvements"
                    rows="6"
                    value={formData.improvements}
                    onChange={(e) => handleInputChange('improvements', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Share your thoughts on design, content, functionality, or anything else..."
                  />
                </div>
              </div>
            </Step>

            {/* Step 4: Rating */}
            <Step>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-orange-600" />
                  <h3 className="text-xl font-bold text-gray-900">Rate Your Experience</h3>
                </div>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-6">How would you rate your experience with my portfolio?</p>
                  <div className="flex justify-center gap-3 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleInputChange('rating', star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`w-12 h-12 transition-colors ${
                            star <= (hoveredRating || formData.rating)
                              ? 'fill-orange-500 text-orange-500'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {formData.rating > 0 && (
                    <p className="text-2xl font-bold text-orange-600">
                      {formData.rating} / 5 Stars
                    </p>
                  )}
                </div>
                
                {/* Submission Status */}
                {submitStatus === 'success' && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <p className="text-green-800 font-medium">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <p className="text-red-800 font-medium">Oops! Something went wrong. Please try again.</p>
                  </div>
                )}
                {isSubmitting && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
                    <Send className="w-6 h-6 text-blue-600 animate-pulse" />
                    <p className="text-blue-800 font-medium">Sending your message...</p>
                  </div>
                )}
              </div>
            </Step>
          </Stepper>
          )}
        </div>

      </div>
    </div>
  );
}
