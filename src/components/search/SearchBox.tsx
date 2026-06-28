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
  SearchIcon, X
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

  },[searchParams]);












  const handleSubmit = (
    query: string, e: any
  )=>{
    e.preventDefault();
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

bg-white

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



<form


className="

flex

items-center

rounded-full

border-2

border-blue-500

bg-white

shadow-md


"
onSubmit={(e) => handleSubmit(query, e)}

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
<span className="mr-5">
{query && <span className="cursor-pointer" onClick={() => setQuery("")}><X/></span>}
</span>
</form>



<div>

{
suggestions.length > 0 &&


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


onClick={(e)=>{

handleSubmit(item.title, e)}}


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