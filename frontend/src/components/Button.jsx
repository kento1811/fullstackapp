import "./Button.css"

export default function Button({onClick, children, type = "submit"}) {
    return (
        <button className="button" onClick = {onClick} type = {type}>
            {children}
        </button>
    )

}