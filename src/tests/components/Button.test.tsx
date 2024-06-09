import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

import Button from "../../components/Button";

describe("Button", () => {
  const renderButton = (props = {}) => {
    const utils = render(<Button {...props}>Sign Up</Button>);
    const button = utils.getByRole("button");
    return { ...utils, button };
  };

  it("renders a button with the text passed in as children prop", () => {
    const { button } = renderButton();

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/sign up/i);
  });

  it("disables the button when the disabled prop is true", () => {
    const { button } = renderButton({ disabled: true });

    expect(button).toBeDisabled();
  });

  it("calls the onClick function when the button is clicked", () => {
    const handleClick = jest.fn();

    const { button } = renderButton({ onClick: handleClick });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call the onClick function when the button is disabled", () => {
    const handleClick = jest.fn();

    const { button } = renderButton({ onClick: handleClick, disabled: true });

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
