'use client'

import {
    BarChart3,
    Users2,
    ShoppingCart,
    MessageCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip as RechartsTooltip,
    PieChart,
    Pie,
    Cell,
} from "recharts"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PageWrapper } from "@/components/ui/page-wrapper"

const cores = ["#10b981", "#ef4444", "#facc15"]

const dadosSimulados = {
    faturamento: {
        "30": [
            { mes: "Jul", valor: 14450 },
            { mes: "Ago", valor: 15500 },
        ],
        "90": [
            { mes: "Jun", valor: 13200 },
            { mes: "Jul", valor: 14450 },
            { mes: "Ago", valor: 15500 },
        ],
        "360": [
            { mes: "Jan", valor: 7800 },
            { mes: "Fev", valor: 8900 },
            { mes: "Mar", valor: 10200 },
            { mes: "Abr", valor: 9700 },
            { mes: "Mai", valor: 11900 },
            { mes: "Jun", valor: 13200 },
            { mes: "Jul", valor: 14450 },
            { mes: "Ago", valor: 15500 },
        ],
    },
    assinantes: [
        { status: "Ativos", value: 327 },
        { status: "Inativos", value: 48 },
        { status: "Pendentes", value: 15 },
    ],
}

export default function DashboardPage() {
    const [periodo, setPeriodo] = useState<"30" | "90" | "360">("90")
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setCarregando(false), 1200)
        return () => clearTimeout(timer)
    }, [periodo])

    const cards = [
        {
            title: "Assinantes Ativos",
            value: 327,
            icon: Users2,
            badge: "+8 esta semana",
        },
        {
            title: "Vendas no Mês",
            value: "R$ 28.450",
            icon: ShoppingCart,
            badge: "+12% comparado a julho",
        },
        {
            title: "Renovações Pendentes",
            value: 15,
            icon: BarChart3,
            badge: "3 cancelamentos",
        },
        {
            title: "Reengajamentos WhatsApp",
            value: 42,
            icon: MessageCircle,
            badge: "30% taxa de resposta",
        },
    ]

    return (
        <PageWrapper>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Dashboard</h2>

                <Select value={periodo} onValueChange={(v: "30" | "90" | "360") => setPeriodo(v)}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="30">Últimos 30 dias</SelectItem>
                        <SelectItem value="90">Últimos 90 dias</SelectItem>
                        <SelectItem value="360">Ano completo</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map(({ title, value, icon: Icon, badge }, index) => (
                    <Card key={index} className="bg-card rounded-xl shadow-sm border border-border">
                        <CardContent className="p-6 flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-primary" />
                                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                            </div>
                            <p className="text-2xl font-bold">{value}</p>
                            <Badge variant="outline">{badge}</Badge>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="h-[340px]">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-medium mb-4">Faturamento ({periodo} dias)</h3>
                        {carregando ? (
                            <Skeleton className="h-[260px] w-full rounded-md" />
                        ) : (
                            <ResponsiveContainer width="100%" height={260}>
                                <LineChart data={dadosSimulados.faturamento[periodo]}>
                                    <XAxis dataKey="mes" />
                                    <YAxis />
                                    <RechartsTooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="valor"
                                        stroke="#841E33"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                <Card className="h-[340px]">
                    <CardContent className="p-4">
                        <h3 className="text-lg font-medium mb-4">Distribuição de Assinantes</h3>
                        {carregando ? (
                            <Skeleton className="h-[260px] w-full rounded-md" />
                        ) : (
                            <ResponsiveContainer width="100%" height={260}>
                                <PieChart>
                                    <Pie
                                        data={dadosSimulados.assinantes}
                                        dataKey="value"
                                        nameKey="status"
                                        outerRadius={80}
                                        label
                                    >
                                        {dadosSimulados.assinantes.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={cores[index % cores.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    )
}
