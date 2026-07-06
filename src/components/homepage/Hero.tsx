import carousal1 from "../../assets/carousal/carousal-1.jpg"
import carousal2 from "../../assets/carousal/carousal-2.jpg"
import carousal3 from "../../assets/carousal/carousal-3.jpg"
import carousal4 from "../../assets/carousal/carousal-4.jpg"
import Carousal from "./Carousal";
const Hero = () => {

  const Images = [{id: 1, src: carousal1},
                  {id: 2, src: carousal2},
                  {id: 3, src: carousal3}, 
                  {id: 4, src: carousal4}
                ];
  return (
    <section
      className="relative w-full
                 bg-gradient-to-b from-indigo-100 to-yellow-100
                 flex items-center px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <Carousal images={Images}/>
      
      
    </section>
  );
};

export default Hero;
