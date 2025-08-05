'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function ConfiguracoesPage() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Configurações</h2>

            <Accordion type="multiple" className="w-full">
                {/* Seção Conta */}
                <AccordionItem value="conta">
                    <AccordionTrigger>Conta</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <div className="space-y-2">
                            <Label htmlFor="nome">Nome</Label>
                            <Input id="nome" placeholder="Maycon Pires" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" placeholder="admin@vinhos.com.br" />
                        </div>
                        <div className="space-y-2">
                            <Label>Tema</Label>
                            <ThemeToggle />
                        </div>
                        <div className="flex justify-end">
                            <Button variant="default">Salvar</Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Seção Integrações */}
                <AccordionItem value="integracoes">
                    <AccordionTrigger>Integrações</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <div className="space-y-2">
                            <Label htmlFor="tray">Chave da API Tray</Label>
                            <Input id="tray" placeholder="••••••••••••••••••" disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bling">Chave da API Bling</Label>
                            <Input id="bling" placeholder="••••••••••••••••••" disabled />
                        </div>
                        <div className="flex justify-end">
                            <Button variant="secondary">Resetar</Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Seção Notificações */}
                <AccordionItem value="notificacoes">
                    <AccordionTrigger>Notificações</AccordionTrigger>
                    <AccordionContent className="space-y-4 p-4">
                        <div className="space-y-2">
                            <Label htmlFor="email-notif">E-mail para alertas</Label>
                            <Input id="email-notif" type="email" placeholder="alertas@vinhos.com.br" />
                        </div>
                        <div className="flex justify-end">
                            <Button variant="default">Salvar notificações</Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
