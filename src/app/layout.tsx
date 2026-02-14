import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "WooAh Choi | Backend & Machine Learning Engineer",
  description:
    "Portfolio of WooAh Choi — Backend & Machine Learning Engineer specializing in TypeScript, Java, NestJS, Spring, PostgreSQL, AWS, and scalable API design.",
  keywords: [
    "Backend Engineer",
    "Software Engineer",
    "TypeScript",
    "Java",
    "NestJS",
    "Spring",
    "PostgreSQL",
    "AWS",
    "Docker",
    "REST API",
    "GraphQL",
  ],
  authors: [{ name: "WooAh Choi" }],
  openGraph: {
    title: "WooAh Choi | Backend & Machine Learning Engineer",
    description:
      "Backend & Machine Learning  Engineer specializing in scalable systems, API design, and cloud infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WooAh Choi | Backend & Machine Learning Engineer",
    description:
      "Backend Machine Learning Engineer specializing in scalable systems, API design, and cloud infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
