import { React } from "@xarc/react";
import { cleanup, render } from "@testing-library/react";
import Home from "../components/Home";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("Home component renders", async () => {
  const { getByTestId } = render(<Home />);
  expect(getByTestId("home")).toBeInTheDocument();
});
