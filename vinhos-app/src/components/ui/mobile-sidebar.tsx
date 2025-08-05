'use client'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Home,
    Users,
    ShoppingCart,
    BarChart2,
    Settings,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Assinantes", href: "/assinantes", icon: Users },
    { label: "Pedidos", href: "/pedidos", icon: ShoppingCart },
    { label: "Relatórios", href: "/relatorios", icon: BarChart2 },
    { label: "Configurações", href: "/configuracoes", icon: Settings },
]

export function MobileSidebar() {
    const pathname = usePathname()

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

                <nav className="mt-6 space-y-2 text-sm">
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
            </SheetContent>
        </Sheet>
    )
}
