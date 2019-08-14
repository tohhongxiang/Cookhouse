import React from "react"
import {Link} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"

export default function Nav_() {
	return (
		<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
		  <Navbar.Brand className="brand"><Link to="/">Cookhouse Menu</Link></Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">
		    <Nav className="ml-auto link-list">
		      <Link to="/">Home</Link>
		      <Link to="/help">Help</Link>
		      <Link to="/about">About</Link>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>

		// <nav className="nav">
		// 	<Link to="/"><h1 className="logo"> Cookhouse Menu </h1></Link>
		// 	<ul className="link-list">
		// 		<Link to="/">
		// 			<li>Home</li>
		// 		</Link>
		// 		<Link to="/help">
		// 			<li>Help</li>
		// 		</Link>
		// 		<Link to="/about">
		// 			<li>About</li>
		// 		</Link>
		// 	</ul>
		// </nav>
		)
}