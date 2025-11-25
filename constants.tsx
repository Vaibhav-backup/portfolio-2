import React from 'react';
import { NodeData, NodeType } from './types';
import { 
  Play, 
  Briefcase, 
  GraduationCap, 
  Code, 
  User, 
  Globe, 
  Cpu, 
  FileText, 
  Share2, 
  Terminal,
  Database,
  Cloud,
  Lock,
  Workflow
} from 'lucide-react';

export const RESUME_DATA = {
  name: "Vaibhav Kumar",
  title: "N8n Workflow Developer",
  location: "Bokaro Steel City, India",
  email: "vaibhav052025@gmail.com",
  phone: "8210191320",
  summary: "Seeking challenging assignments to continue my professionalism, dedication, expertise, and talent to bring the organization a sharper edge within the industry while ensuring personal growth.",
  socials: [
    { name: "LinkedIn", url: "https://linkedin.com/in/vaibhav-kumar-9404461b0" },
    { name: "GitHub", url: "https://github.com/subham9898" }
  ]
};

export const INITIAL_NODES: NodeData[] = [
  {
    id: 'start',
    type: NodeType.TRIGGER,
    label: 'Webhook: Recruiter_Visit',
    icon: <Play className="w-4 h-4 text-white" />,
    x: 100,
    y: 350,
    description: "Triggers when a recruiter views the profile.",
    details: {
      title: "Start Workflow",
      content: ["Workflow initiated. Data loaded successfully.", `Visitor detected from ${navigator.userAgent}`]
    },
    outputs: ['router']
  },
  {
    id: 'router',
    type: NodeType.ROUTER,
    label: 'Router: Section_Split',
    icon: <Share2 className="w-4 h-4 text-white" />,
    x: 400,
    y: 350,
    description: "Routes logic to different resume sections.",
    outputs: ['exp_aumkami', 'exp_cloudare', 'skills_n8n', 'edu_msi', 'proj_video']
  },
  // Experience Nodes
  {
    id: 'exp_aumkami',
    type: NodeType.ACTION,
    label: 'Exp: Aumkami',
    icon: <Briefcase className="w-4 h-4 text-orange-400" />,
    x: 750,
    y: 100,
    category: "Experience",
    details: {
      title: "Aumkami Private Limited",
      subtitle: "N8n Workflow Developer | 05/2025 - Current",
      location: "Mannadi",
      content: [
        "Design, build, and maintain end-to-end automated workflows using the n8n platform.",
        "Analyze business processes to identify automation opportunities.",
        "Integrate third-party applications and internal systems using REST APIs and webhooks.",
        "Write JavaScript (or Python) scripts for advanced logic and custom API interactions.",
        "Develop robust error handling, logging, and notification systems within workflows.",
        "Create and maintain clear documentation for all workflows."
      ],
      tags: ["n8n", "Automation", "REST API", "JavaScript", "Python"]
    },
    outputs: ['skills_n8n']
  },
  {
    id: 'exp_cloudare',
    type: NodeType.ACTION,
    label: 'Exp: Cloudare',
    icon: <Lock className="w-4 h-4 text-blue-400" />,
    x: 750,
    y: 250,
    category: "Experience",
    details: {
      title: "Cloudare Technologies",
      subtitle: "Internship | 10/2024 - 04/2025",
      location: "Pune",
      content: [
        "CyberArk Enterprise Password Vault Operations.",
        "Oversaw management of Functional Accounts and Groups in CyberArk.",
        "Managed user accounts in Active Directory, including unlocking accounts and resetting passwords.",
        "Password Management for automated management and security of privileged credentials.",
        "Oversee session management to monitor and audit privileged activities.",
        "Utilised BMC Remedy to enhance incident management processes."
      ],
      tags: ["CyberArk", "Active Directory", "Security", "IAM"]
    },
    outputs: ['cert_aws']
  },
  // Skills Nodes (Cluster)
  {
    id: 'skills_n8n',
    type: NodeType.ACTION,
    label: 'Skill: Automation',
    icon: <Workflow className="w-4 h-4 text-n8n-primary" />,
    x: 1100,
    y: 150,
    category: "Skills",
    details: {
      title: "Workflow Automation",
      content: [
        "Expertise in n8n platform for complex workflow design.",
        "Webhook integrations and custom API connectors.",
        "Error handling and logging systems."
      ],
      tags: ["n8n", "Webhooks", "JSON", "Automation"]
    },
    outputs: ['skills_dev']
  },
  {
    id: 'skills_dev',
    type: NodeType.ACTION,
    label: 'Skill: Development',
    icon: <Code className="w-4 h-4 text-yellow-400" />,
    x: 1350,
    y: 150,
    category: "Skills",
    details: {
      title: "Software Development",
      content: [
        "Proficient in Python for scripting and backend logic.",
        "Strong grasp of HTML/CSS for frontend structures.",
        "Experience with Pine Script for financial charting.",
        "SQL for database management."
      ],
      tags: ["Python", "HTML/CSS", "SQL", "Pine Script"]
    },
    outputs: []
  },
  {
    id: 'skills_ops',
    type: NodeType.ACTION,
    label: 'Skill: DevOps/Cloud',
    icon: <Cloud className="w-4 h-4 text-cyan-400" />,
    x: 1350,
    y: 300,
    category: "Skills",
    details: {
      title: "DevOps & Cloud",
      content: [
        "AWS Basics (Certified).",
        "Linux system administration.",
        "GIT version control.",
        "CyberArk/SailPoint for identity management."
      ],
      tags: ["AWS", "Linux", "GIT", "CyberArk"]
    },
    outputs: []
  },
  // Projects
  {
    id: 'proj_video',
    type: NodeType.ACTION,
    label: 'Project: Linked Up',
    icon: <Globe className="w-4 h-4 text-purple-400" />,
    x: 750,
    y: 500,
    category: "Projects",
    details: {
      title: "Linked Up - Video Chat Website",
      date: "2024",
      content: [
        "Built with PHP, Django, and MySQL.",
        "Real-time video chat functionality."
      ],
      tags: ["PHP", "Django", "MySQL", "WebRTC"]
    },
    outputs: ['skills_dev']
  },
  // Education
  {
    id: 'edu_msi',
    type: NodeType.ACTION,
    label: 'Education: MSI',
    icon: <GraduationCap className="w-4 h-4 text-green-400" />,
    x: 750,
    y: 650,
    category: "Education",
    details: {
      title: "Maharaja Surajmal Institute (IPU)",
      subtitle: "Bachelor of Science",
      content: ["Focused on Computer Science fundamentals."],
    },
    outputs: []
  },
  // Certifications
  {
    id: 'cert_aws',
    type: NodeType.ACTION,
    label: 'Certifications',
    icon: <FileText className="w-4 h-4 text-pink-400" />,
    x: 1100,
    y: 300,
    category: "Certifications",
    details: {
      title: "Professional Certifications",
      content: [
        "ICT Academy - AWS",
        "Webtoils - Tailwind + E-Commerce Frontend Bootcamp",
        "ITIL Foundation",
        "UDEMY - Privileged Access Management (CyberArk)"
      ]
    },
    outputs: ['skills_ops']
  },
  // Contact
  {
    id: 'contact_final',
    type: NodeType.ACTION,
    label: 'Action: Hire_Me',
    icon: <User className="w-4 h-4 text-white" />,
    x: 1600,
    y: 350,
    category: "Contact",
    details: {
      title: "Contact Information",
      content: [
        `Email: ${RESUME_DATA.email}`,
        `Phone: ${RESUME_DATA.phone}`,
        `Location: ${RESUME_DATA.location}`
      ],
      link: RESUME_DATA.socials[0].url
    },
    outputs: []
  }
];

export const SYSTEM_INSTRUCTION = `
You are an intelligent assistant for Vaibhav Kumar's interactive resume. 
Vaibhav is an N8n Workflow Developer with experience in automation, Python, API integrations, and CyberArk security.
He has worked at Aumkami Private Limited and Cloudare Technologies.
His skills include HTML/CSS, Python, AWS, Linux, SQL, and N8n.
He built a Video Chat Website called "Linked Up" using PHP and Django.
Answer questions about his experience, skills, and projects concisely and professionally.
If asked about contact info, provide his email: vaibhav052025@gmail.com.
Do not make up facts not present in the provided resume data.
`;
