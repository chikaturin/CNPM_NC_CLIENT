import { Outlet } from "react-router-dom";
import "./App.css";
import Hearder from "./Header_Footer/Hearder";
import Home from "./CustomerPage/Home";
const App = () => {
  return (
    <div>
      <Hearder />
      <div className="mt-52">
        aaaa
        <Home />
      </div>
    </div>
  );
};
export default App;
