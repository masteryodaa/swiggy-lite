import { useContext, useState } from "react";
import UserContext from "../utils/UserContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [inputValue, setInputValue] = useState(user.name);

  return (
    <div className="profile">
      <input
        type="text"
        className="profilename"
        placeholder="change your name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="gotohome" onClick={() => setUser({name:inputValue})}>
        save
      </div>
    </div>
  );
};

export default Profile;
