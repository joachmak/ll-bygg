import {Doc} from "typesaurus";
import {NewsDoc} from "../../types";
import AnnouncementAdmin from "./AnnouncementAdmin";
import CreateAnnouncementAdmin from "./CreateAnnouncementAdmin";
import {Typography} from "@material-ui/core";
export default function NewsAdmin(props:{existingNewsDocs:Doc<NewsDoc>[]}) {
    return (
        <>
            <Typography variant={"h5"} color={"textSecondary"}>Publiser nyhet</Typography>
            <CreateAnnouncementAdmin />
            <Typography variant={"h5"} color={"textSecondary"}>Rediger nyheter</Typography>
            {
                props.existingNewsDocs
                    // @ts-ignore
                    .sort((a,b) => b.data.datetime - a.data.datetime)
                    .map(announcement => <AnnouncementAdmin key={announcement.ref.id} announcement={announcement} />)
            }
        </>
    )
}