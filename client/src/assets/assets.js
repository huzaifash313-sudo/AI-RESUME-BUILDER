import dummy_profile from './dummy_profile.png'

export const dummyResumeData = [
    {
        // ----------------------------------------------------- Resume 1 ------------------------------------------------------
        personal_info: {
            full_name: "Alex Smith",
            email: "alex@example.com",
            phone: "0 123456789",
            location: "NY, USA",
            linkedin: "https://www.linkedin.com",
            website: "https://www.example.com",
            profession: "Full Stack Developer",
            image: dummy_profile
        },
        _id: "68d2a31a1c4dd38875bb037e",
        userId: "68c180acdf1775dfd02c6d87",
        title: "Alex's Resume",
        public: true,
        professional_summary: "Highly analytical Data Analyst with 6 years of experience transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools. ",
        skills: ["JavaScript", "React JS", "Full Stack Development", "Git", "GitHub", "NextJS", "Express", "NodeJS", "TypeScript"],
        experience: [
            {
                company: "Example Technologies.",
                position: "Senior Full Stack Developer",
                start_date: "2023-06",
                end_date: "Present",
                description: "Architected, developed, and deployed innovative full-stack applications at Example Technologies.\ncreating robust back-end systems and intuitive front- end interfaces to deliver meaningful digital experiences ",
                is_current: true,
                _id: "68d2a31a1c4dd38875bb037f"
            },
            {
                company: "Example Technologies.",
                position: "Full Stack Developer",
                start_date: "2019-08",
                end_date: "2023-05",
                description: "Engineered and deployed scalable full-stack web applications for Example Technologies, translating complex requirements into robust front-end interfaces and efficient back-end services.",
                is_current: false,
                _id: "68d4f7abc8f0d46dc8a8b114"
            }
        ],
        education: [
            {
                institution: "Example Institute of Technology",
                degree: "B.TECH",
                field: "CSE",
                graduation_date: "2023-05",
                gpa: "8.7",
                _id: "68d2a31a1c4dd38875bb0380"
            },
            {
                institution: "Example Public School",
                degree: "HIGHER SECONDARY",
                field: "PCM",
                graduation_date: "2019-03",
                gpa: "",
                _id: "68d2a31a1c4dd38875bb0381"
            }
        ],
        template: "minimal-image",
        accent_color: "#14B8A6",
        project: [
            {
                name: "Team Task Management System",
                type: "Web Application",
                description: "TaskTrackr is a collaborative task management system designed for teams to track and manage tasks in real time.",
                _id: "68d4f882c8f0d46dc8a8b139"
            }
        ],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
    },
    {
        // ----------------------------------------------------- Resume 2 ------------------------------------------------------
        personal_info: {
            full_name: "Jordan Lee",
            email: "jordan.lee@example.com",
            phone: "0 987654321",
            location: "San Francisco, CA, USA",
            linkedin: "https://www.linkedin.com/in/jordanlee",
            website: "https://www.jordanlee.dev",
            profession: "Frontend Engineer",
            image: dummy_profile
        },
        _id: "78e3b42c2d5ff49286cc148f",
        userId: "78d2e0bdcf2886efg03e7e98",
        title: "Jordan's Resume",
        public: true,
        professional_summary: "Creative and detail-oriented Frontend Engineer with 5+ years of experience crafting responsive, user-centric web applications using React and modern CSS frameworks.",
        skills: ["HTML5", "CSS3", "JavaScript", "React", "Vue.js", "Tailwind CSS", "Figma"],
        experience: [
            {
                company: "TechSpark Inc.",
                position: "Lead Frontend Engineer",
                start_date: "2022-02",
                end_date: "Present",
                description: "Leading a team of frontend developers to build accessible and scalable user interfaces.",
                is_current: true,
                _id: "78e3b42c2d5ff49286cc1490"
            }
        ],
        education: [
            {
                institution: "University of Digital Arts",
                degree: "B.Sc.",
                field: "Computer Science",
                graduation_date: "2018-06",
                gpa: "3.8",
                _id: "78e3b42c2d5ff49286cc1492"
            }
        ],
        template: "modern",
        accent_color: "#6366F1",
        project: [
            {
                name: "FitTrack - Fitness Dashboard",
                type: "Web Application",
                description: "A fitness analytics dashboard built with React and Chart.js.",
                _id: "78e3b42c2d5ff49286cc1494"
            }
        ],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
    },
    {
        // ----------------------------------------------------- Resume 3 ------------------------------------------------------
        personal_info: {
            full_name: "Riley Morgan",
            email: "riley.morgan@example.com",
            phone: "0 1122334455",
            location: "Austin, TX, USA",
            linkedin: "https://www.linkedin.com/in/rileymorgan",
            website: "https://www.rileym.dev",
            profession: "Backend Developer",
            image: dummy_profile
        },
        _id: "89f4c53d3e6gg59397dd259g",
        userId: "89e3f1cedg3997fgh14f8f09",
        title: "Riley's Resume",
        public: true,
        professional_summary: "Dedicated Backend Developer with 7+ years of experience building secure, high-performance APIs using Node.js and PostgreSQL.",
        skills: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS", "GraphQL"],
        experience: [
            {
                company: "DataNest Solutions",
                position: "Senior Backend Engineer",
                start_date: "2021-03",
                end_date: "Present",
                description: "Developed distributed microservices using Node.js and Docker.",
                is_current: true,
                _id: "89f4c53d3e6gg59397dd259h"
            }
        ],
        education: [
            {
                institution: "Texas Institute of Technology",
                degree: "B.E.",
                field: "Information Technology",
                graduation_date: "2016-05",
                gpa: "3.9",
                _id: "89f4c53d3e6gg59397dd259j"
            }
        ],
        template: "classic",
        accent_color: "#F59E0B",
        project: [
            {
                name: "Invoicr - FinTech App",
                type: "Web Application",
                description: "Generate and track professional invoices automatically.",
                _id: "89f4c53d3e6gg59397dd259l"
            }
        ],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
    }
];