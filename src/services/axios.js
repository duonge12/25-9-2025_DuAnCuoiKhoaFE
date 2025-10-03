import axios from "axios";

const instance = axios.create({
	baseURL: "https://elearningnew.cybersoft.edu.vn/api",
	headers: {
		TokenCybersoft: import.meta.env.VITE_TOKEN_CYBERSOFT,
	},
});
export default instance;
