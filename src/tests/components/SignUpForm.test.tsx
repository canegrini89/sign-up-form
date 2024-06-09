import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render } from "@testing-library/react";

import SignUpForm from "../../components/SignUpForm";

describe("SignUpForm", () => {
  const renderSignUpForm = (props = {}) => {
    const utils = render(<SignUpForm {...props} />, { wrapper: BrowserRouter });
    const form = utils.getByRole("form", { name: /signup/i });
    const header = utils.getByRole("heading", { name: /sign up/i });
    const userName = utils.getByLabelText(/user name/i);
    const password = utils.getByLabelText("Password");
    const confirmPassword = utils.getByLabelText("Confirm Password");
    const button = utils.getByRole("button");

    return {
      ...utils,
      form,
      header,
      userName,
      password,
      confirmPassword,
      button,
    };
  };

  it("renders a form with a header, user name, password, and confirm password fields and a Sign Up button", () => {
    const { header, userName, password, confirmPassword, button } =
      renderSignUpForm();

    expect(header).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("disables the button when any input is empty", () => {
    const { button, userName, password } = renderSignUpForm();

    fireEvent.change(userName, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "password" } });

    expect(button).toBeDisabled();
  });

  it("disables the button when all inputs are empty", () => {
    const { button } = renderSignUpForm();

    expect(button).toBeDisabled();
  });

  it("enables the button when all inputs are filled", () => {
    const { button, userName, password, confirmPassword } = renderSignUpForm();

    fireEvent.change(userName, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "password" } });

    expect(button).not.toBeDisabled();
  });

  it("displays error messages when inputs has invalid data and Sign Up button is clicked", () => {
    const { confirmPassword, userName, password, button, getByText } =
      renderSignUpForm();

    fireEvent.change(userName, { target: { value: "test.com" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "password1" } });

    fireEvent.click(button);

    const emailErrorMessage = getByText(/invalid email address/i);
    const passwordErrorMessage = getByText(
      /Password must have at least one capital letter, one numeric character, and one special character/i
    );
    const confirmPasswordErrorMessage = getByText(/passwords do not match/i);

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
    expect(confirmPasswordErrorMessage).toBeInTheDocument();
  });

  it("calls the onSubmit function when the form is submitted", () => {
    const handleSubmit = jest.fn();

    const { form, button, userName, password, confirmPassword } =
      renderSignUpForm({
        onSubmit: handleSubmit,
      });

    form.onsubmit = handleSubmit;

    fireEvent.change(userName, { target: { value: "test@test.com" } });
    fireEvent.change(password, { target: { value: "password" } });
    fireEvent.change(confirmPassword, { target: { value: "password" } });

    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
