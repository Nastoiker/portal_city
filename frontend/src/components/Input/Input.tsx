import cn from "classnames";
import { forwardRef } from "react";
import styles from "./Input.module.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isValid = true, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(styles["input"], className, {
        [styles["invalid"]]: isValid,
      })}
      {...props}
    />
  );
});
