import {AppBar, Backdrop, createStyles, IconButton, makeStyles, Theme, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from "react";


const menuIconSize = 40;
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
            backgroundColor: "orange",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginTop: 10,

        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            backgroundColor: "rgba(255,102,0,0.8)",
        },
        icon: {
            width: menuIconSize,
            height: menuIconSize,
        },
    }),
);

export default function NavigationBar() {
    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleToggle = () => { // Toggle backdrop
        setOpenBackdrop(!openBackdrop);
    }
    return (
        <>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <div className={classes.menuIconBox}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleToggle}>
                                <MenuIcon className={classes.icon} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleToggle}>
                <h1>MENYKNAPPER VIL VISES HER</h1>
            </Backdrop>
        </>
    )
}