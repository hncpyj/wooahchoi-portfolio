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
  // Without this, Next cannot resolve relative URLs in openGraph/twitter metadata
  // and logs a warning on every build.
  metadataBase: new URL("https://wooahchoi.com"),
  title: "WooAh Choi | Machine Learning & Backend Engineer",
  description:
    "Portfolio of WooAh Choi — Machine Learning & Backend Engineer specializing in PyTorch, Transformers, Reinforcement Learning, XGBoost, NestJS, Spring, and scalable ML systems.",
  keywords: [
    "Machine Learning Engineer",
    "Backend Engineer",
    "Python",
    "PyTorch",
    "Reinforcement Learning",
    "Transformer",
    "BERT",
    "XGBoost",
    "NLP",
    "Information Retrieval",
    "TypeScript",
    "Java",
    "NestJS",
    "Spring",
    "PostgreSQL",
    "AWS",
  ],
  authors: [{ name: "WooAh Choi" }],
  openGraph: {
    title: "WooAh Choi | Machine Learning & Backend Engineer",
    description:
      "Machine Learning & Backend Engineer specializing in forecasting, NLP, reinforcement learning, and scalable ML systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "WooAh Choi | Machine Learning & Backend Engineer",
    description:
      "Machine Learning & Backend Engineer specializing in forecasting, NLP, reinforcement learning, and scalable ML systems.",
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
