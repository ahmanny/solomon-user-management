import type { Metadata } from "next";
import "./globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/lib/query.client";
import QueryProvider from "@/lib/providers/queryProvider";

export const metadata: Metadata = {
  title: "User management app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
