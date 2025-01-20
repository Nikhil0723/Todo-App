'use client';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface MultiSelectProps {
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  className?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder,
  className
}) => {
  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((val) => val !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="block font-medium">{placeholder}</Label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              checked={value.includes(option.value)}
              onCheckedChange={() => handleChange(option.value)}
            />
            <span>{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
