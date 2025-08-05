'use client'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Home, Users, ShoppingCart, BarChart2, Settings } from "lucide-react"

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Assinantes", href: "/assinantes", icon: Users },
    { label: "Pedidos", href: "/pedidos", icon: ShoppingCart },
    { label: "Relatórios", href: "/relatorios", icon: BarChart2 },
    { label: "Configurações", href: "/configuracoes", icon: Settings },
]

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
                <SheetHeader>
                    <h2 className="text-lg font-bold text-primary">🍷 Vinhos App</h2>
                </SheetHeader>
                <nav className="mt-6 space-y-4">
                    {navItems.map(({ label, href, icon: Icon }) => (
                        <a
                            key={href}
                            href={href}
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </a>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
