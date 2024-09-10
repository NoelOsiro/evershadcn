
import { Feature } from "@/types/feature";
import { MousePointerClick, ScrollText, ShieldHalf, SmartphoneNfc, SwatchBook, Webhook} from "lucide-react"; // Replace with the actual Lucid React icon package you're using

const featuresData: Feature[] = [
  {
    id: 1,
    icon: <SwatchBook width="40" height="40" className="fill-current" />, // Replace MousePointerClick with the actual icon name you want to use
    title: "Create Obituary and memorial pages easily",
    paragraph: "Easily create and post obituaries for your loved ones with our intuitive and user-friendly interface.",
  },
  {
    id: 2,
    icon: <ShieldHalf width="40" height="40" className="fill-current" />, // Replace ShieldHalf with the actual icon name you want to use
    title: "Share memories of your loved ones with friends and family",
    paragraph: "Share memories of your loved ones with friends and family, ensuring their legacy lives on forever.",
  },
  {
    id: 3,
    icon: <ScrollText width="40" height="40" className="fill-current" />, // Replace AccessIcon with the actual icon name you want to use
    title: "Get support for funding and donations",
    paragraph: "Get support for funding and donations to help cover the costs of obituary postings and other expenses.",
  },
  {
    id: 4,
    icon: <MousePointerClick width="40" height="40" className="fill-current" />, // Replace DesignIcon with the actual icon name you want to use
    title: "Upload Euology",
    paragraph: "Upload and share eulogies for your loved ones, ensuring their memory is preserved and cherished by all.",
  },
  {
    id: 5,
    icon: <Webhook width="40" height="40" className="fill-current" />, // Replace SupportIcon with the actual icon name you want to use
    title: "Find great service providers",
    paragraph: "Find great service providers to help you with obituary postings, ensuring a seamless and stress-free experience.",
  },
  {
    id: 6,
    icon: <SmartphoneNfc width="40" height="40" className="fill-current" />, // Replace PaymentIcon with the actual icon name you want to use
    title: "Share a vote of thanks",
    paragraph: "Share a vote of thanks to all those who have supported you during this difficult time, ensuring they know how much you appreciate them.",
  },
];
export default featuresData;