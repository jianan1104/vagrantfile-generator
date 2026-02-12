import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../src/lib/utils";
import { Check } from "lucide-react";

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
      <motion.label
        htmlFor={item.id}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 p-4 transition-colors duration-200",
          isSelected
            ? "border-primary bg-accent shadow-sm glow-sm"
            : "border-border/50 hover:border-border hover:bg-accent/50"
        )}
      >
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary shadow-sm"
          >
            <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />
          </motion.div>
        )}
        {item.src && (
          <img
            src={item.src}
            className="h-12 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100"
            alt={item.name}
          />
        )}
        <span className={cn(
          "text-xs font-semibold text-center leading-tight",
          isSelected ? "text-accent-foreground" : "text-muted-foreground"
        )}>
          {item.name}
        </span>
      </motion.label>
    </li>
  );
};

export default RadioCard;
