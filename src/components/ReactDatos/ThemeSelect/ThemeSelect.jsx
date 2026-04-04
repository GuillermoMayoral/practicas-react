function ThemeSelect(props) {
    return (
        <>
            <h2>En este ejemplo levantaremos el estado de cambiar el tema de dia a claro</h2>
            <select onChange={props.onChange}>
                <option value="day">Día {props.theme === 'day' && '✅'}</option>
                <option value="night">Noche {props.theme === 'night' && '✅'}</option>
            </select>
        </>
    );
}

export default ThemeSelect;