import { BoxSelect, Target, Star } from 'lucide-react';

export const THREED_SCROLL_CONTENT = {
    scanner: {
        label: "Scanning Structure: 104.2mm Accuracy"
    },
    hud: {
        stress: {
            label: "Stress Tolerance",
            value: "120kg Tested"
        },
        gloss: {
            label: "Optical Gloss",
            value: "Spot UV Verified"
        }
    },
    steps: [
        {
            icon: BoxSelect,
            label: "Structure",
            title: "Built to \nProtect.",
            highlight: "Protect.",
            description: "Every millimeter is calculated for industrial strength. We utilize custom corrugated architectures for high-end retail durability."
        },
        {
            icon: Target,
            label: "Psychology",
            title: "Built to \nSeduce.",
            highlight: "Seduce.",
            description: "Shelf impact is psychological warfare. We leverage color theory and visual hierarchy to ensure your product is the first one touched."
        },
        {
            icon: Star,
            label: "Artifacting",
            title: "Built to \nLast.",
            highlight: "Last.",
            description: "Tactile finishes turn packaging into a keepsake. Metallic foils and soft-touch textures communicate luxury before the product is even seen."
        }
    ]
};
