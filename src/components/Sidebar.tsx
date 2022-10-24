import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as FaIcons from "react-icons/fa";

import { SidebarData } from "./SidebarData";
import { Button } from "react-bootstrap";

const Navbar = styled.div`
	display: flex;
	justify-content: start;
	align-items: center;
	height: 3.5rem;
	background-color: #99f3f9;
`;

const MenuIconOpen = styled(Link)`
	display: flex;
	justify-content: start;
	font-size: 1.5rem;
	margin-left: 2rem;
	color: #122878;
`;

const MenuIconClose = styled(Link)`
	display: flex;
	justify-content: end;
	font-size: 1.5rem;
	margin-top: 0.75rem;
	margin-right: 1rem;
	color: #122878;
`;

const SidebarMenu = styled.div<{ close: boolean }>`
	width: 250px;
	height: 100vh;
	background-color: #99f3f9;
	position: fixed;
	top: 0;
	left: ${({ close }) => (close ? "0" : "-100%")};
	transition: 0.6s;
`;

const MenuItems = styled.li`
	list-style: none;
	display: flex;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 90px;
	padding: 1rem 0 1.25rem;
`;

const MenuItemLinks = styled(Link)`
	display: flex;
	align-items: center;
	padding: 0 2rem;
	font-size: 20px;
	text-decoration: none;
	color: #100a53;

	&:hover {
		background-color: #397bff;
		color: #fff;
		width: 100%;
		height: 45px;
		text-align: center;
		border-radius: 5px;
		margin: 0 2rem;
	}
`;

type logintype = {
	setuser: Function;
	close: boolean;
	setClose: Function;
};

function Sidebar({ setuser, close, setClose }: logintype) {
	const navigate = useNavigate();

	const showSidebar = () => setClose(!close);

	return (
		<>
			<Navbar className="d-flex justify-content-between">
				<MenuIconOpen
					to="#"
					onClick={showSidebar}
					style={{ marginLeft: "80px" }}
				>
					<FaIcons.FaBars />
				</MenuIconOpen>
				<Button
					style={{ marginRight: "35px" }}
					className=" btn btn-primary btn-rounded"
					onClick={(e: any) => {
						localStorage.removeItem("user");
						localStorage.removeItem("user_id");
						setuser(""); // revenir vers login
						navigate("/"); // path vers Login
					}}
				>
					Déconnexion
				</Button>
			</Navbar>

			<SidebarMenu close={close}>
				<MenuIconClose to="#" onClick={showSidebar}>
					<FaIcons.FaTimes />
				</MenuIconClose>

				{SidebarData.map((item, index) => {
					return (
						<MenuItems key={index}>
							<MenuItemLinks to={item.path}>
								{item.icon}
								<span style={{ marginLeft: "16px" }}>{item.title}</span>
							</MenuItemLinks>
						</MenuItems>
					);
				})}
			</SidebarMenu>
		</>
	);
}

export default Sidebar;
