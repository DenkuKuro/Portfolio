import type { StaticImageData } from "next/image";

export type Section = {
    id: string;          // route segment, e.g. "about-me"
    title: string;       // menu + tab label
    heading: string;     // big title on the section screen
    description: string; // route metadata description
};

export type StatRow = { label: string; value: string };

export type Profile = {
    name: string;
    firstName: string;
    lastName: string;
    welcome: string;
    copyright: string;
    portraitAlt: string;
    quote: string;
    status: StatRow[];
    lore: string[];
    resume: string;
};

export type Experience = {
    title: string;
    company: string;
    location: string;
    date: string;
    current?: boolean;   // lights the timeline node + "Now"
    description: string[];
};

export type Project = {
    slug: string;        // used in ?item=
    short: string;       // slot label
    title: string;
    type: string;
    status: string;
    description: string;
    tech: string[];
    link?: string;       // source
    details?: string;
    image?: StaticImageData;
};

export type SkillSchool = {
    id: "frontend" | "backend" | "devtools";
    title: string;
    skills: string[];
};

export type ContactLink = {
    kind: "email" | "linkedin" | "github" | "instagram" | "location";
    label: string;
    value: string;
    href?: string;
};
