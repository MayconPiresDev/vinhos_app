import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import {
    Home,
    Users,
    ShoppingCart,
    BarChart2,
    Settings,
} from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileSidebar } from "@/components/ui/mobile-sidebar"

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

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Assinantes", href: "/assinantes", icon: Users },
    { label: "Pedidos", href: "/pedidos", icon: ShoppingCart },
    { label: "Relatórios", href: "/relatorios", icon: BarChart2 },
    { label: "Configurações", href: "/configuracoes", icon: Settings },
]

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="min-h-screen flex">
                {/* Sidebar fixa (desktop) */}
                <aside className="w-64 bg-sidebar border-r hidden md:block p-6 shadow-sm">
                    <h1 className="text-xl font-bold mb-8 text-primary tracking-wide">
                        🍷 Vinhos App
                    </h1>
                    <nav className="space-y-4 text-sm">
                        {navItems.map(({ label, href, icon: Icon }) => (
                            <a
                                key={href}
                                href={href}
                                className="flex items-center gap-3 text-sidebar-foreground hover:text-primary transition-colors"
                            >
                                <Icon className="w-4 h-4" />
                                {label}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Conteúdo principal */}
                <div className="flex-1 flex flex-col">
                    <header className="bg-card border-b px-6 py-4 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile menu */}
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
