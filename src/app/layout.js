import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "./components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Benikam Srikar — Portfolio",
  description: "Software Engineer · Backend · Distributed Systems · Real-Time Systems",
  keywords: ["Benikam Srikar", "Software Engineer", "Backend Developer", "Portfolio", "React", "Node.js", "JavaScript"],
  authors: [{ name: "Benikam Srikar" }],
  creator: "Benikam Srikar",
  openGraph: {
    title: "Benikam Srikar — Portfolio",
    description: "Software Engineer · Backend · Distributed Systems · Real-Time Systems",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
