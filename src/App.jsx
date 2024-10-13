import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Header_Footer/CustomerHeader";
import Home from "./CustomerPage/Home";
const App = () => {
  return (
    <div>
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};
export default App;
