import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../App";

const Signup = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		try {
			const res = await axios.post(`${SERVER}/user/reg`, { name, email, password });
			console.log(res);

			if (res.status === 200) {
				setMessage("Signup successful! Redirecting to login...");
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			}
		} catch (error) {
			setMessage("Signup failed. Please try again.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Create an Account</h2>

				{message && <p className="text-center text-sm text-blue-600">{message}</p>}

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Name Input */}
					<div>
						<label className="block text-gray-600 mb-1">Name</label>
						<input
							type="text"
							value={name}
							placeholder="Enter your name"
							onChange={(e) => setName(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					{/* Email Input */}
					<div>
						<label className="block text-gray-600 mb-1">Email</label>
						<input
							type="email"
							value={email}
							placeholder="Enter your email"
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					{/* Password Input */}
					<div>
						<label className="block text-gray-600 mb-1">Password</label>
						<input
							type="password"
							value={password}
							placeholder="Enter your password"
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					{/* Signup Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
						disabled={loading}
					>
						{loading ? "Signing up..." : "Sign Up"}
					</button>
				</form>

				<p className="text-center mt-4 text-gray-600">
					Already have an account?{" "}
					<a href="/login" className="text-blue-500 hover:underline">Login</a>
				</p>
			</div>
		</div>
	);
};

export default Signup;
