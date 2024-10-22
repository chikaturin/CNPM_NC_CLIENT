import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Header_Footer/CustomerHeader";
import Home from "./CustomerPage/Home";
import Footer from "./Header_Footer/CustomerFooter";
const App = () => {
  return (
    <div>
      <Header />
      <div className="lg:mt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default App;
