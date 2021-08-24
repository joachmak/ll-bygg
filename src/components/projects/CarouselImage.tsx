import {CircularProgress, createStyles, makeStyles, Theme} from "@material-ui/core";
import {useEffect, useRef, useState} from "react";

interface CarouselImageProps {
    imgUrl: string;
}

export default function CarouselImage(this: any, props: CarouselImageProps) {
    const isMounted = useRef(false)

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false }
    }, []);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            image: {
                maxHeight: "90vh",
                maxWidth: "90vw",
                margin: "auto",
                alignSelf: "center",
            },
            imageContainer: {
                display: "flex",
                alignItems: "center",
            }
        }),
    );
    const classes = useStyles();
    let [isLoaded, setIsLoaded] = useState(false)
    let image = new Image()
    if (!isMounted.current) {
        image.onload = () => setIsLoaded(true)
    }
    image.src = props.imgUrl


    return (
        <div className={classes.imageContainer}>
            {
                isLoaded ?
                    <img
                        alt={"bilde"}
                        className={classes.image}
                        src={props.imgUrl}
                    />
                    :
                    <CircularProgress />
            }
        </div>
    )
}