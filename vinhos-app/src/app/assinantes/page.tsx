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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"

type Assinante = {
    nome: string
    email: string
    status: "Ativo" | "Inativo"
    renovacao: string
}

const dadosBase: Assinante[] = [
    {
        nome: "João Oliveira",
        email: "joao@email.com",
        status: "Ativo",
        renovacao: "2025-08-10",
    },
    {
        nome: "Ana Santos",
        email: "ana@email.com",
        status: "Inativo",
        renovacao: "2025-06-01",
    },
    {
        nome: "Carlos Souza",
        email: "carlos@email.com",
        status: "Ativo",
        renovacao: "2025-08-20",
    },
    {
        nome: "Fernanda Ribeiro",
        email: "fer@email.com",
        status: "Ativo",
        renovacao: "2025-08-18",
    },
    {
        nome: "Marcos Dias",
        email: "marcos@email.com",
        status: "Inativo",
        renovacao: "2025-05-20",
    },
]

export default function AssinantesPage() {
    const [busca, setBusca] = useState("")
    const [filtroStatus, setFiltroStatus] = useState("Todos")

    const assinantes = dadosBase.filter((a) => {
        const nomeMatch = a.nome.toLowerCase().includes(busca.toLowerCase())
        const statusMatch = filtroStatus === "Todos" || a.status === filtroStatus
        return nomeMatch && statusMatch
    })

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Assinantes</h2>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <Input
                    placeholder="Buscar por nome..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full md:w-64"
                />
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                    <SelectTrigger className="w-full md:w-52">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos">Todos</SelectItem>
                        <SelectItem value="Ativo">Ativos</SelectItem>
                        <SelectItem value="Inativo">Inativos</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tabela */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Renovação</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assinantes.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                Nenhum assinante encontrado.
                            </TableCell>
                        </TableRow>
                    ) : (
                        assinantes.map((assinante, index) => (
                            <TableRow key={index}>
                                <TableCell className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                            {assinante.nome
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    {assinante.nome}
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {assinante.email}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant={
                                            assinante.status === "Ativo" ? "default" : "destructive"
                                        }
                                    >
                                        {assinante.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {assinante.renovacao}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                                            <DropdownMenuItem>Editar</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600">
                                                Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
