import { React } from "@xarc/react";
import "../../styles/home.scss";
import "../../styles/home.sass";
const Home = () => {
  return (
    <div data-testid="home">
      <h1>This is Dynamically Loaded Home Page Component!</h1>
      <div className="box__wrapper_scss">
        <div className="box-primary_scss">Box Primary Scss</div>
        <div className="box-primary_sass">Box Primary Sass</div>
      </div>
    </div>
  );
};

export default Home;
