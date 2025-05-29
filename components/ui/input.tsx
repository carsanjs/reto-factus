import { forwardRef } from "react";
import { cn } from "../../utils/utils";
import { FieldValues, Controller } from "react-hook-form";
import { typeInputRender } from "../../utils/type";
import { Label } from "./label";
const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        required
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-400 bg-white px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const InputRender = <TFieldValues extends FieldValues = FieldValues>({
  title,
  htmlFor,
  control,
  type = "text",
  placeholder,
  id,
  disabled = false,
  icon,
  error,
}: typeInputRender<TFieldValues>) => {
  return (
    <div className="space-y-1">
      <Label className="font-sans" htmlFor={htmlFor}>
        {title}
      </Label>
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4">
        {icon}
      </div>

      <div className="relative">
        <Controller
          control={control}
          name={id}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input
              id={id}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              disabled={disabled}
              ref={ref}
              //    className={mt-1 block w-full rounded-md border ${
              //   error ? "border-red-300" : "border-gray-300"
              // } px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500}

              // className={cn(
              //   error && "border-red-500 ring-red-500 focus:ring-red-500"
              // )}
            />
          )}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {" "}
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </div>
  );
};
export { Input };
