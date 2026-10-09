import { blog, SpikeConnect, insta, github, linkedin, StressBurnout,
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


export const sections = [
    {
        id: "about-me",
        title: "About Me",
    },
    {
        id: "skills",
        title: "Skills"
    },
    {
        id: "projects",
        title: "Projects",
    },
    {
        id: "experience",
        title: "Experience"
    },
    {
        id: "contact",
        title: "Contact",
    },
];


export const links = [
    {
        title: "Contact Links",
        links: [
            {
                name: "Github",
                link: "https://github.com/DenkuKuro",
                icon: github
            },
            {
                name: "Linkedn",
                link: "linkedin.com/in/javier-deng-65b000284",
                icon: insta
            },
            {
                name: "Instagram",
                link: "https://www.instagram.com/denkujdx/",
                icon: linkedin
            },
            {
                name: "Email",
                link: "javier.deng17@gmail.com",
            },
        ],
    },
    {
        title: "Section links?",
        links: [],
    }
];

export const projects = [
    {
        title: "Blog Post",
        link: "https://github.com/DenkuKuro/Blog-Post",
        image: blog,
        tech: "HTML/CSS, Javascript, Bootstrap, Node.js, Express.js, JQuery, Axios, REST API",
    },
    {
        title: "GANPI",
        link: "",
        image: "",
        tech: ""
    },
    {
        title: "SpikeConnect",
        link: "https://github.com/rsg28/Spike-Connect",
        image: SpikeConnect,
        tech: " Javascript, React Native, Python, HTML/CSS, Selenium, Beautiful Soup",
    },
    {
        title: "EasyChart",
        link: "https://github.com/CMPT-276-SUMMER-2025/final-project-5-lakes",
        image: easyChart,
        tech: "React JS, Javascript, Tailwind CSS, Node.js, Express.js, API, DeepSeek API",
    },
];

export const skills = [
    "HTML", "CSS", "Javascript", "Node.js", "React", "Express JS", "Tailwind CSS", 
    "Bootstrap", "Python", "C", "C++", "Github", "Git", "Bash"
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

export const experience = [
    {
        title: "Software Engineer Intern - WSP",
        description: [
            `Architected dynamic web interfaces with React, maintaining 100% state synchronization across complex user
             workflows by leveraging optimized Hooks (useState, useEffect) for seamless data integration.`,
            `Developed Full Stack applications using React Hooks and Node.js, achieving a 30% reduction in response latency
             by implementing asynchronous Express middleware to handle concurrent API traffic`,
        ],
        date: "May 2026 - Present",
        location: "Vancouver, BC",
        company: "WSP",
    },
    {
        title: "Software Engineer - Blueprint",
        description: [
            `Architected dynamic web interfaces with React, maintaining 100% state synchronization across complex user
             workflows by leveraging optimized Hooks (useState, useEffect) for seamless data integration.`,
            `Developed Full Stack applications using React Hooks and Node.js, achieving a 30% reduction in response latency
             by implementing asynchronous Express middleware to handle concurrent API traffic`,
        ],
        date: "Feburary 2026 - Present",
        location: "Burnaby, BC",
        company: "Blueprint",
    },
    {
        title: "Software Developer - SFU Robot Soccer Club",
        description: [
            `Developed a C++/Qt path-planning component using RVO2 (ORCA), including a coordinator layer for
             agent/obstacle management, timestep simulation, and signal-driven velocity updates.`,
            `Integrated RVO2/ORCA collision avoidance into the path-planning stack to reduce by 53% inter-robot
             collisions (ally/enemy).`,
            `Collaborated cross-functionally with 5+ team leads in weekly design reviews, delivering 15+ feature tickets on
             schedule through Agile workflows managed via Jira and GitLab`
        ],
        date: "September 2025 - Present",
        location: "Burnaby, BC",
        company: "SFU Robot Soccer Club",
    }
];