import { NavLink } from "react-router-dom";
import './NavBar.css';

function NavBar(props) {
    const customClassName = ({ isActive }) => {
        return "menu__link" + (isActive ? " menu__link_active" : "");
    };

    return (
        <>
            <nav>
                <NavLink className={customClassName} to="/">
                    Inicio
                </NavLink>
                <NavLink className={customClassName} to="/react-datos">
                    React y datos
                </NavLink>
                <NavLink className={customClassName} to="/User">Usuario</NavLink>
            </nav>
            <h3>{props.user}</h3>
        </>
    );
}

export default NavBar;