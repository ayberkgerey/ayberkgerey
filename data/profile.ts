import type { Certification, ExperienceItem, SkillGroup } from "@/types/content";

export const profile = {
  name: "Ayberk Gerey",
  role: "Software Engineer, moving into Cloud Architecture",
  label: "Software Engineer → Cloud Architecture",
  headline: "From building software to designing systems.",
  /** Part of `headline` set in gold italic. Must match the headline text exactly. */
  headlineHighlight: "designing systems.",
  intro:
    "I'm a software engineer expanding into cloud architecture, building hands-on projects with AWS and Terraform, and documenting the engineering decisions behind them.",

  /**
   * Put the photo in /public/images/ and set `src` to its public path,
   * for example "/images/ayberk-gerey.jpg". Leave it null to show the placeholder.
   */
  portrait: {
    src: "/images/ayberk-gerey.jpg",
    alt: "Portrait of Ayberk Gerey",
  },

  email: "ayberkgerey@gmail.com",
  links: {
    github: "https://github.com/ayberkgerey",
    linkedin: "https://www.linkedin.com/in/ayberkgerey/",
  },

  focusAreas: [
    "AWS Architecture",
    "Terraform",
    "Cloud Networking",
    "Infrastructure as Code",
    "System Design",
  ],

  /** Technologies shown with icons on the home page. `icon` keys are defined in components/ui/TechIcon.tsx. */
  focusStack: [
    { name: "AWS", detail: "Cloud architecture", icon: "aws" },
    { name: "Terraform", detail: "Infrastructure as Code", icon: "terraform" },
    { name: "Kubernetes", detail: "Orchestration", icon: "kubernetes" },
    { name: "Docker", detail: "Containers", icon: "docker" },
    { name: "System Design", detail: "Architecture", icon: "system-design" },
  ] as const,

  journeyTitle: "From code to cloud.",
  journeySummary: [
    "I spent the first part of my career building mobile and web applications for products in logistics, cybersecurity, IoT, and AI.",
    "I'm now moving that product mindset to the infrastructure underneath, designing AWS environments, codifying them with Terraform, and writing down the trade-offs as I go.",
  ],
  journeyStages: [
    {
      label: "2020 – 2026",
      title: "Software engineering",
      text: "Mobile and web applications with React Native, TypeScript, Kotlin, Swift, and Angular.",
    },
    {
      label: "Now",
      title: "Cloud foundations",
      text: "Hands-on AWS architecture and Terraform, deployed and failure-tested in real environments.",
    },
    {
      label: "Direction",
      title: "Cloud architecture",
      text: "Designing systems for availability, security, and cost, with the decisions written down.",
    },
  ],
};

export const about = {
  introduction: [
    "I'm a product-minded software developer with three years of hands-on experience across mobile and web applications, now focusing on cloud and solutions engineering.",
    "This site is where I document that work: the systems I build, why they are shaped the way they are, and what I learn when they break.",
  ],
  softwareBackground: [
    "My background is in application development. I've worked with React Native, TypeScript, Kotlin, Swift, and Angular, with exposure to aviation, logistics, cybersecurity, IoT, and AI-driven products.",
    "That work ranged from Bluetooth Low Energy control of hardware devices and map-based Android applications to a security test reporting platform and an AI-powered roadmap product.",
  ],
  transition: [
    "I'm now applying the same product mindset to the infrastructure underneath applications: how traffic reaches them, how they keep running when a component fails, and who is allowed to access what.",
    "I'm building expertise in AWS, Terraform, Docker, Kubernetes, and observability through hands-on projects, and documenting each one with its architecture, its tests, and the decisions I would revisit.",
  ],
};

