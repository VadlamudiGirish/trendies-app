import React, { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-6 rounded-xl shadow-lg flex flex-col space-y-4 w-full max-w-xl"
    >
      {label && <h3 className="text-lg font-semibold text-white">{label}</h3>}

      <div className="flex items-center justify-between space-x-4">
        <TextInput
          value={value}
          readOnly
          variant="filled"
          className="flex-1 bg-gray-800 text-white rounded-lg border border-blue-500"
          styles={{
            input: { cursor: "text", whiteSpace: "normal", padding: "1rem" },
            root: { width: "100%" },
          }}
        />

        <motion.div
          whileHover={{ scale: 1.1, boxShadow: "0 0 8px rgba(96,194,222,0.8)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Button
            size="sm"
            onClick={handleCopy}
            className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold shadow-md rounded-md transition"
          >
            {copied ? "Link Copied!" : "Copy Link"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
