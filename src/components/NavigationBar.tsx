import {AppBar, Backdrop, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
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
            //backgroundColor: "orange",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginTop: 10,

        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
            backgroundColor: "rgba(255,102,0,0.9)",
        },
        icon: {
            width: menuIconSize,
            height: menuIconSize,
        },
        menuText: {
            textShadow: "0px 3px 4px rgba(0,0,0,0.4)",
            flex: 1,
        },
        menuTextContainer: {
            display: "flex",
            flexDirection: "column",
            minHeight: "70vh",
        }
    }),
);

export default function NavigationBar() {
    const classes = useStyles();
    const boldText = false;
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const handleToggle = () => { // Toggle backdrop
        setOpenBackdrop(!openBackdrop);
    }
    const menuItems:string[] = ["hjem", "om oss", "våre tjenester", "våre prosjekter", "kontakt oss", "våre ansatte"]
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
                <div className={classes.menuTextContainer}>
                    {
                        menuItems.map(menuItem =>
                            <Typography variant={"h3"} className={classes.menuText}>
                                {
                                    boldText ?
                                        <b>{menuItem.toUpperCase()}</b> : menuItem.toUpperCase()
                                }
                            </Typography>
                        )
                    }
                </div>
            </Backdrop>
        </>
    )
}