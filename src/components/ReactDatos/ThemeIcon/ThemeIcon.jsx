function ThemeIcon(props) {
    return (
        <div className="icon">
            {props.theme === 'day' ? '🔆' : '🌙'}
        </div>
    )
}

export default ThemeIcon;