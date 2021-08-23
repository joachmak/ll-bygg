import {CircularProgress, createStyles, makeStyles, Theme} from "@material-ui/core";
import {useState} from "react";

interface CarouselImageProps {
    imgUrl: string;
}

export default function CarouselImage(props: CarouselImageProps) {
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
    image.src = props.imgUrl
    image.onload = () => setIsLoaded(true)

    return (
        <div className={classes.imageContainer}>
            {
                isLoaded ?
                    <img
                        alt={"bilde"}
                        className={classes.image}
                        src={props.imgUrl}
                        onLoad={() => setIsLoaded(true)}
                    />
                    :
                    <CircularProgress />
            }
        </div>
    )
}