import { useState, useEffect } from "react";
import { DATA_URL } from "../components/config";

const useRestaurantMenu = (id) => {
  const [restaurantMenu, setRestaurantMenu] = useState({});

  useEffect(() => {
    getRestaurantMenu();
  }, []);

  const getRestaurantMenu = async () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
  
        const response = await fetch(
          `${DATA_URL}${latitude}&lng=${longitude}&restaurantId=${id}`
        );
        const data = await response.json();
  
        const info = data?.data?.cards[0]?.card?.card?.info;
  
        let menu =
          data?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
        menu = menu.filter((menu) => menu.card.card.hasOwnProperty("itemCards"));
  
        const res = {
          info:info,
          menu:menu,
        }
        // console.log(res);
        setRestaurantMenu(res)
      });
    }
    else{
      console.log("Geolocation is not supported by this browser.")
    }
  };
  return restaurantMenu;
};

export default useRestaurantMenu;
