import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ListStart = [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
    { id: 3, title: "Post 3" }
];

const Listupdates = [
    { id: 1, title: "Update 1" },
    { id: 2, title: "Update 2" },
    { id: 3, title: "Update 3" }
];

const Listexplore = [
    { id: 1, title: "Feature 1" },
    { id: 2, title: "Feature 2" },
    { id: 3, title: "Feature 3" }
];

const Sidebar = () => {
  return (
    <aside className="space-y-8">
      <SidebarCard title="Contributions" items={ListStart} linkPrefix="posts" />
      <SidebarCard title="Funeral plans" items={Listupdates} linkPrefix="updates" />
      <SidebarCard title="Explore Services" items={Listexplore} linkPrefix="services" />
    </aside>
  );
}

export default Sidebar;



interface SidebarCardProps {
  title: string;
  items: { id: number; title: string }[];
  linkPrefix: string;
}

const SidebarCard: React.FC<SidebarCardProps> = ({ title, items, linkPrefix }) => {
  return (
    <Card className="bg-secondary text-primary shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`/${linkPrefix}/${item.id}`} className="text-primary hover:underline">{item.title}</a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}


