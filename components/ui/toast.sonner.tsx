// import { toast as sonnerToast } from "sonner";

// const baseClass =
//   "px-4 py-3 rounded-md border text-sm shadow-md transition-all";

// const typeClassMap: Record<string, string> = {
//   success:
//     "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700",
//   error:
//     "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
//   warning:
//     "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700",
//   info: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
//   default:
//     "bg-white text-gray-900 border-gray-300 dark:bg-gray-900 dark:text-white dark:border-gray-700",
//   action:
//     "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-100 dark:border-purple-700",
// };

// export const toast = {
//   success: (msg: string, options = {}) =>
//     sonnerToast.success(msg, {
//       className: `${baseClass} ${typeClassMap.success}`,
//       ...options,
//     }),
//   error: (msg: string, options = {}) =>
//     sonnerToast.error(msg, {
//       className: `${baseClass} ${typeClassMap.error}`,
//       ...options,
//     }),
//   warning: (msg: string, options = {}) =>
//     sonnerToast.warning(msg, {
//       className: `${baseClass} ${typeClassMap.warning}`,
//       ...options,
//     }),
//   info: (msg: string, options = {}) =>
//     sonnerToast.info(msg, {
//       className: `${baseClass} ${typeClassMap.info}`,
//       ...options,
//     }),
//   default: (msg: string, options = {}) =>
//     sonnerToast(msg, {
//       className: `${baseClass} ${typeClassMap.default}`,
//       ...options,
//     }),
//   action: (msg: string, options = {}) =>
//     sonnerToast(msg, {
//       className: `${baseClass} ${typeClassMap.action}`,
//       ...options,
//     }),
//   promise: <T,>(
//     promise: Promise<T>,
//     opts: {
//       loading: string;
//       success: string | ((data: T) => string);
//       error: string;
//     }
//   ) =>
//     sonnerToast.promise(promise, {
//       ...opts,
//       className: `${baseClass} ${typeClassMap.info}`,
//     }),
// };
