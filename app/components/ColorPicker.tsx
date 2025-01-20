import React from "react";
import { Label } from "@/components/ui/label";

interface ColorPickerProps {
  id: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ id, value, onChange }) => {
  return (
    <div>
      <Label htmlFor={id} className="block font-medium">Pick a color</Label>
      <input
        type="color"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2"
      />
    </div>
  );
};
