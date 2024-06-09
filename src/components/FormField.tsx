import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  id: string;
  error?: string;
}

const FormField = ({ label, id, error, type, ...props }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>

      <div className="relative w-full">
        <input
          id={id}
          className={`border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? "border-red-500" : ""
          }`}
          type={type === "password" && showPassword ? "text" : type}
          aria-label="input"
          {...props}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {type === "password" && (
          <div
            data-testid="eye-icon"
            className="absolute right-3 top-3 flex items-center space-x-2 text-sm text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;
