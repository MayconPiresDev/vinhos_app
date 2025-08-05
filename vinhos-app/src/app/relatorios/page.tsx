'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { PageWrapper } from '@/components/ui/page-wrapper'
import { useEffect, useState } from 'react'

const assinantesPorMes = [
    { mes: 'Jan', total: 22 },
    { mes: 'Fev', total: 35 },
    { mes: 'Mar', total: 44 },
    { mes: 'Abr', total: 30 },
    { mes: 'Mai', total: 38 },
    { mes: 'Jun', total: 52 },
    { mes: 'Jul', total: 60 },
    { mes: 'Ago', total: 75 },
]

const faturamentoMensal = [
    { mes: 'Jan', valor: 7800 },
    { mes: 'Fev', valor: 8900 },
    { mes: 'Mar', valor: 10200 },
    { mes: 'Abr', valor: 9700 },
    { mes: 'Mai', valor: 11900 },
    { mes: 'Jun', valor: 13200 },
    { mes: 'Jul', valor: 14450 },
    { mes: 'Ago', valor: 15500 },
]

export default function RelatoriosPage() {
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setCarregando(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <PageWrapper>
            <h2 className="text-2xl font-semibold">Relatórios</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de assinantes */}
                <Card>
                    <CardContent className="p-4">
                        <h3 className="text-lg font-medium mb-4">Assinantes por mês</h3>
                        {carregando ? (
                            <Skeleton className="h-[300px] w-full rounded-md" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={assinantesPorMes}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis />
                                    <RechartsTooltip />
                                    <Bar dataKey="total" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Gráfico de faturamento */}
                <Card>
                    <CardContent className="p-4">
                        <h3 className="text-lg font-medium mb-4">Faturamento mensal (R$)</h3>
                        {carregando ? (
                            <Skeleton className="h-[300px] w-full rounded-md" />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={faturamentoMensal}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis />
                                    <RechartsTooltip />
                                    <Line type="monotone" dataKey="valor" stroke="#2563eb" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>
        </PageWrapper>
    )
}
