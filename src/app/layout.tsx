import type { Metadata } from "next";
import "./globals.css";

// poppins font from next/font
import { Poppins } from "next/font/google";
import ReduxProvider from "@/lib/redux/ReduxProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={poppins.className}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
