import { useEffect, useState } from "react";
import { DeleteFromWishlist } from "../../redux/slices/WishlistSlice";
import { Heart } from "lucide-react";
import type { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import type { Product } from "../../types/Products";
import { AddToCart } from "../../redux/slices/cartSlice";
interface WishlistProps {
    wishListItem: Product,
}
function WishlistCard({ wishListItem }: WishlistProps) {
    const Items: Product[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const [liked, setLiked] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const addToCartHandler = () => {
    dispatch(AddToCart(wishListItem));
    toast.success("added to cart")
  };

  useEffect(() => {
    const desiredItem = Items.find((item) => item.id === wishListItem.id)

    if (desiredItem) {
        setLiked(true);
    }
  }, [])

  const deleteFromWishlistHandler = () => {
        dispatch(DeleteFromWishlist(wishListItem.id));
        const updateditems = Items.filter((item) => item.id !== wishListItem.id);
        localStorage.setItem("wishlist", JSON.stringify(updateditems));
        toast.success("Item removed from wishlist")
        setLiked(false)
  }

    return (
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col h-full w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xs">
      <div className="flex justify-between space-x-2">
        
        <Heart className={`${liked ? "fill-red-500" : ""} cursor-pointer`} size={25} onClick={deleteFromWishlistHandler} />
      </div>
      {/* Product Image */}
      <div className="flex justify-center items-center h-40 sm:h-48 md:h-56">
        <img
          src={wishListItem.thumbnail}
          alt={wishListItem.title}
          width={200}
          height={200}
          className="object-contain max-h-full max-w-full"
        />
      </div>


      {/* Title */}
      <div onClick={() => navigate(`/product/product-details/${wishListItem.id}`)}>
        <h1 className="mt-1 text-base sm:text-lg font-semibold text-gray-700 cursor-pointer hover:text-gray-800 hover:underline">
          {wishListItem.title}
        </h1>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mt-2">
        <p className="text-gray-400 text-sm sm:text-base line-through font-medium">
          ${(wishListItem.price + 10).toFixed(2)}
        </p>
        <p className="text-black text-lg sm:text-xl font-bold">
          ${wishListItem.price}
        </p>
      </div>

      {/* Buttons */}
      

      {/* Ratings */}
      
      <div className="mt-2">
        <button className="rounded-lg bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500  px-3 py-4 text-gray-700 font-semibold w-full cursor-pointer" onClick={addToCartHandler}> Add to Cart
        </button>
        </div>
      
    </div>
    )
}

export default WishlistCard;
