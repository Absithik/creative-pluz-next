
export const SITE_URL = "https://creativepluz.com"; // User should verify domain
export const LOCATION = "Salem, Tamil Nadu";
export const COMPANY_NAME = "Creative Pluz";

export const SERVICE_TAXONOMY = {
    branding: {
        name: "Logo & Branding",
        slug: "/services/branding",
        description: "Professional logo design and comprehensive brand identity systems",
        keywords: ["logo design", "brand identity", "visual identity", "brand guidelines"],
        icon: "Zap"
    },
    packaging: {
        name: "Product Package Designing",
        slug: "/services/package-design",
        description: "Structural packaging design and retail product branding",
        keywords: ["packaging design", "product packaging", "label design", "retail branding"],
        icon: "Box"
    },
    socialMedia: {
        name: "Social Media Posts",
        slug: "/services/social-media",
        description: "Scroll-stopping social media creatives and marketing campaigns",
        keywords: ["social media design", "instagram posts", "digital marketing", "social content"],
        icon: "Share2"
    },
    marketing: {
        name: "Marketing Collateral & Banner Designs",
        slug: "/services/marketing-collateral",
        description: "Complete marketing collateral including flex banners, hoardings, and displays",
        keywords: ["flex banner design", "marketing collateral", "banner printing", "outdoor advertising"],
        icon: "Layers"
    },
    printAdvertising: {
        name: "Brochure & Print Advertising",
        slug: "/services/print-advertising",
        description: "Professional print materials and advertising collateral",
        keywords: ["brochure design", "print advertising", "catalog design", "flyer design"],
        icon: "BookOpen"
    },
    webDevelopment: {
        name: "Web Development",
        slug: "/services/web-development",
        description: "Modern, responsive websites and web applications",
        keywords: ["web development", "website design", "e-commerce", "web applications"],
        icon: "Monitor"
    }
} as const;

export const COMPANY_DETAILS = {
    name: "Creative Pluz",
    legalName: "Creative Pluz Agency",
    email: "creativepluzsalem@gmail.com",
    phone: "+91-93630-24021",
    address: {
        street: "#7/2, 1st Floor, S.S. Plaza, Advaitha Ashram Rd",
        city: "Salem",
        state: "Tamil Nadu",
        zip: "636016",
        country: "IN"
    },
    coordinates: {
        latitude: 11.6643,
        longitude: 78.1460
    },
    serviceAreas: ["Salem", "Coimbatore", "Chennai", "Bangalore", "Hyderabad"],
    socials: [
        "https://instagram.com/creativepluz",
        "https://linkedin.com/company/creativepluz",
        "https://facebook.com/creativepluz",
        "https://twitter.com/creativepluz"
    ],
    foundingDate: "2020-01-01",
    employees: "10-50"
} as const;

export const GEO_KEYWORDS = [
    "creative agency salem tamil nadu",
    "branding company salem",
    "web development salem",
    "package design tamil nadu",
    "social media agency salem",
    "print advertising salem",
    "marketing collateral design south india"
];

export const INDUSTRIES = [
    "Retail",
    "Manufacturing",
    "Healthcare",
    "Education",
    "Startups",
    "Small Businesses",
    "Corporate Brands"
];
