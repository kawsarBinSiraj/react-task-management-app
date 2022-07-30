import Cookies from "cookies-js";

class AuthLibrary {
    /**
     *
     * @param access_token
     * @param token_type
     * @param expired_at
     * @returns {Cookies}
     */
    setTokenToCookie = (access_token, expired_at) => {
        try {
            return Cookies.set("access_token", access_token, {
                expires: expired_at
            });
        } catch (err) {
            throw Error("Auth generation is failed.");
        }
    };

    /**
     * @param callback
     * @returns {boolean|*}
     */
    login = (callback) => {
        // redirection...
        if (sessionStorage.getItem("redirectURL")) {
            return window.location.href = sessionStorage.getItem("redirectURL");
        }

        if (typeof callback === "function") {
            return callback();
        }

        window.location.href = '/'
    };

    /**
     * @param callback
     * @returns {boolean|*}
     */
    logout = async (callback) => {
        Cookies.expire("access_token");
        if (typeof callback === "function") {
            return callback();
        }
        window.location.href = '/login'
    };
}

export default new AuthLibrary();
