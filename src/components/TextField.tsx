import { ComponentProps, forwardRef } from "react";

type TextFieldRootProps = ComponentProps<"div"> & {
  error?: boolean;
};
type TextFieldInputProps = Omit<ComponentProps<"input">, "className">;
type TextFieldRef = HTMLInputElement | null;

export function TextFieldRoot({
  error,
  ...props
}: Omit<TextFieldRootProps, "className">) {
  const classNames = `w-full px-2 py-3 text-xs text-gray-200 placeholder:text-gray-400 focus-within:border-gray-400 flex gap-2 bg-slate-800 border  rounded-md ${
    error ? "border-red-500" : "border-gray-800"
  }`;
  return <div {...props} className={classNames} />;
}

export const TextFieldInput = forwardRef<TextFieldRef, TextFieldInputProps>(
  (props, ref) => (
    <input
      {...props}
      className="outline-none autofill:bg-slate-800 bg-transparent text-inherit w-full"
      ref={ref}
    />
  )
);
