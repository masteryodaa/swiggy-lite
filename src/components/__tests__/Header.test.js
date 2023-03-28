import { render } from "@testing-library/react";
import Navbar from "../Navbar";
import { Provider } from "react-redux";
import store from "../../utils/store";
import { StaticRouter } from "react-router-dom/server";

test("logo should load on page", () => {
  // load Navbar component
  const navbar = render(
    <StaticRouter>
      <Provider store={store}>
        <Navbar />
      </Provider>
    </StaticRouter>
  );
  console.log(navbar);

  // check if logo is loaded
  const logo = navbar.getByTestId("logo");
  expect(logo.src).toBe("http://localhost/dummyLogo");
});

test("cart should have 0 items", () => {
    // load Navbar component
    const navbar = render(
        <StaticRouter>
        <Provider store={store}>
            <Navbar />
        </Provider>
        </StaticRouter>
    );
    console.log(navbar);
    
    // check if cart has 0 items
    const cart = navbar.getByTestId("cart");
    expect(cart.innerHTML).toBe("0");
    }
);
