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

	const colors = [
  "#A8A878", // normal
  "#F08030", // fire
  "#6890F0", // water
  "#F8D030", // electric
  "#78C850", // grass
  "#98D8D8", // ice
  "#C03028", // fighting
  "#A040A0", // poison
  "#E0C068", // ground
  "#A890F0", // flying
  "#F85888", // psychic
  "#A8B820", // bug
  "#B8A038", // rock
  "#705898", // ghost
  "#7038F8", // dragon
  "#705848", // dark
  "#B8B8D0", // steel
  "#F0B6BC", // fairy
  "#35ACE7", // stellar
];

	return (
		<div className='headerContainer'>
			<Link to="/">
				<p className='title text-size-large'>
				
				PocketDex
				</p>
			</Link>
			<Link to="/" style={{fontSize:'20px'}}>
				Pokemon
			</Link>
			<Link to="/moves" style={{fontSize:'20px'}}>
				Moves
			</Link>
			<Link to="/relations" style={{fontSize:'20px'}}>
				Damage Relations
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
				<Button type="submit" className="button loginBtn" style={{border: 'none',
					backgroundColor: colors[Math.floor(Math.random() * colors.length)]
					}}
				>Search</Button>
			</Form>
		</div>
	);
};

export default NavBarx;
