import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Dashboard from "./components/dashboard";
import Hero from "./components/hero";
import { SendMoney } from "./components/sendmoney";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/send" element={<SendMoney />} />



        </Routes>
      </BrowserRouter>
    </> 
  );
}

export default App;
