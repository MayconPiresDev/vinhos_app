import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileSidebar } from "@/components/ui/mobile-sidebar"
import { Sidebar } from "@/components/ui/sidebar"

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Vinhos App",
    description: "Plataforma unificada Vinhos de Bicicleta",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex">
                {/* Sidebar importada do client */}
                <Sidebar />

                <div className="flex-1 flex flex-col">
                    <header className="bg-card border-b px-6 py-4 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <MobileSidebar />
                            <span className="text-lg font-semibold hidden md:inline">
                    Painel Administrativo
                  </span>
                        </div>
                        <ThemeToggle />
                    </header>
                    <main className="flex-1 p-6">{children}</main>
                </div>
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}
