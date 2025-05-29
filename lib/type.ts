import { FieldValues, Control, Path, FieldError } from "react-hook-form";

export interface typeInputRender<
  TFieldValues extends FieldValues = FieldValues
> {
  title: string;
  htmlFor: string;
  disabled?: boolean;
  control: Control<TFieldValues>;
  id: Path<TFieldValues>;
  type?: string;
  icon?: React.ReactNode;
  error?: FieldError | string;
  placeholder: string;
}

export interface formData {
  username: string;
  password: string;
}
