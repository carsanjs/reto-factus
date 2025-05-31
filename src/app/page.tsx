"use client";
// import Image from "next/image";
import { FiFileText } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { InputRender } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "../../utils/schemas";
import { formData } from "../../utils/type";
import { AuthController } from "@/lib/controller/auth.controller";
import { toast } from "sonner";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      username: "",
    },
    resolver: yupResolver(login),
  });

  const handleSign = async (data: formData) => {
    const { username, password } = data;
    try {
      toast("Cargando...");
      setIsLoading(true);
      await AuthController.authenticateWithPassword(username, password);
      toast.success("Ingresado exitosamente!");
      router.replace("/dashboard");
      reset();
    } catch (error) {
      reset();
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <FiFileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">FactusApp</h1>
          <p className="text-gray-600 mt-2">
            Sistema de Facturación Electrónica
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleSign)} className="space-y-4">
              <InputRender
                error={errors.username}
                htmlFor="email"
                id="username"
                title="Email"
                icon={<MdEmail />}
                control={control}
                type="email"
                placeholder="example123@example.com"
              />

              <InputRender
                error={errors.password}
                htmlFor="password"
                id="password"
                title="Contraseña"
                icon={<IoMdLock />}
                control={control}
                type="password"
                placeholder="Tu contraseña"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    // checked={loginData.rememberMe}
                    // onCheckedChange={(checked) =>
                    //   setLoginData({
                    //     ...loginData,
                    //     rememberMe: checked as boolean,
                    //   })
                    // }
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Recordarme
                  </Label>
                </div>
              </div>
              {/* [#f63355] */}
              <Button
                type="submit"
                className={`w-full font-bold ${
                  errors.password || errors.username
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-900 text-white"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center bg-white rounded-lg p-4 shadow-sm">
          <div className="">
            <h3 className="font-semibold text-gray-900 mb-2">
              Facturación Electrónica DIAN
            </h3>
            <p className="text-sm text-gray-600">
              Sistema integrado con la API de Factus para emisión de facturas
              electrónicas según normativa colombiana
            </p>
          </div>

          <div className="text-left mt-4 bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              Credenciales de Demo:
            </h4>
            <p className="text-sm text-blue-800">Email: admin@factusapp.com</p>
            <p className="text-sm text-blue-800">Contraseña: demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
