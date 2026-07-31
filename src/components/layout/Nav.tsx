import { 
  useEffect,
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
from "../../store/slices/authSlice";

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


import logo from "../../assets/images/logo.png";



const Nav = () => {


const [isOpen, setIsOpen] = useState(false);

const [profileOpen, setProfileOpen] = useState(false);

const [scrolled, setScrolled] = useState(false);


const dispatch = useDispatch<AppDispatch>();

const navigate = useNavigate();

const location = useLocation();





const isAuthenticated = useSelector(
(state:RootState)=>state.auth.isAuthenticated
);







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
localStorage.removeItem("isAuthenticated");

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

<Menu size={28} color="gray"/>


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
font-semibold
text-gray-700
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


<button className={`${location.pathname === "/search" ? "bg-white" : ""} hover:bg-white px-2 py-2 rounded-full transition`}><SearchIcon

size={24} color="gray"

className={`cursor-pointer ${location.pathname === "/search" ? "fill-black" : ""}`}

onClick={()=>navigate("/search")}

/></button>


<button><HeartIcon color="gray"

className="cursor-pointer"

/></button>


 <CartIcon
/>



<button className=""><UserSection
isAuthenticated={isAuthenticated}
profileOpen={profileOpen}
setProfileOpen={setProfileOpen}
logout={logout}
/></button>



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


<button className={`${location.pathname === "/search" ? "bg-white" : ""} hover:bg-white px-2 py-2 rounded-full transition`}><SearchIcon

size={24} color="gray"

className={`cursor-pointer ${location.pathname === "/search" ? "fill-black" : ""}`}

onClick={()=>navigate("/search")}

/></button>



{/* <CartIcon
/> */}



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
text-gray-700
font-semibold
text-xl
"

>

Menu

</h2>



<button

onClick={()=>setIsOpen(false)}

>

<X size={25} color="gray"/>

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
border-1 border-gray-700
hover:bg-gray-50
text-gray-700
cursor-pointer
"

>

<HeartIcon color="gray"/>

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
border-1 border-gray-700
hover:bg-gray-50
text-gray-700
cursor-pointer
"

>


<ShoppingCart color="gray"/>





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







function CartIcon(){


const navigate=useNavigate();


return (




<button
  className={`
    relative
    cursor-pointer
    transition
    px-2 py-2
    rounded-full
    hover:bg-white
    ${location.pathname === "/cart" ? "bg-white" : ""}
  `}
  onClick={() => navigate("/cart")}
>
  <ShoppingCart
    size={24} color="gray"
    className={location.pathname === "/cart" ? "fill-black" : ""}
  />
</button>

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
border-1
border-gray-700
px-3
py-2
rounded-lg
text-xs
text-gray-700
font-medium
hover:bg-gray-700
hover:text-white
active:bg-gray-800
transition
cursor-pointer
"

>

Log In

</button>

)




return (

<div className="relative">

<button
  onClick={() => setProfileOpen(!profileOpen)}
  className={`
    w-10
    h-10
    rounded-full
    flex
    items-center
    justify-center
    cursor-pointer
    transition
    bg-indigo-200
    hover:bg-indigo-300
    ${profileOpen ? "bg-indigo-300" : ""}
  `}
>
  <User
    size={20} color="gray"
    className={profileOpen ? "fill-black" : ""}
  />
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


<p className="text-xs text-gray-700">

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

text-red-700

hover:bg-red-50
cursor-pointer
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