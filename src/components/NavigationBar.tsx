import {
    AppBar,
    Backdrop,
    createStyles,
    IconButton,
    Link,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from "react";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


const menuIconSize = 40; // Burger menu icon
const arrowIconSize = 60; // Right-arrow icon when hovering over menu element
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            margin: "auto",
        },
        appbar: {
            background: "transparent",
            boxShadow: "none",
            position: "static",
            height: 0,
        },
        menuIconBox: {
            //backgroundColor: "orange",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginTop: 20,
            color: "white",
            backgroundColor: "rgba(255,140,0,0.8)",
            position: "fixed",
            zIndex: 1,
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            backgroundColor: "rgba(255,102,0,0.93)",
        },
        icon: {
            width: menuIconSize,
            height: menuIconSize,
        },
        menuText: {
            flex: 1,
            color: "white",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        menuTextContainer: {
            display: "flex",
            flexDirection: "column",
            minHeight: "70vh",
        },
        navigateIconHover: {
            opacity: 1,
            width: arrowIconSize,
            height: arrowIconSize,
            marginLeft: 5,
            transition: "all 0.2s ease-in-out",
        },
        navigateIconExit: {
            opacity: 0,
            width: arrowIconSize,
            height: arrowIconSize,
            transition: "all 0.2s ease-in-out",
        }
    }),
);

function MenuItem(props:{boldText:boolean, menuItem:string}) {
    const classes = useStyles();
    let [hover, setHover] = useState(false);
    return (
        <>
            <Link underline="none" className={classes.menuText} href={"#"} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                <NavigateNextIcon className={hover ? classes.navigateIconHover : classes.navigateIconExit} />
                <Typography variant={"h3"}>
                    {
                        props.boldText ?
                            <b>{props.menuItem.toUpperCase()}</b> : props.menuItem.toUpperCase()
                    }
                </Typography>
            </Link>
        </>
    )
}

export default function NavigationBar() {
    const classes = useStyles();
    const boldText = false;
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleToggle = () => { // Toggle backdrop
        setOpenBackdrop(!openBackdrop);
    }
    const menuItems = ["hjem", "våre tjenester", "om oss", "våre prosjekter", "kontakt oss"]
    return (
        <>
            <AppBar position={"fixed"} className={classes.appbar}>
                <Toolbar>
                    <div className={classes.menuIconBox}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleToggle}>
                                <MenuIcon className={classes.icon} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleToggle}>
                <div className={classes.menuTextContainer}>
                    {
                        menuItems.map(menuItem =>
                            <MenuItem boldText={boldText} menuItem={menuItem} />
                        )
                    }
                </div>
            </Backdrop>
        </>
    )
}