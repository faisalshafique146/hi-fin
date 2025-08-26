import { Inter } from "next/font/google"
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

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

          {/* Footer Section */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto">

            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
