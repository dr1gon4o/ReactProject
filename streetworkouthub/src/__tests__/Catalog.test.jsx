import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Catalog from "../pages/Catalog";
import * as postService from "../services/postService";
import { Provider } from 'react-redux'
import  store  from "../store/store";

// test("Catalog shows empty state message", () => {
//   render(<Catalog />);
//   expect(screen.getByText("No posts yet!")).toBeInTheDocument();
// });


vi.mock("../services/postService");

test("shows empty state when no posts", async () => {
  postService.getAll.mockResolvedValue([]);
  render(
    <Provider store={store}>
      <Catalog />
    </Provider>
    );
  expect(await screen.findByText("No posts yet!")).toBeInTheDocument();
});
