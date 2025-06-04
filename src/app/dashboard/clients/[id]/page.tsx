"use client";

import {
  ArrowLeft,
  Edit,
  FileText,
  Mail,
  Phone,
  MapPin,
  Building,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";

export default function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Datos mock del cliente
  const client = {
    id: params.id,
    name: "Empresa ABC S.A.S",
    nit: "900123456-1",
    email: "contabilidad@empresaabc.com",
    phone: "+57 1 234 5678",
    address: "Carrera 45 #67-89",
    city: "Bogotá D.C.",
    state: "Bogotá D.C.",
    postalCode: "110111",
    contactName: "María González",
    contactPhone: "+57 1 234 5679",
    contactEmail: "maria.gonzalez@empresaabc.com",
    status: "active",
    taxResponsible: true,
    sendInvoicesByEmail: true,
    notes:
      "Cliente preferencial con descuentos especiales en servicios de desarrollo.",
    createdAt: "2023-06-15",
    totalInvoices: 15,
    totalAmount: 25000000,
    lastInvoice: "2024-01-15",
  };

  const recentInvoices = [
    {
      id: "FE-001",
      date: "2024-01-15",
      amount: 2500000,
      status: "approved",
    },
    {
      id: "FE-002",
      date: "2024-01-10",
      amount: 1800000,
      status: "paid",
    },
    {
      id: "FE-003",
      date: "2024-01-05",
      amount: 3200000,
      status: "approved",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Activo
          </Badge>
        );
      case "inactive":
        return <Badge variant="secondary">Inactivo</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Aprobada
          </Badge>
        );
      case "paid":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Pagada
          </Badge>
        );
      case "sent":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Enviada
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/clients" className="mr-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver a Clientes
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {client.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Building className="h-4 w-4 text-gray-500" />
                  {getStatusBadge(client.status)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href={`/clients/${client.id}/edit`}>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              </Link>
              <Link href={`/invoices/create?client=${client.id}`}>
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  Nueva Factura
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Razón Social</p>
                      <p className="font-semibold">{client.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">NIT</p>
                      <p className="font-semibold">{client.nit}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{client.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-semibold">{client.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Responsable de IVA
                      </p>
                      <p className="font-semibold">
                        {client.taxResponsible ? "Sí" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Envío automático de facturas
                      </p>
                      <p className="font-semibold">
                        {client.sendInvoicesByEmail
                          ? "Activado"
                          : "Desactivado"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Cliente desde</p>
                      <p className="font-semibold">{client.createdAt}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dirección */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Dirección
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold">{client.address}</p>
                  <p className="text-gray-600">
                    {client.city}, {client.state}
                  </p>
                  <p className="text-gray-600">
                    Código Postal: {client.postalCode}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Persona de Contacto</p>
                    <p className="font-semibold">{client.contactName}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Teléfono</p>
                        <p className="font-semibold">{client.contactPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold">{client.contactEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notas */}
            {client.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{client.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Estadísticas */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {client.totalInvoices}
                  </p>
                  <p className="text-sm text-gray-500">Facturas Emitidas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    ${client.totalAmount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Total Facturado</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Última Factura</p>
                  <p className="font-semibold">{client.lastInvoice}</p>
                </div>
              </CardContent>
            </Card>

            {/* Facturas Recientes */}
            <Card>
              <CardHeader>
                <CardTitle>Facturas Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{invoice.id}</p>
                        <p className="text-sm text-gray-500">{invoice.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${invoice.amount.toLocaleString()}
                        </p>
                        {getInvoiceStatusBadge(invoice.status)}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/invoices?client=${client.id}`}
                  className="block mt-4"
                >
                  <Button variant="outline" className="w-full">
                    Ver Todas las Facturas
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Acciones Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/invoices/create?client=${client.id}`}>
                  <Button className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Nueva Factura
                  </Button>
                </Link>
                <Link href={`/clients/${client.id}/edit`}>
                  <Button variant="outline" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Cliente
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
