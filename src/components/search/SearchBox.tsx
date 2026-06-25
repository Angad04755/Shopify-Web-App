"use client";


import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";


import {
  useEffect,
  useState
} from "react";


import {
  SearchIcon
} from "lucide-react";


import {
  searchProduct
} from "../../services/GetSearchProduct";


import {
  type Product
} from "../product/types";





const SearchBox = () => {


  const [query,setQuery] = useState("");

  const [suggestions,setSuggestions] =
  useState<Product[]>([]);



  const navigate = useNavigate();



  const [searchParams] =
  useSearchParams();



  const urlQuery =
    searchParams.get("query");




  // Fetch suggestions

  useEffect(()=>{


    if(!query.trim() || urlQuery === query){

      setSuggestions([]);

      return;

    }



    const timer = setTimeout(async()=>{


      try{


        const data =
        await searchProduct(query);



        setSuggestions(
          data.products.slice(0,3)
        );


      }
      catch(error){

        console.log(error);

      }



    },500);



    return ()=>clearTimeout(timer);



  },[query]);








  // Get query from URL

  useEffect(()=>{



    if(urlQuery){

      setQuery(urlQuery);

      setSuggestions([]);

    }

    // if (!query || urlQuery === query) {
    //   setSuggestions([])
    // }


  },[searchParams]);












  const handleSubmit = (
    query: string
  )=>{

    navigate(
      `/search?query=${query}`
    );
    setSuggestions([]);


  };









return (


<div

className="

sticky

top-17.5

z-100

w-full

backdrop-blur-xl

bg-white/80

py-5

"

>


<div

className="

w-full

px-5

md:px-35

"

>



<div


className="

flex

items-center

rounded-full

border

border-gray-300

bg-white

shadow-md

focus-within:ring-2

focus-within:ring-blue-500

transition

"


>


<SearchIcon

size={22}

className="
ml-4
text-gray-500
"

/>




<input


value={query}


onChange={(e)=>
setQuery(e.target.value)
}


placeholder="Search products..."


className="

flex-1

px-4

py-3

outline-none

rounded-full

"




/>



</div>



<div>

{
suggestions &&


<div


className="

mt-2

w-full

bg-white

rounded-xl

shadow-xl

overflow-hidden

"


>


{

suggestions.map(item=>(


<div


key={item.id}


onClick={()=>{

handleSubmit(item.title)}}


className="
flex flex-row gap-5

px-5

py-3

cursor-pointer

hover:bg-gray-100

transition

text-sm

"


><img src={item.thumbnail} width={35} height={35}/>


{item.title}



</div>



))


}



</div>


}
</div>




</div>



</div>


)


};



export default SearchBox;