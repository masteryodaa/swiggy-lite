import { IMG_URL } from "./config";

const CartMenu = ({ item, id }) => {
  return (
    <div className="cardlist" key={id}>
      <div className="card">
        <img src={IMG_URL + item.imageId} alt="img" />
        <h4 className="name">{item.name}</h4>

        <div className="card-info">
          {item.ratings.aggregatedRating.rating != Number ? (
            <div className="rating">
              <i className="bi bi-star-fill"></i>
              <span>--</span>
            </div>
          ) : (
            <div className="rating">
              <i className="bi bi-star-fill"></i>
              <span>{item.ratings.aggregatedRating.rating}</span>
            </div> 
          )} 

          {/* <div className="rating">
            <i className="bi bi-star-fill"></i>
            <span>--</span>
          </div> */}

          <div className="cost">
            <p>₹ {item.price / 100}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartMenu;
