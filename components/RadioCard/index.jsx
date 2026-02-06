import React from "react";
import { cn } from "../../src/lib/utils";

const RadioCard = ({ item, value, handleInputChange, formData }) => {
  const isSelected = formData === item.value;

  return (
    <li>
      <input
        type="radio"
        id={item.id}
        name={value}
        value={item.value}
        className="hidden"
        onChange={handleInputChange}
        checked={isSelected}
      />
      <label
        htmlFor={item.id}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 p-4 transition-all hover:bg-accent",
          isSelected
            ? "border-primary bg-accent shadow-sm"
            : "border-border hover:border-muted-foreground/25"
        )}
      >
        <span className="text-sm font-semibold">{item.name}</span>
        {item.src && (
          <img
            src={item.src}
            className="h-16 w-auto object-contain"
            alt={item.name}
          />
        )}
      </label>
    </li>
  );
};

export default RadioCard;
