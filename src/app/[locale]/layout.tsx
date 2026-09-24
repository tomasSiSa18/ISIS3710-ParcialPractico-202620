import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Planes",
  description: "Encuentra planes cerca de ti",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {

  const { locale } = await params
  const messages = await getMessages()
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
        <Header />
        {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
