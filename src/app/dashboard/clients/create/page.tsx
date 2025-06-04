"use client";

import type React from "react";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
export default function CreateClientPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientData, setClientData] = useState({
    name: "",
    nit: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    notes: "",
    taxResponsible: true,
    sendInvoicesByEmail: true,
    status: "active",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setClientData({
      ...clientData,
      [field]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulación de envío a API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mostrar toast de éxito
      toast({
        title: "Cliente creado exitosamente",
        description: `${clientData.name} ha sido agregado a tu lista de clientes.`,
        variant: "success",
      });

      // Redireccionar a la lista de clientes
      setTimeout(() => {
        router.push("/clients");
      }, 1000);
    } catch (error) {
      // Mostrar toast de error
      toast({
        title: "Error al crear cliente",
        description: "Ha ocurrido un error. Por favor intenta nuevamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Link href="/clients" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Clientes
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Nuevo Cliente</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>
                  Ingresa los datos principales del cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      Razón Social / Nombre{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={clientData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Empresa S.A.S"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nit">
                      NIT / Documento <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nit"
                      value={clientData.nit}
                      onChange={(e) => handleInputChange("nit", e.target.value)}
                      placeholder="Ej: 900123456-1"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={clientData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="correo@empresa.com"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={clientData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+57 1 234 5678"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="taxResponsible"
                    checked={clientData.taxResponsible}
                    onCheckedChange={(checked) =>
                      handleInputChange("taxResponsible", checked)
                    }
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="taxResponsible">Responsable de IVA</Label>
                </div>
              </CardContent>
            </Card>

            {/* Dirección */}
            <Card>
              <CardHeader>
                <CardTitle>Dirección</CardTitle>
                <CardDescription>
                  Información de ubicación del cliente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={clientData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="Calle / Carrera / Avenida"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      value={clientData.city}
                      onChange={(e) =>
                        handleInputChange("city", e.target.value)
                      }
                      placeholder="Ciudad"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">Departamento</Label>
                    <Select
                      value={clientData.state}
                      onValueChange={(value) =>
                        handleInputChange("state", value)
                      }
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazonas">Amazonas</SelectItem>
                        <SelectItem value="antioquia">Antioquia</SelectItem>
                        <SelectItem value="arauca">Arauca</SelectItem>
                        <SelectItem value="atlantico">Atlántico</SelectItem>
                        <SelectItem value="bogota">Bogotá D.C.</SelectItem>
                        <SelectItem value="bolivar">Bolívar</SelectItem>
                        <SelectItem value="boyaca">Boyacá</SelectItem>
                        <SelectItem value="caldas">Caldas</SelectItem>
                        <SelectItem value="caqueta">Caquetá</SelectItem>
                        <SelectItem value="casanare">Casanare</SelectItem>
                        <SelectItem value="cauca">Cauca</SelectItem>
                        <SelectItem value="cesar">Cesar</SelectItem>
                        <SelectItem value="choco">Chocó</SelectItem>
                        <SelectItem value="cordoba">Córdoba</SelectItem>
                        <SelectItem value="cundinamarca">
                          Cundinamarca
                        </SelectItem>
                        <SelectItem value="guainia">Guainía</SelectItem>
                        <SelectItem value="guaviare">Guaviare</SelectItem>
                        <SelectItem value="huila">Huila</SelectItem>
                        <SelectItem value="laguajira">La Guajira</SelectItem>
                        <SelectItem value="magdalena">Magdalena</SelectItem>
                        <SelectItem value="meta">Meta</SelectItem>
                        <SelectItem value="narino">Nariño</SelectItem>
                        <SelectItem value="nortedesantander">
                          Norte de Santander
                        </SelectItem>
                        <SelectItem value="putumayo">Putumayo</SelectItem>
                        <SelectItem value="quindio">Quindío</SelectItem>
                        <SelectItem value="risaralda">Risaralda</SelectItem>
                        <SelectItem value="sanandres">
                          San Andrés y Providencia
                        </SelectItem>
                        <SelectItem value="santander">Santander</SelectItem>
                        <SelectItem value="sucre">Sucre</SelectItem>
                        <SelectItem value="tolima">Tolima</SelectItem>
                        <SelectItem value="valledelcauca">
                          Valle del Cauca
                        </SelectItem>
                        <SelectItem value="vaupes">Vaupés</SelectItem>
                        <SelectItem value="vichada">Vichada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Código Postal</Label>
                    <Input
                      id="postalCode"
                      value={clientData.postalCode}
                      onChange={(e) =>
                        handleInputChange("postalCode", e.target.value)
                      }
                      placeholder="Código postal"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
                <CardDescription>
                  Persona de contacto para facturación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactName">Nombre del Contacto</Label>
                  <Input
                    id="contactName"
                    value={clientData.contactName}
                    onChange={(e) =>
                      handleInputChange("contactName", e.target.value)
                    }
                    placeholder="Nombre completo"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPhone">Teléfono del Contacto</Label>
                    <Input
                      id="contactPhone"
                      value={clientData.contactPhone}
                      onChange={(e) =>
                        handleInputChange("contactPhone", e.target.value)
                      }
                      placeholder="Teléfono de contacto"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email del Contacto</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={clientData.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      placeholder="Email de contacto"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuración Adicional */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración Adicional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={clientData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Información adicional sobre el cliente..."
                    rows={3}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendInvoicesByEmail"
                    checked={clientData.sendInvoicesByEmail}
                    onCheckedChange={(checked) =>
                      handleInputChange("sendInvoicesByEmail", checked)
                    }
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="sendInvoicesByEmail">
                    Enviar facturas automáticamente por email
                  </Label>
                </div>

                <div>
                  <Label htmlFor="status">Estado</Label>
                  <Select
                    value={clientData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="inactive">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Botones de Acción */}
            <div className="flex justify-end gap-4">
              <Link href="/clients">
                <Button variant="outline" disabled={isSubmitting}>
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cliente
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
