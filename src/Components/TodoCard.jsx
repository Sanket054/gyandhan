import axios from "axios";
import { SERVER } from "../App";
import { useContext, useState } from "react";
import { ContextProvider } from "../Context/ContextAPI";

const TodoCard = ({ item, fetchData }) => {
	const { token } = useContext(ContextProvider);
	const [updater, setUpdater] = useState(false);
	const [title, setTitle] = useState(item.title);
	const [priority, setPriority] = useState(item.priority);
	const [isCompleted, setIsCompleted] = useState(item.isCompleted);

	console.log(isCompleted, "2")

	const deleteTodo = async () => {
		try {
			const res = await axios.delete(`${SERVER}/todo/delete/${item._id}`, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (res.status === 200) fetchData();
		} catch (error) {
			console.log(error);
		}
	};

	const updateTodo = async () => {
		try {
			const res = await axios.patch(`${SERVER}/todo/${item._id}`, { title, priority, isCompleted }, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (res.status === 200) {
				setUpdater(false);
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div
				className="bg-white shadow-md rounded-lg p-4 border-l-4 transition-all duration-300 hover:shadow-lg"
				style={{
					borderColor:
						item.priority === "High"
							? "red"
							: item.priority === "Medium"
								? "orange"
								: "green"
				}}
			>
				<h1 className={`text-xl font-bold ${item.isCompleted ? "line-through text-gray-500" : "text-gray-900"}`}>
					{item.title}
				</h1>

				<p className="text-sm text-gray-600">
					Priority:
					<span
						className={`font-semibold ml-1 ${item.priority === "High"
							? "text-red-600"
							: item.priority === "Medium"
								? "text-orange-600"
								: "text-green-600"
							}`}
					>
						{item.priority}
					</span>
				</p>

				<button className="text-sm mt-1">
					Status:
					<span className={`font-semibold ml-1 ${item.isCompleted ? "text-green-600" : "text-red-600"}`}>
						{item.isCompleted ? "Completed" : "Pending"}
					</span>
				</button>

				<div className="mt-4 flex gap-3">
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
						onClick={() => setUpdater(true)}
					>
						Update
					</button>
					<button
						className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
						onClick={deleteTodo}
					>
						Delete
					</button>
				</div>
			</div>

			{updater && (
				<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white shadow-md rounded-lg p-4">
						<h1 className="text-xl font-bold">Edit Todo</h1>
						<div className="mt-4">
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="border border-gray-300 rounded-md px-3 py-2 w-full"
							/>
						</div>
						<div className="mt-4">
							<select
								value={priority}
								onChange={(e) => setPriority(e.target.value)}
								className="border border-gray-300 rounded-md px-3 py-2 w-full"
							>
								<option value="low">Low</option>
								<option value="medium">Medium</option>
								<option value="high">High</option>
							</select>
						</div>
						<div className="mt-4">
							<select
								value={isCompleted}
								onChange={(e) => setIsCompleted(e.target.value)}
								className="border border-gray-300 rounded-md px-3 py-2 w-full"
							>
								<option value="false">Pending</option>
								<option value="true">Completed</option>
							</select>
						</div>


						<div className="mt-4 flex gap-3">
							<button
								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
								onClick={updateTodo}
							>
								Save
							</button>
							<button
								className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
								onClick={() => setUpdater(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TodoCard;
