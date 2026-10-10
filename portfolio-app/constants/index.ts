import { blog, SpikeConnect,
    python,
    javascript,
    cpp,
    c,
    nodejs,
    react,
    bootstrap,
    html,
    css,
    jquery,
    tailwind,
    express,
    easyChart,
    docker,
 } from "../public";
import type { ContactLink, Experience, Profile, Project, Section, SkillSchool } from "./types";

export type * from "./types";

// Single source of the menu order: title menu, nav tabs, chapter numbers and ←/→ cycling all read from this.
export const sections: Section[] = [
    {
        id: "about-me",
        title: "About",
        heading: "About",
        description: "Who I am, where I come from and what I am working towards.",
    },
    {
        id: "skills",
        title: "Skills",
        heading: "Skills",
        description: "The languages, frameworks and tools I work with.",
    },
    {
        id: "projects",
        title: "Projects",
        heading: "Projects",
        description: "Things I have built, from full-stack web apps to systems programming.",
    },
    {
        id: "experience",
        title: "Experience",
        heading: "Experience",
        description: "Where I have worked and what I shipped there.",
    },
    {
        id: "contact",
        title: "Contact",
        heading: "Contact",
        description: "Send me a message or find me on LinkedIn and GitHub.",
    },
];

export const profile: Profile = {
    name: "Javier Deng Xu",
    firstName: "Javier",
    lastName: "Deng Xu",
    welcome: "Welcome to my journey.",
    copyright: "© 2026 Javier Deng Xu",
    portraitAlt: "Portrait of Javier Deng Xu",
    quote: "“What is the meaning of 'strength'? It's to have a mind that does not sway, while continuing to move forward and charge.” ― Takehiko Inoue, vagabond volume 36",
    status: [
        { label: "Class", value: "Software Engineer" },
        { label: "Origin", value: "Burnaby - BC" },
        { label: "Education", value: "Simon Fraser University - Computer Science" },
        { label: "Current Status", value: "Software Engineer Intern at WSP" },
    ],
    lore: [
        "I'm motivated to build reliable systems and solutions that solve small to big problems.",
    ],
    resume: "./JavierResume.pdf",
};

export const contactLinks: ContactLink[] = [
    {
        kind: "email",
        label: "Email",
        value: "javier.deng17@gmail.com",
        href: "mailto:javier.deng17@gmail.com",
    },
    {
        kind: "linkedin",
        label: "LinkedIn",
        value: "in/javier-deng-65b000284",
        href: "https://www.linkedin.com/in/javier-deng-65b000284",
    },
    {
        kind: "github",
        label: "GitHub",
        value: "DenkuKuro",
        href: "https://github.com/DenkuKuro",
    },
    {
        kind: "location",
        label: "Location",
        value: "Vancouver, BC",
    },
];

export const contactCopy = {
    label: "Summon Me",
    availability: "Open to internships and new-grad roles.",
    replyNote: "I usually reply within two days.",
    sentTitle: "Message Sent",
    sentBody: "Your sign has been left. Safe travels.",
};

export const projects: Project[] = [
    {
        slug: "sfu-course-compass",
        short: "Course Compass",
        title: "SFU Course Compass",
        type: "Full-Stack web app",
        status: "Completed",
        description: "SFU Course review website to help students understand courses they are interested in taking and help them make decisions about their course plan.",
        link: "https://github.com/DenkuKuro/SFU-Course-Compass",
        image: blog,
        tech: ["React", "Spring Boot", "AWS EC2", "AWS RDS (PostgreSQL)", "Docker"],
    },
    {
        slug: "ganpi",
        short: "GANPI",
        title: "GANPI",
        type: "Systems programming",
        status: "Completed",
        description: "GANPI is a revolutionary CLI tool that converts natural language commands into precise shell commands using Google's Gemini AI. Hackathon Winner",
        link: "https://github.com/chdrPE/GANPI",
        tech: ["C++", "Google Gemini API", "System Programming"],
    },
    {
        slug: "spikeconnect",
        short: "SpikeConnect",
        title: "SpikeConnect",
        type: "Mobile app",
        status: "Completed",
        description: "Volleyball social media app that connects volleybal enthusiasts around vancouver. Hackathon Winner",
        link: "https://github.com/rsg28/Spike-Connect",
        image: SpikeConnect,
        tech: ["JavaScript", "React Native", "Python", "HTML/CSS", "Selenium", "Beautiful Soup"],
    },
    {
        slug: "easychart",
        short: "EasyChart",
        title: "EasyChart",
        type: "Full-stack web app",
        status: "Completed",
        description: "EasyChart is a website that provides a simple way for users to visualize data, without having to learn complex tools.]",
        link: "https://github.com/CMPT-276-SUMMER-2025/final-project-5-lakes",
        image: easyChart,
        tech: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Express.js", "DeepSeek API"],
    },
];

