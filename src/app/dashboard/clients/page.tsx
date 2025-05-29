"use client";

import { useState } from "react";

import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { LuArrowLeft } from "react-icons/lu";
import { FaBuilding, FaEye, FaPhone, FaUserTie } from "react-icons/fa6";
import { BsSearch } from "react-icons/bs";
import { MdEdit, MdEmail } from "react-icons/md";

interface Client {
  id: string;
  name: string;
  nit: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: "active" | "inactive";
  totalInvoices: number;
  totalAmount: number;
}

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const clients: Client[] = [
    {
      id: "1",
      name: "Empresa ABC S.A.S",
      nit: "900123456-1",
      email: "contabilidad@empresaabc.com",
      phone: "+57 1 234 5678",
      address: "Carrera 45 #67-89",
      city: "Bogotá D.C.",
      status: "active",
      totalInvoices: 15,
      totalAmount: 25000000,
    },
    {
      id: "2",
      name: "Comercial XYZ Ltda",
      nit: "800987654-2",
      email: "facturacion@comercialxyz.com",
      phone: "+57 4 987 6543",
      address: "Calle 123 #45-67",
      city: "Medellín",
      status: "active",
      totalInvoices: 8,
      totalAmount: 12000000,
    },
    {
      id: "3",
      name: "Servicios DEF S.A.S",
      nit: "700456789-3",
      email: "admin@serviciosdef.com",
      phone: "+57 2 456 7890",
      address: "Avenida 78 #90-12",
      city: "Cali",
      status: "active",
      totalInvoices: 22,
      totalAmount: 35000000,
    },
    {
      id: "4",
      name: "Industrias GHI S.A",
      nit: "600321654-4",
      email: "compras@industriasghi.com",
      phone: "+57 5 321 6547",
      address: "Zona Industrial #34-56",
      city: "Barranquilla",
      status: "inactive",
      totalInvoices: 3,
      totalAmount: 4500000,
    },
  ];

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.nit.includes(searchTerm) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="mr-4">
                <Button variant="ghost" size="sm">
                  <LuArrowLeft className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
            </div>
            <Link href="/clients/create">
              <Button>
                <FaUserTie className="h-4 w-4 mr-2" />
                Nuevo Cliente
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Búsqueda */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Buscar Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nombre, NIT o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lista de Clientes */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Clientes</CardTitle>
            <CardDescription>
              {filteredClients.length} clientes encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClients.map((client) => (
                <Card
                  key={client.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FaBuilding className="h-5 w-5 text-blue-600" />
                        <Badge
                          variant={
                            client.status === "active" ? "default" : "secondary"
                          }
                        >
                          {client.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <CardDescription>NIT: {client.nit}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MdEmail className="h-4 w-4" />
                        <span className="truncate">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaPhone className="h-4 w-4" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>{client.address}</p>
                        <p>{client.city}</p>
                      </div>
                    </div>

                    <div className="border-t pt-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Facturas</p>
                          <p className="font-semibold">
                            {client.totalInvoices}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total Facturado</p>
                          <p className="font-semibold">
                            ${client.totalAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/clients/${client.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <FaEye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                      </Link>
                      <Link
                        href={`/clients/${client.id}/edit`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <MdEdit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
