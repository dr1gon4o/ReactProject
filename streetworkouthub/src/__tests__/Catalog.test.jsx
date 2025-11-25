import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'; // <-- add this
import Catalog from "../pages/Catalog";
import * as postService from "../services/postService";

// test("Catalog shows empty state message", () => {
//   render(<Catalog />);
//   expect(screen.getByText("No posts yet!")).toBeInTheDocument();
// });


vi.mock("../services/postService");

test("shows empty state when no posts", async () => {
  postService.getAll.mockResolvedValue([]);
  render(<Catalog />);
  expect(await screen.findByText("No posts yet!")).toBeInTheDocument();
});