export const skills: SkillSchool[] = [
    {
        id: "frontend",
        title: "Front-End",
        skills: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
        id: "backend",
        title: "Back-End",
        skills: ["Node.js", "Express JS", "NestJS", "Python", "C/C++", "PostgreSQL", "Prisma ORM"],
    },
    {
        id: "devtools",
        title: "Dev Tools",
        skills: ["GitHub", "Git", "Docker", "AWS", "Claude Code", "GitHub Copilot"],
    },
];

export const skillsIcon = [
    {
        tech: "HTML",
        icon: html,
        alt: "html icon"
    },
    {
        tech: "CSS",
        icon: css,
        alt: "css icon"
    },
    {
        tech: "Javascript",
        icon: javascript,
        alt: "javacript icon"
    },
    {
        tech: "Node.js",
        icon: nodejs,
        alt: "node js icon"
    },

    {
        tech: "React",
        icon: react,
        alt: "react icon"
    },

    {
        tech: "Express JS",
        icon: express,
        alt: "express js icon"
    },

    {
        tech: "Tailwind CSS",
        icon: tailwind,
        alt: "tailwind css icon"
    },

    {
        tech: "Bootstrap",
        icon: bootstrap,
        alt: "bootstrap icon"
    },

    {
        tech: "Python",
        icon: python,
        alt: "python icon"
    },

    {
        tech: "C",
        icon: c,
        alt: "c icon"
    },

    {
        tech: "C++",
        icon: cpp,
        alt: "c++ icon"
    },
    {
        tech: "JQuery",
        icon: jquery,
        alt: "jquery icon"
    },
    {
        tech: "Docker",
        icon: docker,
        alt: "docker icon"
    }
]

export const experience: Experience[] = [
    {
        title: "Software Engineer Intern",
        description: [
            `Developed and owned a resource planning tool for structural engineering teams replacing a manual Excel workflow
             and reducing planning time by approximately 60% using Next.js, NestJS, and Prisma ORM`,
            `Improved planning accuracy and visibility by replacing static spreadsheets with a dynamic database layer, enabling
             instant updates across hundreds of resource entries.`,
            `Built a Python ETL pipeline to migrate 15k+ rows from Excel to Azure SQL, designing 10+ tables across 5
             schemas and achieving 10-100x faster load times than row-wise inserts.`
        ],
        date: "May 2026 – Present",
        location: "Vancouver, BC",
        company: "WSP",
        current: true,
    },
    {
        title: "Software Engineer",
        description: [
            `Architected dynamic web interfaces with React, maintaining 100% state synchronization across complex user
             workflows by leveraging optimized Hooks (useState, useEffect) for seamless data integration.`,
            `Developed Full Stack applications using React Hooks and Node.js, achieving a 30% reduction in response latency
             by implementing asynchronous Express middleware to handle concurrent API traffic`,
        ],
        date: "February 2026 – Present",
        location: "Burnaby, BC",
        company: "Blueprint",
        current: true,
    },
    {
        title: "Software Developer",
        description: [
            `Developed a C++/Qt path-planning component using RVO2 (ORCA), including a coordinator layer for
             agent/obstacle management, timestep simulation, and signal-driven velocity updates.`,
            `Integrated RVO2/ORCA collision avoidance into the path-planning stack to reduce by 53% inter-robot
             collisions (ally/enemy).`,
            `Collaborated cross-functionally with 5+ team leads in weekly design reviews, delivering 15+ feature tickets on
             schedule through Agile workflows managed via Jira and GitLab`
        ],
        date: "September 2025 – Present",
        location: "Burnaby, BC",
        company: "SFU Robot Soccer Club",
        current: true,
    }
];
