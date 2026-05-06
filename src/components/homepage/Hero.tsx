import carousal1 from "../../assets/carousal/carousal-1.jpg"
import carousal2 from "../../assets/carousal/carousal-2.jpg"
import carousal3 from "../../assets/carousal/carousal-3.jpg"
import carousal4 from "../../assets/carousal/carousal-4.jpg"
import Carousal from "./Carousal";
const Hero = () => {

  const Images = [carousal1, carousal2, carousal3, carousal4];
  return (
    <section
      className="relative w-full
                 bg-gradient-to-br from-slate-50 via-white to-indigo-50
                 flex items-center px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <Carousal images={Images}/>
      
      
    </section>
  );
};

export default Hero;
