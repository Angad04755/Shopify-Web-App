import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import WishlistCard from "../ui/WishlistCard";
import image from "../../assets/images/images.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function WishlistPage() {
    const items = useSelector((item: RootState) => item.wishlist.items);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant"})
    }, []);

    if (items.length === 0) {
        return (
            <main className="min-h-screen bg-gray-50 flex justify-center items-center">
                <section className="mx-auto container p-5 flex flex-col place-content-center">
                    <h1 className="text-center text-xl font-semibold">No wishlisted Items</h1>
                <img src={image} className="object-cover mx-auto mt-10"/>
                <button className="mx-auto bg-green-400 px-5 py-3 text-xl rounded-lg text-gray-700 font-semibold mt-10 cursor-pointer hover:bg-green-500 active:bg-green-600 w-fit" onClick={()=> navigate("/")}>Explore Items</button>
                </section>

            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <section className="mx-auto container p-5">
                <h1 className="text-xl text-gray-700 font-semibold w-full mt-5">Wishlist</h1>
<article className="flex flex-col md:flex-row gap-10 mt-10">
                    {items.map((item) => 
                        <WishlistCard key={item.id} wishListItem={item}/>
                    )}
                </article>
            </section>
        </main>
    )
}
export default WishlistPage;