export const experience: ExperienceItem[] = [
  {
    role: "Software Developer",
    company: "Artiwise",
    employmentType: "Full-time",
    period: "Feb 2024 – Sep 2026",
    location: "Istanbul, Türkiye · Remote",
    website: "https://artiwise.com",
    highlights: [
      "Collaborated directly with Pegasus Airlines, contributing to customer-facing software solutions and addressing project requirements.",
      "Independently initiated and developed projects from scratch, taking them through implementation and production readiness.",
      "Designed and implemented application architectures based on project requirements and technical needs.",
      "Worked across 3 mobile application projects and 2 full-stack projects, contributing to different stages of the software development lifecycle.",
      "Developed applications using React Native (TypeScript/TSX), Swift, Kotlin, .NET, and Next.js.",
    ],
    skills: [
      "React Native",
      "Android Development",
      "iOS Development",
      "TypeScript",
      "Swift",
      "Git",
      "CI/CD",
      "XML",
      "Kotlin",
      "Firebase",
      "Jenkins",
      "Jira",
      "AngularJS",
      "Next.js",
      "ASP.NET",
    ],
  },
  {
    role: "Software & Business Developer",
    company: "Onuai",
    employmentType: "Freelance",
    period: "Feb 2025 – Aug 2025",
    location: "Gothenburg, Sweden · Remote",
    highlights: [
      "Worked part-time at an early-stage startup on the planning, setup, and front-end development of an AI-powered platform that builds personalized roadmaps for users' goals.",
      "Assisted in building MVPs for a companion mobile application.",
      "Took part in laying the foundations of the company, supporting strategy discussions, business development meetings, and team alignment with an international team.",
    ],
    skills: ["React", "React Native", "TypeScript", "Tailwind CSS", "shadcn/ui", "Figma", "Jira"],
  },
  {
    role: "Frontend Developer",
    company: "LastGuard Cyber Security Technologies",
    employmentType: "Internship",
    period: "Aug 2023 – Sep 2023",
    location: "Remote",
    highlights: [
      "Developed and maintained a web application for managing and reporting cybersecurity tests, including penetration tests, for client companies.",
      "Implemented features to track and manage conducted security tests and generate reports from them.",
    ],
    skills: ["React", "Bootstrap"],
  },
  {
    role: "Web & Mobile Developer",
    company: "Freightest",
    employmentType: "Full-time",
    period: "May 2021 – Jul 2021",
    location: "Türkiye · Remote",
    highlights: [
      "Contributed to cargo tracking and logistics management products covering shipments, containers, and commercial agreements.",
      "Implemented features and fixed issues in the Angular web application and the HTML, CSS, and JavaScript landing page.",
      "Managed server deployments over SSH and shipped version updates.",
      "Completed the MVP of the company's mobile application with React Native.",
    ],
    skills: ["Angular", "React Native", "JavaScript"],
  },
  {
    role: "Mobile Developer",
    company: "VirusSAFE Pro",
    employmentType: "Freelance",
    period: "Jun 2020 – Aug 2020",
    location: "Remote",
    highlights: [
      "Built React Native functionality for a mobile app that connects to an air purification device over Bluetooth Low Energy.",
      "Enabled users to monitor and control device operations remotely.",
    ],
    skills: ["React Native", "Bluetooth Low Energy"],
  },
  {
    role: "Android Developer",
    company: "Bülent Ecevit University",
    employmentType: "Freelance",
    period: "Mar 2020 – Jun 2020",
    location: "Zonguldak, Türkiye",
    highlights: [
      "Built an Android application for a university-led project that overlays Turkey's official earthquake risk map on Google Maps as a custom KML layer.",
      "Let users check the seismic risk level of their current location and find building safety guidance.",
    ],
    skills: ["Android", "Google Maps API", "KML"],
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Cloud & Infrastructure",
    items: ["AWS", "Terraform", "Networking", "Linux", "Docker", "Kubernetes", "CI/CD", "Observability"],
  },
  {
    label: "Application Development",
    items: ["TypeScript", "JavaScript", "React", "React Native", "Node.js", "Angular", "Kotlin", "Swift", "Spring", ".NET"],
  },
];

/** Add entries here once certifications are earned. The section shows a short note while empty. */
export const certifications: Certification[] = [];
