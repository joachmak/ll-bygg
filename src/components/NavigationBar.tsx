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
import {useEffect, useState} from "react";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useScrollSection } from "react-scroll-section";


const menuIconSize = 30; // Burger menu icon
const arrowIconSize = 40; // Right-arrow icon when hovering over menu element
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
            backgroundColor: "rgba(255,102,0,0.99)",
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
            cursor: "pointer",
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
            paddingLeft: 5,
            transition: "all 0.2s ease-in-out",
        },
        navigateIconExit: {
            opacity: 0,
            width: arrowIconSize,
            height: arrowIconSize,
            transition: "all 0.2s ease-in-out",
        },
        navigateIconMobile: {
            opacity: 0,
            width: 0,
            height: 0,
        }
    }),
);

function MenuItem(props:{reference:string, boldText:boolean, menuItem:string}) {
    const [width, setWidth] = useState<number>(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);
    let isMobile: boolean = (width <= 768);
    const classes = useStyles();
    let [hover, setHover] = useState(false);
    const headerSection = useScrollSection(props.reference);
    return (
        <>
            <Link onClick={headerSection.onClick} underline="none" className={classes.menuText} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                <NavigateNextIcon className={isMobile ? classes.navigateIconMobile : (hover ? classes.navigateIconHover : classes.navigateIconExit)} />
                <Typography variant={isMobile ? "h5" : "h4"}>
                    {
                        props.boldText ?
                            <b>{props.menuItem.toUpperCase()}</b> : props.menuItem.toUpperCase()
                    }
                </Typography>
            </Link>
        </>
    )
}

export default function NavigationBar(props:{menuItems:string[][]}) {
    const classes = useStyles();
    const boldText = false;
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleToggle = () => { // Toggle backdrop
        setOpenBackdrop(!openBackdrop);
    }
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
                        props.menuItems.map(menuItem =>
                            <MenuItem key={menuItem[0]} boldText={boldText} menuItem={menuItem[1]} reference={menuItem[0]} />
                        )
                    }
                </div>
            </Backdrop>
        </>
    )
}