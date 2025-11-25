import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import Login from "../pages/Login";
import { AuthContext } from "../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import '@testing-library/jest-dom';


test("shows error if fields are empty", async () => {
  const mockLogin = vi.fn();

  render(
    <AuthContext.Provider value={{ login: mockLogin, isAuthenticated: false }}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthContext.Provider>
  );

  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
  });

  expect(screen.getByText(/fields cannot be empty/i)).toBeInTheDocument();
});
