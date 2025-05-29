import Link from "next/link";
import { FiFileText } from "react-icons/fi";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { BsEye, BsFileText } from "react-icons/bs";
import { FaUserPlus, FaUserSecret } from "react-icons/fa6";
import { CgTrending } from "react-icons/cg";
import { LuPackage } from "react-icons/lu";
import { IoIosAddCircle } from "react-icons/io";

export default function Dashboard() {
  const stats = [
    {
      title: "Facturas Emitidas",
      value: "156",
      description: "Este mes",
      icon: BsFileText,
      color: "text-blue-600",
    },
    {
      title: "Clientes Activos",
      value: "89",
      description: "Total registrados",
      icon: FaUserSecret,
      color: "text-green-600",
    },
    {
      title: "Productos",
      value: "234",
      description: "En catálogo",
      icon: CgTrending,
      color: "text-purple-600",
    },
    {
      title: "Ingresos",
      value: "$45,230,000",
      description: "Este mes",
      icon: CgTrending,
      color: "text-orange-600",
    },
  ];

  const recentInvoices = [
    {
      id: "FE-001",
      client: "Empresa ABC S.A.S",
      amount: "$2,500,000",
      status: "Aprobada",
      date: "2024-01-15",
    },
    {
      id: "FE-002",
      client: "Comercial XYZ Ltda",
      amount: "$1,800,000",
      status: "Pendiente",
      date: "2024-01-14",
    },
    {
      id: "FE-003",
      client: "Servicios DEF S.A.S",
      amount: "$3,200,000",
      status: "Aprobada",
      date: "2024-01-13",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FiFileText className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">FactusApp</h1>
            </div>
            <nav className="flex space-x-4 font-semibold">
              <Link
                href="/dashboard/invoices"
                className="text-gray-600 hover:text-gray-900"
              >
                Facturas
              </Link>
              <Link
                href="/dashboard/clients"
                className="text-gray-600 hover:text-gray-900"
              >
                Clientes
              </Link>
              <Link
                href="/dashboard/products"
                className="text-gray-600 hover:text-gray-900"
              >
                Productos
              </Link>
              <Link
                href="/dashboard/settings"
                className="text-gray-600 hover:text-gray-900"
              >
                Configuración
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Acciones Rápidas
            </h2>
          </div>
          <div className="flex gap-4">
            <Link href="/invoices/create">
              <Button className="flex items-center gap-2 text-white bg-gray-900 hover:bg-gray-700 border-gray-700">
                <IoIosAddCircle className="h-4 w-4" />
                Nueva Factura
              </Button>
            </Link>
            <Link href="/clients/create">
              <Button
                variant="outline"
                className="flex items-center gap-2 font-semibold"
              >
                <FaUserPlus className="h-4 w-4" />
                Nuevo Cliente
              </Button>
            </Link>
            <Link href="/products/create">
              <Button
                variant="outline"
                className="flex items-center gap-2 font-semibold"
              >
                <LuPackage className="h-4 w-4" />
                Nuevo Producto
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Facturas Recientes</CardTitle>
                <CardDescription>
                  Últimas facturas emitidas en el sistema
                </CardDescription>
              </div>
              <Link href="/invoices">
                <Button variant="outline" size="sm" className="font-semibold">
                  Ver todas
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <BsFileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{invoice.id}</p>
                      <p className="text-sm text-gray-500">{invoice.client}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{invoice.amount}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          invoice.status === "Aprobada"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {invoice.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {invoice.date}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <BsEye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
