import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import SignUp from "../Components/SignUp"
// import Login from './Login';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Products from './Components/Products';
import Navbar from './Components/Navbar';
function App() {
  

  return (
    
    <Router>
      <Navbar/>
<Routes>

<Route path="/" element={<Login />} />
<Route path="/signup" element={<SignUp />} />
<Route path="/products" element={<Products />} />
</Routes>
</Router>


    
  )
}

export default App
