import {Doc} from "typesaurus";
import {NewsDoc} from "../../types";
import AnnouncementAdmin from "./AnnouncementAdmin";
export default function NewsAdmin(props:{existingNewsDocs:Doc<NewsDoc>[]}) {
    return (
        <>
            {
                props.existingNewsDocs
                    // @ts-ignore
                    .sort((a,b) => b.data.datetime - a.data.datetime)
                    .map(announcement => <AnnouncementAdmin announcement={announcement} />)
            }
        </>
    )
}