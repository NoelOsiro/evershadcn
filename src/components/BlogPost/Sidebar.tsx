import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ListStart = [
    { id: 1, title: "M-pesa" },
    { id: 2, title: "M-changa" },
    { id: 3, title: "Other" }
];

const Listupdates = [
  { id: 1, title: "Eulogy Update" },
  { id: 2, title: "Funeral Arrangements" },
  { id: 3, title: "Burial Details" }
];


const Listexplore = [
  { id: 1, title: "Funeral Planning" },
  { id: 2, title: "Grief Counseling" },
  { id: 3, title: "Memorial Services" }
];


const Sidebar = () => {
  return (
    <aside className="space-y-8">
      <SidebarCard title="Contribution Channels" items={ListStart} linkPrefix="posts" />
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
    <Card className="bg-secondary text-primary shadow-md border-l-4 border-blue-500">
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


