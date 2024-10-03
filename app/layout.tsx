import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ClientWrapper from "@/components/ClientWrapper";
export const metadata: Metadata = {
  title: "Move Name Service",
  description: "Movement Labs Name Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-moveyellow flex-col relative max-w-screen min-h-screen justify-between">
        {/* Wrap everything in ClientWrapper */}
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
