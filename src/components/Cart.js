import emptyCart from "../assets/empty.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import CartMenu from "./CartMenu";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cartBody">
      <div className="cart">
        {cartItems.length == 0 ? (
          <div className="empty">
            <img src={emptyCart} alt="" />
            {/* <p>Your cart is empty</p> */}
            <Link to="/">
              <div className="gotohome">SEE RESTAURANTS NEAR YOU</div>
            </Link>
          </div>
        ) : (
          cartItems.map((item) => (
            <CartMenu id={item.card.info.id} item={item.card.info} />
          ))
        )}
      </div>
      {cartItems.length != 0 ? (
        <div className="clearCartButton">
          <div className="gotohome" onClick={() => handleClear()}>
            Clear Cart
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
