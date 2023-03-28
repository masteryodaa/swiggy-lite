import { act, fireEvent, getByTestId, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import store from "../../utils/store";
import Body from "../Body";
import { restaurantData } from "../../mocks/restaurantData";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(restaurantData),
  })
);

test("Shimmer results on homepage", async () => {
  const body = render(
    <StaticRouter>
      <Provider store={store}>
        <Body />
      </Provider>
    </StaticRouter>
  );

//   const shimmer = body.getByTestId("shimmer");
//   console.log(shimmer.children.length);

//   expect(shimmer.children.length).toBe(10); 

    await waitFor(() => {
        expect(body.getByTestId("search-btn"));
    });

    const input = body.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "pizza" } });

    const btn = body.getByTestId("search-btn");

    fireEvent.click(btn);

    const reslist = body.getByTestId("res-list");

    expect(reslist.children.length).toBe(2); 


});
 