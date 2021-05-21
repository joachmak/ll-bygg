import {createStyles, makeStyles, Theme} from "@material-ui/core";

let img = require("./header.JPG")
let logoImg = require("./llbygg_redusert.png")
const darkness = 0.25 // Higher = darker

export default function Header() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            header: {
                height: "85vh",
                background: "linear-gradient( rgba(0, 0, 0, " + darkness + "), rgba(0, 0, 0, " + darkness + ") ), url('" + img.default + "')",
                backgroundAttachment: "fixed",
                backgroundSize: "cover",
                // @ts-ignore
                boxShadow: "inset 0 0 7em 1em #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            },
            typography: {
                color: "white",
                marginTop: 20,
            },
            imgBg: {
                backgroundColor: "rgba(0,0,0,0.5)",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
            }
        }),
    );
    const classes = useStyles()
    return (
        <div className={classes.header}>
            <img alt={"Header"} className={"headerAnim"} src={logoImg.default} height={200} />
        </div>
    )
}