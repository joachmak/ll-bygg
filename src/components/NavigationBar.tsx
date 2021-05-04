import {AppBar, Backdrop, createStyles, IconButton, makeStyles, Theme, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {useState} from "react";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuButton: {
            margin: "auto",
        },
        appbar: {
            background: "transparent",
            boxShadow: "none",
        },
        menuIconBox: {
            backgroundColor: "orange",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            borderRadius: 5,
            marginTop: 10,

        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

export default function NavigationBar() {
    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleToggle = () => {
        setOpenBackdrop(!openBackdrop);
    }
    return (
        <>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <div className={classes.menuIconBox}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleToggle}>
                                <MenuIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleToggle}>
                Test
            </Backdrop>
        </>
    )
}