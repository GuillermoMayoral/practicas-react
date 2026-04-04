import { Link } from "react-router-dom";
import { useContext } from "react";
import { TranslationContext } from "../ReactDatos/Context/TranslationContext";


function Dashboard(props) {
    // suscribirse a TranslationContext
    const translation = useContext(TranslationContext);

    // mostrar el contenido de translations.em.greeting,
    // que ahora está disponible a través de translation.greeting
    return (
        <>
            <h1>Practicas</h1>
            <select onChange={props.onChange}>
                <option value="es">Español {props.theme === 'es' && '✅'}</option>
                <option value="en">Ingles {props.theme === 'en' && '✅'}</option>
                <option value="ru">Ruso {props.theme === 'ru' && '✅'}</option>
            </select>
            <h2>{translation.greeting} {props.user}</h2>
            <Link to="/profile">Ir a ver perfil (uso de Link y Outlet)</Link>
        </>
    );
}

export default Dashboard;