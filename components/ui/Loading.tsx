import { BiLoader } from "react-icons/bi";
export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <BiLoader className="mx-auto h-16 w-16 animate-spin text-blue-500" />
    </div>
  );
}
