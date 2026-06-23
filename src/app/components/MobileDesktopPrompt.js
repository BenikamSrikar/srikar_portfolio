"use client";
import { useEffect, useState } from "react";

export default function MobileDesktopPrompt() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          View on Desktop
        </h1>
        <p className="text-slate-600 text-lg mb-8 leading-relaxed">
          This portfolio is designed for desktop viewing. Please enable desktop site mode or view this page on a larger screen for the best experience.
        </p>
        <div className="space-y-3">
          <p className="text-sm text-slate-500">
            <strong>On mobile browser:</strong> Tap the menu icon (⋯) and select "Desktop site" or "Request desktop site"
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700 font-semibold">
              ℹ️ This ensures you get the full desktop experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
