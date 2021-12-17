function Flake() {
    let size = Math.random()
    let style = {
        flake: {
            fontSize: size + "em"
        }
    }
    return (
        <div style={style.flake} className="snowflake">❆</div>
    )
}

export default function Snowflakes() {

    return (
        <div className="snowflakes" aria-hidden="true">
            <Flake/>
            <Flake/>
            <Flake/>
            <Flake/>
            <Flake/>
            <Flake/>
            <Flake/>
            <Flake/>
        </div>
    )
}