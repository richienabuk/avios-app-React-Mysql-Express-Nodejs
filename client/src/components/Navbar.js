import { Link } from "react-router-dom"
import { Navbar as BNavbar } from 'react-bootstrap'

export const Navbar = () => {
    return (
        <BNavbar bg="light" expand="lg" className="navbar navbar-expand-lg navbar-light bg-info">
            <div className="container">
            <Link to="/" className="navbar-brand">Avios</Link>
            <BNavbar.Toggle aria-controls="navbarNav" />
                <BNavbar.Collapse id="navbarNav" className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item active"><Link to="/" className="nav-link"> Products < /Link></li>
                    <li className="nav-item"><Link to="/cart" className="nav-link"> Cart </Link></li>
                    <li className="nav-item"><Link to="/admin" className="nav-link"> Admin </Link></li>
                </ul>
                </BNavbar.Collapse>
            </div>
        </BNavbar>
    )
}
