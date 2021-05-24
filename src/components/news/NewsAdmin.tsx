import {Doc} from "typesaurus";
import {NewsDoc} from "../../types";
import AnnouncementAdmin from "./AnnouncementAdmin";
import CreateAnnouncementAdmin from "./CreateAnnouncementAdmin";
export default function NewsAdmin(props:{existingNewsDocs:Doc<NewsDoc>[]}) {
    console.log("NewsAdmin: ")
    console.log(props.existingNewsDocs)
    return (
        <>
            <CreateAnnouncementAdmin />
            {
                props.existingNewsDocs
                    // @ts-ignore
                    .sort((a,b) => b.data.datetime - a.data.datetime)
                    .map(announcement => <AnnouncementAdmin key={announcement.ref.id} announcement={announcement} />)
            }
        </>
    )
}