import { Link, Outlet, useNavigate } from "react-router-dom";


function Profile() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Uso de Link, Outlet y Navigate(botones)</h1>
            <ul>
                <li>
                    <Link to="profile1">Perfil No. 1</Link>
                </li>
                <li>
                    <Link to="profile2">Perfil No. 2</Link>
                </li>
            </ul>
            <button onClick={() => navigate("/")}>Volver al inicio</button>
            <button onClick={() => navigate(-1)}>Volver al atras</button>
            <Outlet />
        </>
    )
}

export default Profile;