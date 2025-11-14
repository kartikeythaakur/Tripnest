import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Addproperty from "./Components/Addproperty";
import Dashboard from "./Components/Dashboard";
import AdminLogin from "./Components/AdminLogin";
import AdminSignUp from "./Components/AdminSignup";
import ViewProperties from "./Components/ViewProperties";
import AdminProtected from "./Protected Routes/AdminProtected";
import UserProtected from "./Protected Routes/UserProtected";
import AdminPublic from "./Protected Routes/AdminPublic";
import GetProperty from "./Components/GetProperty";
import AboutUsPage from "./Components/AboutUsPage";
import Help from "./Components/Help";
import Bookings from "./Components/Bookings";
import Destinations from "./Components/Destinations";
import Navbar2 from "./Components/Navbar2";
import Accounts from "./Components/Accounts";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Admin public routes  */}
          <Route element={<AdminPublic />}>
            <Route path="/admin/signup" element={<AdminSignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>

          {/* Admin Protected Routes  */}
          <Route element={<AdminProtected />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproperty" element={<Addproperty />} />
            <Route path="/admin/viewproperties" element={<ViewProperties />} />
          </Route>

          {/* Public Login Signup Routes  */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          

          {/* Public accessible Pages  */}
          <Route path="/" element={<Home />} />
          <Route path="/propertydetails/:id" element={<GetProperty />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/help" element={<Help />} />
          <Route path='/destinations' element={<Destinations/>}/>
          <Route path="/nav2" element={<Navbar2/>}/>

          {/* User Protected Routes */}
          <Route element={<UserProtected />}>
            <Route path="/bookings" element={<Bookings/>} />
            <Route path='/account' element={<Accounts/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
