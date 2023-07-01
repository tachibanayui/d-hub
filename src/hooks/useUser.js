import { useEffect, useState } from "react";

export const useUser = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const userStore = window.localStorage.getItem("user");
        setUser(JSON.parse(userStore));
    }, []);

    const saveUser = (user) => {
        if (!user) {
            window.localStorage.removeItem("user");
            setUser(undefined);
        } else {
            window.localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
        }
    }

    return [user, saveUser];
};
