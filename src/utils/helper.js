export const filterRestaurants = (searchText, restaurants) => {
    const filteredRestaurants = restaurants.filter((restaurant) => {
      return restaurant.data.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
    });
    console.log(filteredRestaurants);
    return filteredRestaurants;
  };