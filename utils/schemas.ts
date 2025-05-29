import * as yup from "yup";

export const login = yup.object({
  username: yup
    .string()
    .email("Por favor, ingresa un correo electrónico válido")
    .required("Correo Electronico es requerido")
    .min(4)
    .max(100),
  password: yup.string().required("Contraseña es requerida").min(8).max(16),
});
