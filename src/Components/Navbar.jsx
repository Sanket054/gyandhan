import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from "../Context/ContextAPI";

const Navbar = () => {
	const navigate = useNavigate();
	const { isAuth, setToken, user, setIsAuth } = useContext(ContextProvider);

	return (
		<nav className="w-full bg-gray-800 text-white shadow-md">
			<div className="container mx-auto flex justify-between items-center py-4 px-6">
				<Link to="/" className="text-2xl font-bold text-white hover:text-gray-300 transition">
					Todo App
				</Link>

				<ul className="flex items-center space-x-6">
					{!isAuth ? (
						<>
							<li>
								<Link to="/login" className="hover:text-gray-300 transition bg-blue-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">Login</Link>
							</li>
							<li>
								<Link to="/signup" className="hover:text-gray-300 transition bg-blue-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">Signup</Link>
							</li>
						</>
					) : (
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-lg">
								{user.name && <span className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
									{user.name?.charAt(0).toUpperCase()}
								</span>}
								{user.name && <span className="hidden md:block text-sm font-medium">{user.name}</span>}
							</div>

							<button
								onClick={() => {
									localStorage.clear();
									setIsAuth(false);
									setToken("");
									window.location.reload();
									navigate("/login");
								}}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
							>
								Logout
							</button>
						</div>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
