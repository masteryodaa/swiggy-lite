import { IMG_URL } from "./config";

const RestaurantCard = ({name, cloudinaryImageId, cuisines, costForTwoString, avgRating, id}) => {
    return (
      <div className="cardlist"  key={id}>
        <div className="card">
          <img
            src={IMG_URL+cloudinaryImageId}
            alt="img"
          />
          <h4 className="name">{name}</h4>
          <p className="cuisine">{cuisines.join(", ")}</p>
  
          <div className="card-info">
            <div className="rating">
              <i className="bi bi-star-fill"></i>
              <span>{avgRating}</span>
            </div>
            <div className="cost">
              <p>{costForTwoString}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default RestaurantCard;