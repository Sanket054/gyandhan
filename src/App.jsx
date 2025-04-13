import Navbar from "./Components/Navbar"
import AllRoutes from "./Routes/AllRoutes"

// export const SERVER = "http://localhost:3000"
export const SERVER = "https://server-gyandhan.onrender.com"

const App = () => {
	return (
		<div>
			<Navbar />
			<AllRoutes />
		</div>
	)
}

export default App