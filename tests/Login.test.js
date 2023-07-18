import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Login from "../screens/Login";
import { auth } from "../firebase";

jest.mock("../firebase", () => ({
  auth: {
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    onAuthStateChanged: jest.fn(),
  },
}));

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe("Login component", () => {
  it("should handle email and password inputs correctly", () => {
    const { getByPlaceholderText } = render(<Login />);

    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "testpassword");

    expect(emailInput.props.value).toBe("test@example.com");
    expect(passwordInput.props.value).toBe("testpassword");
  });

  it("should call auth.signInWithEmailAndPassword when Login button is pressed", () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    const loginButton = getByText("Login ⭐");
    const emailInput = getByPlaceholderText("Email");
    const passwordInput = getByPlaceholderText("Password");

    fireEvent.changeText(emailInput, "test@example.com");
    fireEvent.changeText(passwordInput, "testpassword");

    fireEvent.press(loginButton);

    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      "test@example.com",
      "testpassword"
    );
  });
});
