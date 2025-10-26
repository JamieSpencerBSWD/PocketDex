import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import './navbar.scss';
import { Link, useNavigate } from "react-router-dom";

const NavBarx = ({ loggedInEmail, onLogout }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
    const searchFunc = async (e) => {
		e.preventDefault()
		navigate(`/search?query=${searchTerm}`)
    }
	const logout = () => {
		onLogout();
	};

	return (
		<div className='headerContainer'>
			<Link to="/">
				<p className='title text-size-large'>
				
				PocketDex
				</p>
			</Link>
			<Link to="/">
				Home
			</Link>
			<Link to="/relations">
				Damage Relations and Type Advantages
			</Link>
			<Form onSubmit={searchFunc} className="search-box">
				<Form.Control
					required
					type="search"
					placeholder="Search"
					className="me-2"
					aria-label="Search"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Button type="submit" className="button loginBtn">Search</Button>
			</Form>
		</div>
	);
};

export default NavBarx;
