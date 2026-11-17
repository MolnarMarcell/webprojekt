import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

export default function Navbar() {
    return (
        <header className="site-nav">
            <div className="site-nav__inner">
                <NavLink className="site-nav__brand" to="/" aria-label="Webprojekt – kezdőlap">
                    <span className="site-nav__brand-mark" aria-hidden="true">
                        W
                    </span>
                    <span className="site-nav__brand-name">Webprojekt</span>
                </NavLink>
                <nav className="site-nav__links" aria-label="Fő navigáció">
                    <NavLink to="/" end>
                        Kezdőlap
                    </NavLink>
                    <NavLink to="/login">Bejelentkezés</NavLink>
                    <NavLink to="/register" className="site-nav__register">
                        Regisztráció
                    </NavLink>
                    <NavLink to="/user">Felhasználó</NavLink>
                    <NavLink to="/multiform">MultiForm</NavLink>
                    <NavLink to="/test">Teszt Form</NavLink>
                </nav>
            </div>
        </header>
    );
}
