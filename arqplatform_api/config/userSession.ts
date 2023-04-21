import session from "express-session";
import store from "express-mysql-session";

export default function userSession() { // @ts-ignore
	const MySQLStore = store(session);
	
	return session({
		secret: process.env.SESSION_SECRET || "default_secret",
		resave: false,
		saveUninitialized: false,
		store: new MySQLStore({
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT || "3306", 10),
			user: process.env.DB_USER,
			password: "",
			database: process.env.DB_NAME
		})
	})
}