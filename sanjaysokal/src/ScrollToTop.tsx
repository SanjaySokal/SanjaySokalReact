import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        var links = document.querySelector(".menu-mobile")
        links?.classList.remove("d-block")

        var drop = document.querySelector(".nav-dropdown")
        drop?.classList.remove("d-block")
    }, [pathname]);

    return null;
}