import {Doc} from "typesaurus";
import {NewsDoc} from "../../types";
import AnnouncementAdmin from "./AnnouncementAdmin";
export default function NewsAdmin(props:{existingNewsDocs:Doc<NewsDoc>[]}) {
    return (
        <>
            {
                props.existingNewsDocs.map(announcement => <AnnouncementAdmin announcement={announcement} />)
            }
        </>
    )
}