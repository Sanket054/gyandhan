import { Route, Routes } from "react-router-dom"
import Home from "../Pages/Home"
import Login from "../Components/Login"
import Signup from "../Components/Signup"
import AddTodo from "../Components/AddTodo"

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/Signup" element={<Signup />} />
			<Route path="/add" element={<AddTodo />} />
		</Routes>
	)
}

export default AllRoutes