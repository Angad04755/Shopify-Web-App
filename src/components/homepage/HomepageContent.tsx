import Hero from "../homepage/Hero";
import Category from "../homepage/Category";
import { useEffect } from "react";
function HomePageContent() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant"})
    }, []);
    return (
        <>
            <Hero/>
            <Category/>
            </>
    )
}
export default HomePageContent;