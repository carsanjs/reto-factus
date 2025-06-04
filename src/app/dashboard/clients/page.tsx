"use client";

import { useState } from "react";
import { MdOutlinePermIdentity } from "react-icons/md";
import { FaIdBadge } from "react-icons/fa";
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
import { useAllNoteCredit } from "@/lib/hooks/customHook";
import { Loading } from "../../../../components/ui/Loading";
import { BiCodeAlt } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { MdError } from "react-icons/md";
export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { noteCreditAll, isLoading } = useAllNoteCredit();
  console.log(" notecreditaAll ", noteCreditAll);

  if (isLoading) return <Loading />;

  const filteredClients = noteCreditAll.filter(
    (client) =>
      client.api_client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email ?? "").toLowerCase().includes(searchTerm.toLowerCase())
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
                  <CardHeader className="pb-3 space-y-1">
                    <div className="flex justify-between items-center">
                      <Badge
                        variant={client.status === 1 ? "default" : "secondary"}
                      >
                        {client.status === 1 ? "Activo" : "Inactivo"}
                      </Badge>
                      <span className="flex flex-row items-center text-xs text-muted-foreground">
                        <BiCodeAlt /> {client.reference_code ?? "Sin codigo"}
                      </span>
                    </div>
                    <CardTitle className="text-xl">
                      {client.api_client_name}
                    </CardTitle>
                    <CardDescription>
                      {client.company || "Sin compañía"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4 text-sm text-gray-700">
                    <div className="space-y-1">
                      <p className="flex flex-row items-center">
                        <FaIdBadge /> <strong>Identificación:</strong>{" "}
                        {client.identification}
                      </p>
                      <p className="flex flex-row items-center">
                        <MdOutlinePermIdentity /> <strong>Nombre:</strong>{" "}
                        {client.names}
                      </p>
                      <p className="flex flex-row items-center">
                        <MdEmail /> <strong>Email:</strong>{" "}
                        {client.email || "Sin correo"}
                      </p>
                    </div>

                    <div className="border-t pt-2 space-y-1">
                      <p className="flex flex-row items-center">
                        <strong>Total:</strong>
                        <MdAttachMoney />{" "}
                        {Number(client.total).toLocaleString()}
                      </p>
                      <p>
                        <strong>Fecha de creación:</strong>{" "}
                        {client.created_at
                          ? new Date(client.created_at).toLocaleDateString()
                          : "Sin fecha"}
                      </p>
                    </div>

                    {client.errors?.length > 0 && (
                      <div className="border-t pt-2">
                        <div className="flex flex-row items-center">
                          <MdError color="red" />
                          <strong className="pl-1 text-red-600">
                            Errores:
                          </strong>
                        </div>
                        <ul className="list-disc list-inside text-red-500">
                          {client.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Link href={`/clients/${client.id}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <FaEye className="mr-2 h-4 w-4" />
                          Ver
                        </Button>
                      </Link>
                      <Link
                        href={`/clients/${client.id}/edit`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <MdEdit className="mr-2 h-4 w-4" />
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
