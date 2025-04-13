import { useContext, useEffect, useState } from "react"
import { ContextProvider } from "../Context/ContextAPI"
import axios from "axios";
import TodoCard from "./TodoCard";
import { SERVER } from "../App";

const AllTodos = ({ filterValue, sortValue }) => {
	console.log(filterValue)
	const { token } = useContext(ContextProvider);
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false)
	console.log(data)
	const fetchData = async () => {
		setIsLoading(true)
		try {
			const res = await axios.get(`${SERVER}/todo/all?priority=${filterValue}&sort=${sortValue}`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			console.log(res)
			setData(res.data.todo);
			setIsLoading(false)
		} catch (error) {
			console.log(error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [filterValue, sortValue])

	if (isLoading) {
		return (
			<div className="text-center flex flex-col gap-2 justify-center items-center h-screen font-bold text-2xl">
				Loading...
				<p className="text-sm text-red-600"><span className="text-black">Please note:</span> The backend for this site is deployed on Render.com, which may take some time to respond. Typically, it takes less than 3 to 4 minutes. Kindly wait for the server's response. </p>
			</div>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{data.length === 0 ? <div className="flex justify-center items-center h-screen font-bold text-2xl">No Tasks or need to login</div> :
				data.map((item) => {
					return (
						<TodoCard key={item._id} item={item} fetchData={fetchData} />
					)
				})
			}
		</div>
	)
}

export default AllTodos