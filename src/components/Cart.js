import emptyCart from "../assets/empty.png";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [empty, setEmpty] = useState(true);

  return (
    <div className="cart">
      {empty ? (
        <div className="empty">
          <img src={emptyCart} alt="" />
          {/* <p>Your cart is empty</p> */}
          <Link to='/' >
            <div className="gotohome">SEE RESTAURANTS NEAR YOU</div>
          </Link>
        </div>
      ) : (
        <div className="full">
          <p>Cart is full</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
