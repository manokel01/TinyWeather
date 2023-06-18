/**
 * Header component represents the top section of the application.
 */
export default function Header() {
    return (
        // Top section of the application
        <div className="header">
            {/* Logo */}
            <img src="" alt="" className="logo" />
            {/* Title */}
            <h1 className="header--title">TinyWeather app</h1>
            {/* Slogan */}
            <h4 className="header--slogan">Machine Learning farm monitoring.</h4>
        </div>
    )
}
