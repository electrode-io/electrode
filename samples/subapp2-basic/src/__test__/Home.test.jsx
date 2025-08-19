import { React } from "@xarc/react";
import { render, screen } from "@testing-library/react";
import Home from "../components/Home";

it("Home component renders", async () => {
  render(<Home />);
  const element = await screen.findByTestId("home");
  expect(element).toBeInTheDocument();
});
