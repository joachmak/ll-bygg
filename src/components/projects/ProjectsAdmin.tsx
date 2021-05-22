import {Container, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";

interface projectObj {
    key: number;
    imgUrl: string;
    description: string;
    images: string[];
    title: string;
}

export default function ProjectsAdmin(props: {margin:number}) {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            container: {
                display: "flex",
                justifyContent: "center",
                margin: props.margin + "px auto",
                textAlign: "left",
            },
            title: {
                marginBottom: 15,
            }
        }),
    );
    const classes = useStyles();

    let projects:projectObj[] = [
        {key: 1, title: "Bygging av hytte", imgUrl:"https://i2.wp.com/www.homesteadbuildingsystemsinc.com/wp-content/uploads/2016/09/Project-Manager-Walking-through-Framed-House.jpg?fit=1920%2C1080&ssl=1", description:"", images:["https://www.thespruce.com/thmb/TIUYmTRJ3NOFnY9LJ6FzMd_9oBc=/2571x1928/smart/filters:no_upscale()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg", "https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg", "https://static.toiimg.com/thumb/68007187/garden.jpg?width=1200&height=900"]},
        {key: 2, title: "Måling av ting", imgUrl:"https://media.istockphoto.com/photos/carpenter-working-with-equipment-on-wooden-table-in-carpentry-shop-picture-id1147804793?k=6&m=1147804793&s=612x612&w=0&h=dB2GkD3p9cz-icf56LGcKQZggtUA4Rp_KU5WxKMfFfM=", description:"", images:["", ""]},
        {key: 3, title: "Prosjekt med tresag", imgUrl:"https://www.careersinconstruction.ca/sites/default/files/styles/career_banner/public/images/careers/4841_stone_farmhouse_reno_8x12_low_0.jpg?itok=VJi18X5T", description:"", images:["", "", "", "", "", ""]},
        {key: 4, title: "Stol-prosjekt", imgUrl:"https://www.homestratosphere.com/wp-content/uploads/2019/12/wooden-chair-woodworker-dec142019-min.jpg", description:"", images:["", "", ""]}];
    return (
        <>
            <Container className={classes.container}>
                <Grid item lg={8} md={10} xs={12}>
                    <Typography variant={"h4"} className={classes.title}>Våre prosjekter</Typography>
                    {
                        projects.map(project =>
                            <>
                                ProjectsAdmin project title {project.title} <br />
                            </>
                        )
                    }
                </Grid>
            </Container>
        </>
    )
}