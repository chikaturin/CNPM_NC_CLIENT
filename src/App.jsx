import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <p className="text-white">trang cus</p>
      <Outlet />
    </>
  );
}

export default App;
