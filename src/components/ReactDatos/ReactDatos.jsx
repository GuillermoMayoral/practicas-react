import { Link, Outlet } from "react-router-dom";

function ReactDatos() {
    return (
        <>
            <h1>Ract Datos</h1>
            <h2>Practicas sobre el sprint 15 de react (React datos)</h2>
            <Link to="ThemeSelect">Levantando el estado(ThemeSelect)
            </Link>
            <Link to="ThemeIcon">Icono del estado levantado(ThemeIcon)
            </Link>
            <Outlet />
        </>
    );
}

export default ReactDatos;