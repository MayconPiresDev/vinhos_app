'use client'

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Home,
    Users,
    ShoppingCart,
    BarChart2,
    Settings,
} from "lucide-react"

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Assinantes", href: "/assinantes", icon: Users },
    { label: "Pedidos", href: "/pedidos", icon: ShoppingCart },
    { label: "Relatórios", href: "/relatorios", icon: BarChart2 },
    { label: "Configurações", href: "/configuracoes", icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-sidebar border-r hidden md:block p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-xl">🍷</span>
                <h1 className="text-xl font-bold tracking-wide text-primary">Vinhos App</h1>
            </div>

            <nav className="space-y-2 text-sm">
                {navItems.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href
                    return (
                        <a
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                                isActive
                                    ? "bg-muted text-primary font-semibold"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </a>
                    )
                })}
            </nav>
        </aside>
    )
}
