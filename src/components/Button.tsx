interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const Button = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-primary min-w-max rounded-md text-white font-bold text-center p-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
