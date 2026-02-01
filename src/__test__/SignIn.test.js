import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../Views/SignIn";

describe("SignIn", () => {
  it("calls onSubmit with correct arguments when a valid form is submitted", async () => {
    const onSubmit = jest.fn();
    render(<SignInContainer onSubmit={onSubmit} />);

    // Fill the form
    fireEvent.changeText(screen.getByPlaceholderText("Username"), "kalle");
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");

    // Submit the form
    fireEvent.press(screen.getByText("Sign In"));

    // Verify the onSubmit function was called with the correct values
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledWith(
        {
          username: "kalle",
          password: "password",
        },
        expect.anything(),
      );
    });
  });
});
