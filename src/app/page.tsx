import Banner from "./components/home/banner";
import CtaBanner from "./components/home/CtaBanner";
import Featured from "./components/home/Featured";
import Testimonials from "./components/home/Testimonials";
import WhyChooseUs from "./components/home/WhyChooseUs";


export default function Home() {
  return (
   <>
   <Banner/>
   <Featured />
   <WhyChooseUs/>
   <Testimonials/>
   <CtaBanner/>
   </>
  );
}
