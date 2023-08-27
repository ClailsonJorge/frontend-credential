import Cookies from "js-cookie"

export const logout = () => {
    Cookies.set("user", "");
    Cookies.set("token", "");
}