import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import FormField from "./FormField";

import { validateEmail, validatePassword } from "../utils";

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUpForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: ValidationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email address";
    }

    if (!validatePassword(password)) {
      validationErrors.password =
        "Password must have at least one capital letter, one numeric character, and one special character";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length === 0) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      navigate("/confirmation");
      return;
    }

    setErrors(validationErrors);
  };

  return (
    <div className="h-[550px] w-[500px] shadow-lg rounded-lg p-8 bg-white border border-gray-200">
      <form
        className="flex flex-col justify-between grow h-full"
        onSubmit={handleSubmit}
        aria-label="signup-form"
      >
        <h1 className="text-2xl font-bold text-center text-primary mb-8">
          Sign Up
        </h1>

        <div className="h-full flex flex-col space-y-8">
          <FormField
            label="User Name"
            type="text"
            id="userName"
            name="userName"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="Enter your email address"
          />
          <FormField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="Enter your password"
          />
          <FormField
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />
        </div>

        <Button
          type="submit"
          disabled={!email || !password || !confirmPassword}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
