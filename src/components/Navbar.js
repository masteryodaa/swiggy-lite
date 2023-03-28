import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../assets/swiggy-logo.png";
import UserContext from "../utils/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const cartItems = useSelector(store => store.cart.items)
  console.log(cartItems);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    if (navigator.geolocation) {
      document.getElementById("loc").innerHTML = "Locating...";
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        // change the address
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            const loc = document.getElementById("loc");
            loc.innerHTML = data.display_name;
            loc.style.fontWeight = "normal";
            document.getElementById("locimg").style.display = "none";
          });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="header">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img
              data-testid="logo"
              height={50}
              src={Logo}
              alt="Swiggy"
            />
          </Link>
          <div className="address" onClick={getLocation}>
            {/* get current location */}
            <b id="loc">Current Location</b>
            <img
              id="locimg"
              width={15}
              src="https://www.seekpng.com/png/full/422-4228578_free-download-my-location-icon-png-clipart-computer.png"
              alt="location"
            />
          </div>
        </div>
        <div className="nav-links">
          <ul>
            <Link to="/profile">
              <li>
                <i className="bi bi-person"></i>
                {user.name}
              </li>
            </Link>
            <Link to="/cart">
              <li>
                <i className="bi bi-bag"></i>Cart  <div data-testid="cart" className="cartCount">{cartItems!=0?cartItems.length:0}</div>
              </li>
            </Link>
            <Link to="/about">
              <li>
                <i className="bi bi-chat"></i>About Us
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
