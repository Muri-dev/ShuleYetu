import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Framer Elite Academy — School Management Platform",
    template: "%s | Framer Elite Academy",
  },
  description:
    "A premium school management ecosystem for modern educational institutions. Manage academics, students, staff, results, inventory, and more.",
  keywords: [
    "school management",
    "education platform",
    "student records",
    "academic management",
    "Kenya school system",
  ],
  authors: [{ name: "Framer Elite" }],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "Framer Elite Academy",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-surface-50 text-surface-900 antialiased">
        {children}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            className: "font-sans",
            duration: 4000,
          }}
        />
      </body>
    </html>
  );
}
