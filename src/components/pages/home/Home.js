import HomeBestSeller from "./HomeBestSeller";
import HomeCategory from "./HomeCategory";
import HomeNewArrived from "./HomeNewArrived";

function Home() {
  return ( 
    <div className="home">
      <HomeCategory />
      <HomeBestSeller />
      <HomeNewArrived />
    </div>
   );
}

export default Home;