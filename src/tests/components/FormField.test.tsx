import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import FormField from "../../components/FormField";

describe("FormField", () => {
  it("renders a label and an input field with its placeholder", () => {
    render(
      <FormField
        label="User Name"
        type="email"
        id="userName"
        name="userName"
        placeholder="email"
      />
    );

    const input = screen.getByLabelText("input");
    const label = screen.getByText(/user name/i);
    const placeholder = screen.getByPlaceholderText(/email/i);

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });

  it("renders an error message if there's an error", () => {
    render(
      <FormField
        label="User Name"
        type="email"
        id="userName"
        name="userName"
        placeholder="email"
        error="Invalid email address"
      />
    );

    const error = screen.queryByText(/invalid email address/i);

    expect(error).toBeInTheDocument();
  });

  it("calls the onChange function when the input value changes", () => {
    const handleChange = jest.fn();

    render(
      <FormField
        label="User Name"
        type="email"
        id="userName"
        name="userName"
        placeholder="email"
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText("input");

    fireEvent.change(input, { target: { value: "test@test.com" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("test@test.com");
  });

  it("toggles the password visibility when the eye icon is clicked", () => {
    render(
      <FormField
        label="Password"
        type="password"
        id="password"
        name="password"
        placeholder="password"
      />
    );

    const input = screen.getByLabelText("input");
    const eyeIcon = screen.getByTestId("eye-icon");

    expect(eyeIcon).toBeInTheDocument();

    fireEvent.click(eyeIcon);

    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(eyeIcon);

    expect(input).toHaveAttribute("type", "password");
  });
});
