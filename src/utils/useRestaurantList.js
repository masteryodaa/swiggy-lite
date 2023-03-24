import { useState, useEffect } from "react";

const useRestaurantList = () => {
  const [lat, setLat] = useState(25.5690792);
  const [lng, setLng] = useState(85.0960476);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [openRestaurant, setOpenRestaurant] = useState(0);


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
   let data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`
    );
    data = await data.json();
    // console.log(data.data.cards[2].data.data.cards)
    setAllRestaurants(data?.data?.cards[2]?.data?.data?.cards);
    // setFilteredRestaurants(data?.data?.cards[2]?.data?.data?.cards);
    setOpenRestaurant(data?.data?.cards[2]?.data?.data?.totalOpenRestaurants);
  }

  useEffect(() => {
    getPosition();
    getRestaurants();
  }, []);

//   useEffect(() => {
//     console.log(lat, lng);
//   }, [lat, lng]);
  const data = [allRestaurants,openRestaurant];
//   console.log(data);
  return data;
};

export default useRestaurantList;
