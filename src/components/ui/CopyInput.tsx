import React, { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";

interface CopyInputProps {
  value: string;
  label?: string;
}

export function CopyInput({ value, label }: CopyInputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Group gap="xs" wrap="nowrap">
      {label && <div className="font-medium">{label}</div>}
      <TextInput
        value={value}
        readOnly
        className="flex-grow"
        styles={{ input: { cursor: "pointer" } }}
        onClick={handleCopy}
      />
      <Button size="sm" onClick={handleCopy}>
        {copied ? "Copied" : "Copy"}
      </Button>
    </Group>
  );
}
