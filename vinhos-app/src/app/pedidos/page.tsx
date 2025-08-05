'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Truck, PackageCheck, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { PageWrapper } from "@/components/ui/page-wrapper"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"

type Pedido = {
    id: string
    cliente: string
    valor: string
    status: "Pago" | "Pendente" | "Cancelado"
    data: string
    entregaPrevista: string
    etapa: "Processando" | "Enviado" | "Entregue"
}

const pedidosFakes: Pedido[] = [
    {
        id: "PED-1001",
        cliente: "João Oliveira",
        valor: "R$ 249,90",
        status: "Pago",
        data: "05/08/2025",
        entregaPrevista: "10/08/2025",
        etapa: "Entregue",
    },
    {
        id: "PED-1002",
        cliente: "Ana Santos",
        valor: "R$ 179,00",
        status: "Pendente",
        data: "04/08/2025",
        entregaPrevista: "12/08/2025",
        etapa: "Processando",
    },
    {
        id: "PED-1003",
        cliente: "Carlos Souza",
        valor: "R$ 299,90",
        status: "Cancelado",
        data: "01/08/2025",
        entregaPrevista: "-",
        etapa: "Processando",
    },
    {
        id: "PED-1004",
        cliente: "Fernanda Ribeiro",
        valor: "R$ 145,90",
        status: "Pago",
        data: "06/08/2025",
        entregaPrevista: "11/08/2025",
        etapa: "Enviado",
    },
]

export default function PedidosPage() {
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setCarregando(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <PageWrapper>
            <h2 className="text-2xl font-semibold">Pedidos</h2>

            {carregando ? (
                <div className="space-y-4 mt-4">
                    <Skeleton className="h-8 w-full rounded-md" />
                    <Skeleton className="h-8 w-full rounded-md" />
                    <Skeleton className="h-8 w-full rounded-md" />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pedido</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Etapa</TableHead>
                            <TableHead>Entrega Prevista</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pedidosFakes.map((pedido) => (
                            <TableRow key={pedido.id}>
                                <TableCell>{pedido.id}</TableCell>
                                <TableCell>{pedido.cliente}</TableCell>
                                <TableCell>{pedido.valor}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            pedido.status === "Pago"
                                                ? "default"
                                                : pedido.status === "Pendente"
                                                    ? "secondary"
                                                    : "destructive"
                                        }
                                    >
                                        {pedido.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="flex items-center gap-2 text-muted-foreground">
                                    {pedido.etapa === "Entregue" && (
                                        <PackageCheck className="w-4 h-4 text-green-600" />
                                    )}
                                    {pedido.etapa === "Enviado" && (
                                        <Truck className="w-4 h-4 text-blue-600" />
                                    )}
                                    {pedido.etapa === "Processando" && (
                                        <Clock className="w-4 h-4 text-yellow-500" />
                                    )}
                                    <span>{pedido.etapa}</span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {pedido.entregaPrevista}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    Ações do pedido
                                                </TooltipContent>
                                            </Tooltip>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                Cancelar pedido
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </PageWrapper>
    )
}
