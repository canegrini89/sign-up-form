import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen w-full relative bg-signup bg-no-repeat bg-cover bg-center bg-fixed bg-secondary">
      <div className="w-[600px] shadow-lg rounded-lg p-8 bg-white border border-gray-200">
        <div className="flex flex-col space-y-6">
          <p className="font-semibold text-center text-2xl text-primary">
            Congratulations! You have signed up successfully.
          </p>
          <p className="text-center text-lg">
            Please check your email to confirm your account.
          </p>

          <p className="text-center text-lg">
            If you want to sign up again, click in the button below.
          </p>

          <Button className="w-full" onClick={() => navigate("/")}>
            Back to sign up page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
