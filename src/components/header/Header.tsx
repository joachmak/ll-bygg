import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {HeaderSection} from "../../types";
import {collection} from "typesaurus";
import {useGet} from "@typesaurus/react";

let logoImg = require("./llbygg_redusert.png")
const darkness = 0.25 // Higher = darker

export default function Header(props:{isMobile:boolean, isIpad:boolean, lowHeight:boolean, setIsHeaderLoaded:React.Dispatch<React.SetStateAction<boolean>>}) {
    const pageElem = collection("pageElements")
    let [img] = useGet<HeaderSection>(pageElem, "header")
    let image = new Image()
    image.onload = () => props.setIsHeaderLoaded(true)
    image.src = img ? img.data.imgUrl : ""
    let isIOS = window.navigator.userAgent.indexOf("Mac") !== -1
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            header: {
                height: "85vh",
                background: "linear-gradient( rgba(0, 0, 0, " + darkness + "), rgba(0, 0, 0, " + darkness + ") ), url('" + (img ? img.data!.imgUrl : "") + "')",
                backgroundAttachment: ((props.isIpad || props.isMobile) && isIOS) ? "scroll" : "fixed",
                backgroundSize: "cover",
                backgroundPosition: "center",
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
            },
            waves: {
                position: "absolute",
                bottom: props.isIpad ? "7em" : "2em",
                zIndex: 0,
                display: props.isMobile || props.lowHeight ? "none" : "default",
            },
            rect: {
                backgroundColor: "white",
                width: "100%",
                height: 100,
                position: "absolute",
                bottom: 20,
                display: props.isMobile || props.lowHeight ? "none" : "default",
            }
        }),
    );
    const classes = useStyles()
    return (
        <>
            <div className={classes.header}>
                <img alt={"Header"} className={"headerAnim"} src={logoImg.default} height={props.isMobile ? 100 : 200} />
                <svg className={classes.waves} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" fillOpacity="1" d="M0,128L80,138.7C160,149,320,171,480,165.3C640,160,800,128,960,117.3C1120,107,1280,117,1360,122.7L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
                </svg>
                <div className={classes.rect} />
            </div>
        </>
    )
}