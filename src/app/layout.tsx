import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster, toast } from 'sonner'
import "./globals.css";
import { CSPostHogProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Holy Harmony",
  description: "Bible Study App",
  icons: {
    icon:['/favicon.ico']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="black" >
      <CSPostHogProvider>
        <Toaster position="top-center"/>
        <body className={inter.className}>{children}</body>
      </CSPostHogProvider>
    </html>
  );
}
