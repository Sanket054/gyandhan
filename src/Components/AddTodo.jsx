import { useContext, useState } from "react";
import { ContextProvider } from "../Context/ContextAPI";
import axios from "axios";
import { SERVER } from "../App";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
	const { isAuth, token, user } = useContext(ContextProvider);

	console.log(isAuth, token, user)

	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState("low");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!title.trim()) {
			setError("Title is required!");
			return;
		}

		setLoading(true);
		setError("");

		try {
			const res = await axios.post(`${SERVER}/todo/add`, { title, priority }, {
				headers: {
					Authorization: `Bearer ${token}`,
				}
			});
			if (res.status === 200) {

				setTitle("");
				setPriority("low");
				setTimeout(() => {
					navigate("/")
				}, 2000)
			}
		} catch (err) {
			console.log(err)
			setError(err.response?.data?.message || "Something went wrong");
		} finally {
			setLoading(false);
		}
	};


	return (
		<div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
			<h2 className="text-xl font-bold text-gray-800 mb-4">Add New Todo</h2>

			{error && <p className="text-red-600 text-sm mb-3">{error}</p>}

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">

				<input
					type="text"
					placeholder="Enter todo title..."
					className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>


				<select
					className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					value={priority}
					onChange={(e) => setPriority(e.target.value)}
				>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>


				<button
					type="submit"
					className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
					disabled={loading}
				>
					{loading ? "Adding..." : "Add Todo"}
				</button>
			</form>
		</div>
	);
};

export default AddTodo;
