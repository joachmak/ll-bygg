import {Doc} from "typesaurus";
import {NewsDoc} from "../../types";
import AnnouncementAdmin from "./AnnouncementAdmin";
import CreateAnnouncementAdmin from "./CreateAnnouncementAdmin";
import {Grid, Typography} from "@material-ui/core";
export default function NewsAdmin(props:{existingNewsDocs:Doc<NewsDoc>[]}) {
    return (
        <>
            <Grid container>
                <Typography variant={"h5"} color={"textSecondary"}>Publiser nyhet</Typography>
                <CreateAnnouncementAdmin />
                <Typography variant={"h5"} color={"textSecondary"}>Rediger nyheter</Typography>
                <br />
                {
                    props.existingNewsDocs
                        // @ts-ignore
                        .sort((a,b) => b.data.datetime - a.data.datetime)
                        .map(announcement => <AnnouncementAdmin key={announcement.ref.id} announcement={announcement} />)
                }
            </Grid>
        </>
    )
}