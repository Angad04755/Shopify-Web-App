"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";

import ProductCard from "../ui/ProductCard";

import { searchProduct } from "../../services/GetSearchProduct";

import { type Product } from "../product/types";

import SearchBox from "./SearchBox";


const SearchDetails = () => {


  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");



  const [searchParams] = useSearchParams();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant"});
  }, []);


  useEffect(() => {


    const query = searchParams.get("query");



    if (!query) {

      setProducts([]);

      setHasSearched(false);

      setSearchQuery("");

      return;

    }



    const fetchProducts = async () => {


      try {


        setLoading(true);

        setHasSearched(true);

        setSearchQuery(query);



        const data = await searchProduct(query);



        setProducts(data.products);



      } catch (error) {


        console.log(
          "Search error",
          error
        );


      } finally {


        setLoading(false);


      }


    };



    fetchProducts();



  }, [searchParams]);







  return (


    <motion.main

      initial={{
        opacity: 0
      }}

      animate={{
        opacity: 1
      }}

      transition={{
        duration:0.3
      }}

    >



      <SearchBox />





      <section className="
      max-w-7xl
      mx-auto
      px-4
      py-8
      ">





        {
          hasSearched &&

          <motion.div

          initial={{
            opacity:0,
            y:10
          }}

          animate={{
            opacity:1,
            y:0
          }}

          className="
          mb-8
          bg-white
          rounded-2xl
          shadow-sm
          p-6
          "

          >


            <h1 className="
            text-xl
            sm:text-2xl
            font-semibold
            text-gray-800
            ">

              Search results

            </h1>



            <p className="
            text-sm
            text-gray-500
            mt-2
            ">


              Showing results for

              <span className="
              ml-1
              font-medium
              text-gray-800
              ">

                "{searchQuery}"

              </span>


            </p>



          </motion.div>


        }









        {
          loading &&


          <div className="
          flex
          justify-center
          py-20
          ">


            <motion.p

            animate={{
              opacity:[
                0.3,
                1,
                0.3
              ]
            }}

            transition={{
              repeat:Infinity,
              duration:1.2
            }}

            className="
            text-gray-500
            "

            >

              Searching products...

            </motion.p>


          </div>


        }









        {
          !loading &&
          hasSearched &&
          products.length === 0 &&



          <motion.div

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

          className="
          text-center
          py-20
          "

          >


            <p className="
            text-gray-500
            ">

              No products found matching your search.

            </p>



          </motion.div>



        }









        {
          !loading &&
          products.length > 0 &&



          <motion.div

          initial="hidden"

          animate="visible"


          variants={{

            hidden:{
              opacity:0
            },

            visible:{

              opacity:1,

              transition:{
                staggerChildren:0.05
              }

            }

          }}


          className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          gap-4
          sm:gap-6
          "

          >



            {
              products.map(product=>(


                <motion.div

                key={product.id}


                variants={{

                  hidden:{
                    opacity:0,
                    y:12
                  },

                  visible:{
                    opacity:1,
                    y:0
                  }

                }}


                transition={{
                  duration:0.25
                }}


                >


                  <ProductCard
                  product={product}
                  />


                </motion.div>



              ))
            }



          </motion.div>


        }




      </section>




    </motion.main>


  );

};



export default SearchDetails;