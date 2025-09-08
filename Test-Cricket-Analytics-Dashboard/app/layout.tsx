import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider, ThemeToggle } from "@/components/ThemeToggle"; // <-- import ThemeToggle

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="border-b mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Test Cricket Analytics Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Explore player statistics and get AI-powered insights!
              </p>
            </div>
            <ThemeToggle />
          </nav>
          <main className="container mx-auto px-4 py-8">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
