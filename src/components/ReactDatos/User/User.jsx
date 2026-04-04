import { useState } from 'react';

function User(props) {
    const [nuevoNombre, setNuevoNombre] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que el form reinicie la página
        if (nuevoNombre.trim() !== "") {
            props.onUserChange(nuevoNombre); // "Sube" el estado al padre (App)
            setNuevoNombre(""); // Limpia el input
        }
    };
    return (
        <>
            <h1>Usuario</h1>
            <h2>{props.user}</h2>
            <form action="GET" onSubmit={handleSubmit}>
                <input type="text" placeholder="Escribe nuevo nombre..." onChange={(e) => setNuevoNombre(e.target.value)} />
                <button type="submit">cambiar</button>
            </form>
        </>
    )
}

export default User