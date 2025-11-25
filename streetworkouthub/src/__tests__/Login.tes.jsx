import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // <-- wrap your component
import Login from "../pages/Login";
import userEvent from "@testing-library/user-event";

vi.mock("../contexts/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn((email, password) => {
      if (!email || !password) {
        return Promise.reject(new Error("Fields cannot be empty"));
      }
      return Promise.resolve();
    }),
  }),
}));

test("shows error if fields are empty", async () => {
  render(<Login />);
  await userEvent.click(screen.getByRole("button", { name: /login/i }));
  expect(await screen.findByText("Fields cannot be empty")).toBeInTheDocument();
});

