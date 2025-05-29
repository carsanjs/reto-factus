import { BiLoader } from "react-icons/bi";
export function LoadingPage({ title = "Cargando ..." }) {
  return (
    <div className="flex h-full items-center justify-center">
      <BiLoader className="h-8 w-8 animate-spin text-blue-500" />
      <span className="ml-2 text-lg">{title}</span>
    </div>
  );
}
