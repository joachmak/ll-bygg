
type Employee = {
    name:string,
    role:string,
    description:string,
    priority:number,
    imgUrl:string,
}

type Project = {
    description:string,
    images:string[],
    thumbnail: string,
    title:string,
}

type AboutSection = {
    description:string,
    title:string,
}

type HeaderSection = {
    imgUrl:string,
}

type ServicesSection = {
    byggDesc: string,
    monteringDesc: string,
    rehabiliteringDesc: string,
}

type FooterSection = {
    address:string,
    countryCode:number,
    email:string,
    fbLink:string,
    igLink:string,
    phone:string,
    mapsUrl:string,
}

type NewsDoc = {
    title:string,
    description:string,
    datetime:Date,
}

export type {Employee, Project, AboutSection, HeaderSection, ServicesSection, NewsDoc, FooterSection}