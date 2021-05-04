import {AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';


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

        }
    }),
);

export default function NavigationBar() {
    const classes = useStyles();
    return (
        <>
            <AppBar className={classes.appbar} position="static">
                <Toolbar>
                    <div className={classes.menuIconBox}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <MenuIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    )
}