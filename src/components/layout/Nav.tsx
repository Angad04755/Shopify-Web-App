import { 
  useEffect, 
  useMemo, 
  useState 
} from "react";

import {
  HeartIcon,
  ShoppingCart,
  Menu,
  X,
  User,
  SearchIcon,
} from "lucide-react";

import { 
  useDispatch, 
  useSelector 
} from "react-redux";

import { authenticated } 
from "../../store/features/auth/authSlice";

import { 
  motion, 
  AnimatePresence 
} from "framer-motion";

import { 
  useLocation, 
  useNavigate 
} from "react-router-dom";

import { toast } 
from "react-toastify";

import type { 
  AppDispatch, 
  RootState 
} from "../../store/store";

import type { CartItem } 
from "../../store/types";

import logo from "../../assets/images/logo.png";



const Nav = () => {


const [isOpen,setIsOpen] = useState(false);

const [profileOpen,setProfileOpen] = useState(false);

const [scrolled,setScrolled] = useState(false);


const dispatch = useDispatch<AppDispatch>();

const navigate = useNavigate();

const location = useLocation();



const items = useSelector(
(state:RootState)=>state.cart.items
);


const isAuthenticated = useSelector(
(state:RootState)=>state.auth.isAuthenticated
);



const totalQuantity = useMemo(()=>{

return items.reduce(
(sum:number,item:CartItem)=>
sum + item.quantity,
0
)

},[items]);




useEffect(()=>{


const handleScroll=()=>{

setScrolled(window.scrollY > 20)

}


window.addEventListener(
"scroll",
handleScroll
);


return ()=>{

window.removeEventListener(
"scroll",
handleScroll
)

}


},[]);






const logout = ()=>{

dispatch(
authenticated(false)
);

setProfileOpen(false);

toast.success(
"Logged out"
);

};




return (

<>


<motion.header

initial={{y:-80}}

animate={{y:0}}

transition={{
duration:0.4
}}

className={`
${
location.pathname.includes("/sign")
?"hidden"
:"block"
}

sticky top-0 z-[200]

w-full

${

scrolled
?
"shadow-md"
:""

}

bg-indigo-100

`}

>


<nav

className="
container
mx-auto
h-[70px]
px-4

flex
items-center
justify-between

"

>



{/* LEFT SECTION */}


<div className="flex items-center gap-3">


<button

className="
md:hidden
"

onClick={()=>setIsOpen(true)}

>

<Menu size={28}/>


</button>



<div

onClick={()=>navigate("/")}

className="
flex
items-center
gap-2
cursor-pointer
"

>


<img

src={logo}

alt="logo"

className="w-10 h-10"

/>


<span

className="
font-bold
text-gray-600
text-2xl
"

>

Shopify

</span>


</div>


</div>





{/* DESKTOP ICONS */}

<div

className="
hidden
md:flex
items-center
gap-6
"

>


<SearchIcon

size={24}

className="cursor-pointer"

onClick={()=>navigate("/search")}

/>


<HeartIcon

className="cursor-pointer"

/>



<CartIcon
totalQuantity={totalQuantity}
/>



<UserSection
isAuthenticated={isAuthenticated}
profileOpen={profileOpen}
setProfileOpen={setProfileOpen}
logout={logout}
/>



</div>







{/* MOBILE ICONS */}


<div

className="
flex
md:hidden
items-center
gap-4
"

>


<SearchIcon

size={23}

onClick={()=>navigate("/search")}

/>



<CartIcon
totalQuantity={totalQuantity}
/>



<UserSection

isAuthenticated={isAuthenticated}

profileOpen={profileOpen}

setProfileOpen={setProfileOpen}

logout={logout}

/>



</div>




</nav>


</motion.header>







{/* MOBILE SIDEBAR */}


<AnimatePresence>


{
isOpen &&

<aside

className="
fixed
inset-0
z-[9999]
"

>


<div

className="
absolute
inset-0
bg-black/40
"

onClick={()=>setIsOpen(false)}

/>



<motion.div


initial={{
x:-350
}}

animate={{
x:0
}}

exit={{
x:-350
}}


transition={{
duration:.3
}}


className="
absolute
left-0
top-0

h-full
w-[85%]
max-w-[320px]

bg-white

shadow-xl

"

>


<div className="p-6">


<div

className="
flex
justify-between
items-center
"

>


<h2

className="
font-bold
text-xl
"

>

Menu

</h2>



<button

onClick={()=>setIsOpen(false)}

>

<X size={25}/>

</button>


</div>




<div

className="
mt-8
space-y-4
"

>


<div

className="
flex
items-center
gap-3
p-4
rounded-xl
border
hover:bg-gray-50
cursor-pointer
"

>

<HeartIcon/>

Favorites

</div>





<div

onClick={()=>{

navigate("/cart");

setIsOpen(false);

}}

className="
flex
items-center
gap-3
p-4
rounded-xl
border
hover:bg-gray-50
cursor-pointer
"

>


<ShoppingCart/>


Cart


{
totalQuantity>0 &&

<span

className="
ml-auto
bg-red-500
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
"

>

{totalQuantity}

</span>

}



</div>



</div>


</div>


</motion.div>



</aside>

}



</AnimatePresence>


</>

)

};







function CartIcon({
totalQuantity
}:{
totalQuantity:number
}){


const navigate=useNavigate();


return (

<div

onClick={()=>navigate("/cart")}

className="
relative
cursor-pointer
hover:scale-95
transition
"

>


<ShoppingCart size={24}/>


{
totalQuantity>0 &&

<span

className="
absolute
-top-2
-right-2

bg-red-500
text-white

text-xs

rounded-full

w-5
h-5

flex
items-center
justify-center

"

>

{totalQuantity}

</span>

}


</div>

)

}









function UserSection({

isAuthenticated,

profileOpen,

setProfileOpen,

logout


}:any){


const navigate=useNavigate();



if(!isAuthenticated)

return (

<button

onClick={()=>navigate("/sign-in")}

className="
border
px-3
py-2
rounded-lg
text-sm
font-medium
hover:bg-black/80
hover:text-white
transition
cursor-pointer
"

>

Sign In

</button>

)




return (

<div className="relative">


<button

onClick={()=>
setProfileOpen(!profileOpen)
}

className="
w-10
h-10

rounded-full

bg-indigo-200

flex
items-center
justify-center

"

>

<User size={20}/>


</button>





<AnimatePresence>

{

profileOpen &&

<motion.div

initial={{
opacity:0,
scale:.9,
y:-10
}}

animate={{
opacity:1,
scale:1,
y:0
}}

exit={{
opacity:0,
scale:.9,
y:-10
}}

className="
absolute
right-0
mt-3

w-48

bg-white

rounded-2xl

shadow-xl

border

overflow-hidden

z-[9999]

"

>


<div

className="
px-4
py-3
border-b
"

>

<p className="font-semibold">

My Account

</p>


<p className="text-xs text-gray-500">

Welcome back

</p>


</div>



<button

onClick={logout}

className="
w-full
text-left

px-4
py-3

text-red-500

hover:bg-red-50

"

>

Logout

</button>


</motion.div>


}


</AnimatePresence>


</div>


)


}


export default Nav;