
import { Badge } from "@/components/ui/badge"
import Image from 'next/image'
import BackgroundSVG from "./BackgroundSVG";
import BottomSVG from "./BottomSVG";
import './Hero.css'; // Import the CSS file

interface PostHeaderProps {
      imageUrl: string,
      title: string,
      description: string,
      status: string,
      createdAt: string
      type: string

  }
export default function PostHeader(props:PostHeaderProps) {
    const { imageUrl, title, description, status, createdAt,type } = props;
    return (
    <header className=" p-4">
      <div className="container mx-auto py-12 md:py-16 lg:py-24">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-[1fr_400px] md:gap-12 lg:grid-cols-[1fr_600px]">
          {
            /* Image first on mobile */
          }
          <Image src={imageUrl} alt={title} width={800} height={600} className="mx-auto aspect-[16/10] rounded-xl object-cover" />
  
          <div className="space-y-4">
            {
              /* Post Date and Badge */
            }
            <div className="flex items-center space-x-4 text-sm md:text-base">
              <Badge variant={status === 'published' ? 'outline' : 'secondary'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              <Badge variant={status === 'published' ? 'outline' : 'secondary'}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Badge>
  
            </div>
  
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              {title}
            </h1>
  
            <p className="text-lg md:text-xl lg:text-2xl">
              {description}
            </p>
            <div>
              <div className="mt-4 flex items-center space-x-4 text-muted-foreground">
                <div>
                  <Image src="/images/R.jpeg" alt="Author Avatar" className="h-8 w-8 rounded-full" width={32} height={32} />
                </div>
                <div>
                  <span className="font-medium">John Doe</span>
                  <span className="mx-2">·</span>
                  <Badge variant="outline">{new Date(createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BackgroundSVG />
        <BottomSVG />
    </header>);
  }