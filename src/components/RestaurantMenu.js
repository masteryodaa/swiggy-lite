import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import useRestaurant from "../utils/useRestaurantMenu";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import store from "../utils/store";

const RestaurantMenu = () => {
  const { id } = useParams();

  const res = useRestaurant(id);
  const info = res.info;
  const menu = res.menu;

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item)); // {payload: 'coconut'}
  };

  return !info || !menu ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <div className="info-top">
        <div className="res-info">
          <h1>{info.name}</h1>
          <p>{info.cuisines.join(" ")}</p>
          <span>
            {info.areaName}, {info.feeDetails.fees[0].fee}m
          </span>
        </div>
        <div className="right-rating">
          <div className="star">
            <i className="bi bi-star-fill"></i>
          </div>
          <div className="avgRating">{info.avgRating}</div>
        </div>
      </div>
      <div className="menu-category">
        <ul data-testid="menu">
          {Object.values(menu).map((item, id) => (
            // {menu.map((item, id) => (
            //   <li key={key}>{item.card.card.title}</li>
            <div className="cats" key={id}>
              <div className="catleft">
                <Collapsible trigger={item.card.card.title}>
                  <div className="items-list-card">
                    {Object.values(item.card.card.itemCards).map(
                      (item, _key) => (
                        <li className="items-info" key={_key}>
                          <div className="item-price">
                            <p>{item.card.info.name}</p>
                            {/* <span>₹{item.card.info.price}</span> */}
                            {/* insert dot before the last second character of price */}
                            <span>₹{item.card.info.price / 100}</span>
                          </div>
                          <div className="dish-image">
                            {item.card.info.imageId ? (
                              <img
                                src={`https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.card.info.imageId}`}
                                alt=""
                              />
                            ) : (
                              <img src=""></img>
                            )}
                            {/* <div className="addtocart" onClick={handleAddItem}>ADD</div> */}
                            <button
                              className="addtocart"
                              onClick={() => handleAddItem(item)}
                            >
                              ADD
                            </button>
                          </div>
                        </li>
                      )
                    )}
                  </div>
                </Collapsible>
              </div>
              <div className="catright">
                {/* <i class="bi bi-arrow-down-short"></i>   */}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
