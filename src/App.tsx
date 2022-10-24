import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/Sidebar";
import Client from "./pages/Client/Client";
import Home from "./pages/Home";
import Products from "./pages/Products/Products";
import Order from "./pages/Order/Order";
import History from "./pages/History/History";
import Contact from "./pages/Contact/Contact";
import User from "./pages/Login/User";
import classNames from "classnames";

const App: React.FunctionComponent = () => {
	const [close, setClose] = React.useState(false);
	const [login, setlogin] = React.useState<boolean>(true);
	const [user, setuser] = React.useState("");
	React.useEffect(() => {
		var email = localStorage.getItem("user");
		if (email) {
			setuser(email);
		}
	}, [user]);

	return (
		<div>
			{user ? (
				<Router>
					<Sidebar setuser={setuser} close={close} setClose={setClose} />
					<div
						className={classNames({
							sidebar: close,
						})}
					>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/client" element={<Client />} />
							<Route path="/products" element={<Products />} />
							<Route path="/order" element={<Order />} />
							<Route path="/history" element={<History />} />
							<Route path="/contact" element={<Contact />} />
						</Routes>
					</div>
				</Router>
			) : (
				<User login={login} setlogin={setlogin} setuser={setuser} />
			)}
		</div>
	);
};

export default App;
