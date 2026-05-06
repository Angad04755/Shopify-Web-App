import { lazy } from "react";
import { Suspense } from "react";
const Hero = lazy(() => import("../components/homepage/Hero"));
const Category = lazy(() => import("../components/homepage/Category"));

const HomePage = ()=>{
 return <>
         <Suspense>
        <Hero/>
        <Category/>
        </Suspense>
   </>
}
export default HomePage;