import { createContext } from "react";

const UserContext = createContext({
    user: {
        name: "Ujjwal Kumar"
    }
});

export default UserContext;