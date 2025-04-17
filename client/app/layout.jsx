import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] }); //font from google

export const metadata = {
  title: " LearnTrack - Task and Course Management",
  description: "Manage your tasks and courses efficiently",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers> 
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
