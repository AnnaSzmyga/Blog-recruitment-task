import { useScroll } from "../../hooks/useScroll";
import logo from "./../../logo.svg";
import "./hero.css";

const Hero = () => {
  const { isAtTop } = useScroll();
  return (
    <header className={`hero-wrapper ${isAtTop ? "" : "small-size"}`}>
      <div className={`hero ${isAtTop ? "" : "small-size"}`}>
        <span className="slogan">Inspire</span>
        <img className="logo-img" src={logo} alt="logo" />
        <span className="slogan">Daily</span>
        <span className="logo-text">Creative Blog</span>
      </div>
    </header>
  );
};

export default Hero;
