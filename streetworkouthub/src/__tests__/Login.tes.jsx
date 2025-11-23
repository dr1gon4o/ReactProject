import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // <-- wrap your component
import Login from "../pages/Login";

test("Login shows error if fields are empty", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const loginButton = screen.getByRole("button", { name: /login/i });
  fireEvent.click(loginButton);

  expect(screen.getByText(/all fields are required/i)).toBeInTheDocument();
});
