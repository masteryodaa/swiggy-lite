import {
  act,
  fireEvent,
  getByTestId,
  render,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import store from "../../utils/store";
import { menuData } from "../../mocks/restaurantData";
import RestaurantMenu from "../RestaurantMenu";
import Navbar from "../Navbar";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(menuData),
  })
);

test("Add items to Cart", async () => {
  const menu = render(
    <StaticRouter>
      <Provider store={store}>
        <Navbar />
        <RestaurantMenu />
      </Provider>
    </StaticRouter>
  );

  await waitFor(() => {
    expect(menu.getByTestId("menu"));
  });
});
