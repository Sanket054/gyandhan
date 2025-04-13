import { createContext, useState } from "react"

export const ContextProvider = createContext();

const ContextAPI = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"))
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
	const [isAuth, setIsAuth] = useState(localStorage.getItem("token") ? true : false)
	return (
		<ContextProvider.Provider value={{ token, setToken, user, setUser, isAuth, setIsAuth }}>
			{children}
		</ContextProvider.Provider>
	)
}

export default ContextAPI
