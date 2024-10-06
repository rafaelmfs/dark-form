import { ComponentProps } from "react";

export function ErrorLabel({ className, ...props }: ComponentProps<"span">) {
  const classNames = String("text-red-600 text-xs ").concat(className ?? "");
  return <span className={classNames} {...props} />;
}
