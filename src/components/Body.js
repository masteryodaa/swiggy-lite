import RestaurantCard from "./RestaurantCard";
// import { restaurantList } from "./config";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterRestaurants } from "../utils/helper";
import useRestaurantList from "../utils/useRestaurantList";

const Body = () => {
  const [lat, setLat] = useState(25.5690792);
  const [lng, setLng] = useState(85.0960476);
  const [allRestaurants, setAllRestaurants] = useState([]);
  // const Restaurantlist = useRestaurantList();
  // console.log(Restaurantlist);
  // const allRestaurants = allRestaurants[0];
  // const openRestaurant = allRestaurants[1];
  // setAllRestaurants(restaurants[0]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [openRestaurant, setOpenRestaurant] = useState(0);
  const [searchText, setSearchText] = useState("");

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(lat, lng);
        setLat(lat);
        setLng(lng);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  async function getRestaurants() {
    data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`
    );
    data = await data.json();
    // console.log(data.data.cards[2].data.data.cards)
    setAllRestaurants(data?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(data?.data?.cards[2]?.data?.data?.cards);
    setOpenRestaurant(data?.data?.cards[2]?.data?.data?.totalOpenRestaurants);
  } 

  useEffect(() => {
    getPosition();
    getRestaurants();
  }, []);

  useEffect(() => {
    console.log(lat, lng);
  }, [lat, lng]);



  return ( 
    <>
      <div className="search">
        <input
          type="text"
          placeholder="Search for restaurants and food"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            const data = filterRestaurants(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
        />
        <i
          onClick={() => {
            const data = filterRestaurants(searchText, allRestaurants);
            setFilteredRestaurants(data);
          }}
          className="bi bi-search"
        ></i>
      </div>

      <div className="body">
        <div className="info">
          <h1>{openRestaurant} restaurants</h1>
          <div className="options">
            <ul>
              <li>Relevance</li>
              <li>Delivery Time</li>
              <li>Rating</li>
              <li>Cost: Low to High</li>
              <li>Cost: High to Low</li>
            </ul>
          </div>
        </div>

        {allRestaurants.length === 0 ? (
          <Shimmer />
        ) : filteredRestaurants.length === 0 ? (
          <h1>No Restaurants found</h1>
        ) : (
          <div className="cards">
            {filteredRestaurants.map((restaurant) => {
              return (
                <Link to={`/restaurant/${restaurant.data.id}`} key={restaurant.data.id}>
                  <RestaurantCard
                    {...restaurant.data}
                    
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
