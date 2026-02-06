import React from "react";
import { Input } from "../../src/components/ui/input";
import { Label } from "../../src/components/ui/label";

const TextInput = ({ name, value, holder, type, handleInputChange, formData, children }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={value} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {name}
      </Label>
      <Input
        type={type || "text"}
        name={value}
        id={value}
        value={formData}
        onChange={handleInputChange}
        placeholder={holder}
      />
      {children}
    </div>
  );
};

export default TextInput;
