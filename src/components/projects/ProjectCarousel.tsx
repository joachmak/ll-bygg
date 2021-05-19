import Carousel from 'react-material-ui-carousel'
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

interface carouselProps {
    imgUrls:string[]
}

export default function ProjectCarousel(props:carouselProps) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            image: {
                maxWidth: "90vw",
                maxHeight: "90vh",
                minWidth: "10vw",
                minHeight: "10vh",
            }
        }),
    );
    const classes = useStyles();

    return (
        <>
            {/*@ts-ignore*/}
            <Carousel
                navButtonsAlwaysVisible
                autoPlay={false}
                NextIcon={<NavigateNextIcon />}
                PrevIcon={<NavigateBeforeIcon />}
            >
            {
                props.imgUrls.map(imageUrl => <img alt={"bilde"} className={classes.image} src={imageUrl} />)
            }
            </Carousel>
        </>
    )
}