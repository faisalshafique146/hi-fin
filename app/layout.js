import { Inter } from "next/font/google"
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Hi-Fin",
  description: "One Stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}
        >
          {/* Header Section */}
          <Header />

          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/* Footer Section */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto">
              <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700">

                {/* Logo + Description */}
                <div>
                  <Link href="/">
                    <Image
                      src={"/logo.png"}
                      alt="Logo"
                      width={200}
                      height={60}
                      className="h-12 w-auto object-contain scale-150"
                    />
                  </Link>
                  <p className="mt-4 text-sm text-gray-600 max-w-sm">
                    One stop platform to manage your finances smarter. Track, save, and grow
                    — all in one place.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
                    <li><Link href="/about" className="hover:text-blue-600">About Us</Link></li>
                    <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                    <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
                  <div className="flex space-x-4">
                    <Link href="#" className="text-gray-500 hover:text-blue-600">Twitter</Link>
                    <Link href="#" className="text-gray-500 hover:text-blue-600">LinkedIn</Link>
                    <Link href="#" className="text-gray-500 hover:text-blue-600">Facebook</Link>
                  </div>
                </div>
              </div>

              {/* Bottom note */}
              <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} HiFin. All rights reserved.
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
