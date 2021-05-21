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
                maxHeight: "90vh",
                maxWidth: "90vw",
                margin: "auto",
                alignSelf: "center",
            },
            imgContainer: {
                width: "90vw",
                height: "90vh",
                display: "flex",
            }
        }),
    );
    const classes = useStyles();

    return (
        <>
            {/*@ts-ignore*/}
            <Carousel
                navButtonsAlwaysVisible
                fullHeightHover={false}
                autoPlay={false}
                NextIcon={<NavigateNextIcon />}
                PrevIcon={<NavigateBeforeIcon />}
                /* @ts-ignore */
                navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                        backgroundColor: 'orange',
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        backgroundColor: 'darkorange',
                        color: "orange",
                    }
                }}
                buttonWrapper={
                    {
                        style: {
                            position: "absolute",
                            height: "150px",
                            backgroundColor: "orange",
                            top: "calc(50% - 70px)",
                            '&:hover': {
                                '& $button': {
                                    backgroundColor: "black",
                                    filter: "brightness(100%)",
                                    opacity: "1 !important"
                                }
                            }
                        }
                    }
                }
                button={{
                    style:{
                        position: "relative",
                        backgroundColor: "#494949",
                        top: "calc(50% - 20px) !important",
                        color: "white",
                        fontSize: "30px",
                        transition: "200ms",
                        cursor: "pointer",
                        '&:hover': {
                            opacity: "1 !important"
                        },
                    }
                }}
            >
            {
                props.imgUrls.map(imageUrl =>
                    <div key={imageUrl} className={classes.imgContainer}>
                        <img alt={"bilde"} className={classes.image} src={imageUrl} />
                    </div>
                    )
            }
            </Carousel>
        </>
    )
}