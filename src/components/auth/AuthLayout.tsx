"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SignIn from "./SignIn";
import Register from "./Register";

import logo from "../../assets/images/logo.png";

import video from "../../assets/images/watermarked_preview.mp4";



function AuthLayout() {


  const [showRegister,setShowRegister] =
  useState(false);


  const navigate = useNavigate();




  return (


    <div className="min-h-screen flex">







      {/* LEFT DESIGN SECTION */}


      <div


      className="

      hidden

      md:flex


      w-[50vw]

      h-screen


      relative

      overflow-hidden


      flex-col

      justify-between


      p-8


      "


      >





        {/* BACKGROUND VIDEO */}


        <video

        src={video}

        autoPlay

        muted

        loop

        playsInline


        className="

        absolute

        inset-0

        w-full

        h-full

        object-cover

        "

        />






        {/* DARK OVERLAY */}


        <div

        className="

        absolute

        inset-0

        bg-black/10

        "

        />








        {/* CONTENT ABOVE VIDEO */}


        <div

        className="

        relative

        z-10

        h-full

        flex

        flex-col

        justify-between

        "

        >








          {/* LOGO */}



          <div


          onClick={()=>navigate("/")}


          className="

          flex

          items-center

          cursor-pointer

          w-fit

          "


          >



            <img


            src={logo}


            alt="logo"


            className="

            w-12

            h-12

            object-contain

            "


            />




            <span


            className="
            text-gray-700
            text-2xl
            font-semibold

            "


            >

              Shopify


            </span>




          </div>












          {/* CENTER TEXT */}



          











          {/* FOOTER */}



          <div


          className="

          text-left

          text-sm
            font-semibold
          text-gray-700

          "


          >


            © {new Date().getFullYear()} Shopify.
            All rights reserved.



          </div>







        </div>






      </div>















      {/* RIGHT AUTH SECTION */}



      <div


      className="

      w-full

      md:w-[50vw]


      min-h-screen


      flex

      items-center

      justify-center


      bg-white


      px-6

      sm:px-10


      "


      >






        <div


        className="

        w-full

        max-w-md

        "


        >





        {


          showRegister ?



          <Register

          onLogin={()=>setShowRegister(false)}

          />



          :



          <SignIn

          onRegister={()=>setShowRegister(true)}

          />



        }





        </div>






      </div>








    </div>


  );

}



export default AuthLayout;