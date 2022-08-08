import { useEffect } from "react";
import HomeBestSeller from "./HomeBestSeller";
import HomeCategory from "./HomeCategory";
import HomeNewArrived from "./HomeNewArrived";

function Home() {
useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  return ( 
    <div className="home">
      <HomeCategory />
      <HomeBestSeller />
      <HomeNewArrived />
    </div>
   );
}

export default Home;