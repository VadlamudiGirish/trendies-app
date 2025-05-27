import React from "react";
import type { ButtonProps as MantineButtonProps } from "@mantine/core";
import { Button as MantineButton } from "@mantine/core";

export const Button = React.forwardRef<HTMLButtonElement, MantineButtonProps>(
  (props, ref) => {
    return <MantineButton ref={ref} radius="md" size="md" {...props} />;
  }
);

Button.displayName = "Button";
