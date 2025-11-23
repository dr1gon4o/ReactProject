import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // <-- add this
import Catalog from "../pages/Catalog";

test("Catalog shows empty state message", () => {
  render(<Catalog />);
  expect(screen.getByText("No posts yet!")).toBeInTheDocument();
});
