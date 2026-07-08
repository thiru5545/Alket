export interface Solution {
   id: string;
   name: string;
   subName: string;
   price: string;
   description: string;
   folderPath: string;
   themeColor: string;
   gradient: string;
   features: string[];
   stats: { label: string; val: string }[];
   section1: { title: string; subtitle: string };
   section2: { title: string; subtitle: string };
   section3: { title: string; subtitle: string };
   section4: { title: string; subtitle: string };
   detailsSection: { title: string; description: string; imageAlt: string };
   freshnessSection: { title: string; description: string };
   buyNowSection: {
       price: string;
       unit: string;
       processingParams: string[];
       deliveryPromise: string;
       returnPolicy: string;
   };
}

export const solutions: Solution[] = [
   {
       id: "automate",
       name: "AI Automation",
       subName: "Intelligence in motion.",
       price: "Custom Quote",
       description: "AI-Driven Workflows - Zero Manual Repetition - Built On Your Requirements",
       folderPath: "/images/automate",
       themeColor: "#9E9E9E",
       gradient: "linear-gradient(135deg, #2A2A2A 0%, #0A0A0A 100%)",
       features: ["AI-Driven Workflows", "Zero Manual Repetition", "Built On Your Requirements"],
       stats: [{ label: "Manual Work", val: "0%" }, { label: "Uptime", val: "99.9%" }, { label: "AI Native", val: "100%" }],
       section1: { title: "AI Automation.", subtitle: "Intelligence in motion." },
       section2: { title: "Built from your workflow, not a template.", subtitle: "Every automation is architected around your exact requirement, powered by intelligent agents that learn and adapt." },
       section3: { title: "AI that removes the repetitive.", subtitle: "Let intelligent systems handle the manual work while your team focuses on what matters." },
       section4: { title: "Engineered intelligence, not guesswork.", subtitle: "" },
       detailsSection: {
           title: "AI Solutions, Not Templates",
           description: "Our AI Automation solution begins with your requirement, not a pre-built product. We study your workflow, identify where intelligent automation delivers the most value, and deploy AI agents trained specifically for your use case. It's not just automation; it's a purpose-built AI system.",
           imageAlt: "AI Automation Details"
       },
       freshnessSection: {
           title: "Requirement to Deployment",
           description: "We believe in absolute transparency. From requirement gathering to AI model deployment, our process is designed to minimize guesswork and maximize intelligent output. Continuous model monitoring ensures your AI solution stays adaptive, accurate, and aligned with your evolving business needs."
       },
       buyNowSection: {
           price: "Custom Quote",
           unit: "per AI solution engagement",
           processingParams: ["AI-Architected", "Requirement-Led", "Model-Tuned"],
           deliveryPromise: "Dedicated AI solution architects available for rapid deployment and integration support.",
           returnPolicy: "Full solution audit included. Not aligned with your requirement? We re-architect it, no questions asked."
       }
   },
   {
       id: "generative",
       name: "Generative AI Suite",
       subName: "Intelligence that creates.",
       price: "Custom Quote",
       description: "LLM-Powered Systems - Brand-Trained Models - Scalable AI Infrastructure",
       folderPath: "/images/generative",
       themeColor: "#B0B0B0",
       gradient: "linear-gradient(135deg, #3A3A3A 0%, #141414 100%)",
       features: ["LLM-Powered Systems", "Brand-Trained Models", "Scalable AI Infrastructure"],
       stats: [{ label: "Latency", val: "Low" }, { label: "Accuracy", val: "High" }, { label: "AI Native", val: "100%" }],
       section1: { title: "Generative AI Suite.", subtitle: "Intelligence that creates." },
       section2: { title: "AI systems trained on your brand.", subtitle: "Deploy chatbots, content engines, and intelligent tools that speak your brand's language, powered by fine-tuned language models." },
       section3: { title: "Scalable AI infrastructure.", subtitle: "From prototype to production, our generative AI systems are engineered to grow with your business." },
       section4: { title: "Made from intelligence, not templates.", subtitle: "" },
       detailsSection: {
           title: "AI Built For You, Not Off-the-Shelf",
           description: "Our Generative AI Suite integrates large language models directly into your product or workflow. Whether it's an intelligent chatbot, an AI content system, or a custom-trained model, every deployment is engineered around your requirement, tested for accuracy, and refined for your specific domain.",
           imageAlt: "Generative AI Details"
       },
       freshnessSection: {
           title: "Continuously Adaptive AI",
           description: "AI models degrade without care. That's why every Alket deployment includes ongoing model refinement. We monitor performance, retrain on new data, and keep your generative AI system intelligent, accurate, and current — never static, always evolving."
       },
       buyNowSection: {
           price: "Custom Quote",
           unit: "per AI solution engagement",
           processingParams: ["LLM Integrated", "Fine-Tuned", "Continuously Trained"],
           deliveryPromise: "Dedicated AI engineers guide integration from architecture through go-live.",
           returnPolicy: "Performance benchmarks guaranteed or we refine the model at no extra cost."
       }
   },
   {
       id: "intelligence",
       name: "Data Intelligence",
       subName: "Insight, engineered.",
       price: "Custom Quote",
       description: "Predictive AI Models - Real-Time Decision Systems - Zero Guesswork",
       folderPath: "/images/intelligence",
       themeColor: "#C4C4C4",
       gradient: "linear-gradient(135deg, #4A4A4A 0%, #1A1A1A 100%)",
       features: ["Predictive AI Models", "Real-Time Decision Systems", "Zero Guesswork"],
       stats: [{ label: "Noise", val: "0%" }, { label: "Data Sources", val: "Any" }, { label: "AI Native", val: "100%" }],
       section1: { title: "Data Intelligence.", subtitle: "Insight, engineered." },
       section2: { title: "Turn raw data into AI-driven decisions.", subtitle: "Freshly modeled, intelligently structured data that reveals what your business actually needs to act on." },
       section3: { title: "Predictive intelligence, built-in.", subtitle: "Machine learning models that forecast, flag, and recommend — so your decisions are backed by AI, not instinct." },
       section4: { title: "Pure intelligence, pure clarity.", subtitle: "" },
       detailsSection: {
           title: "The Intelligence Layer",
           description: "Our Data Intelligence solution transforms scattered, raw data into a unified, AI-modeled decision layer. We use tailored machine learning pipelines to extract signal from noise, resulting in predictive insight that's specific to your business, not a generic dashboard.",
           imageAlt: "Data Intelligence Details"
       },
       freshnessSection: {
           title: "Signal Preservation",
           description: "Data intelligence is highly sensitive to drift and staleness. Our AI pipelines are designed to shield your models from outdated signal at every step. We retrain and revalidate continuously to lock in accuracy and the predictive power that raw data alone can't provide."
       },
       buyNowSection: {
           price: "Custom Quote",
           unit: "per AI solution engagement",
           processingParams: ["ML-Modeled", "Drift-Monitored", "Zero Guesswork"],
           deliveryPromise: "Direct from our AI architects to your dashboard. Insight guaranteed on delivery.",
           returnPolicy: "Model underperforming? Instant retraining and recalibration included."
       }
   }
];
