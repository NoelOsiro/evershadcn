'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Link from 'next/link';

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
      <SidebarCard title="Contribution Channels" items={ListStart} linkPrefix="contribution" />
      <SidebarCard title="Funeral plans" items={Listupdates} linkPrefix="funeral-plans" />
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
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <Card className="bg-secondary text-primary shadow-md border-l-4 border-blue-500 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <motion.li
              key={item.id}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative"
            >
              {linkPrefix === 'contribution' ? (
                <ContributionModal item={item} />
              ) : (
                <Link href={`/${linkPrefix}/${item.id}`} passHref>
                  <motion.div
                    className="block p-2 rounded-md text-primary hover:text-blue-500 transition-colors duration-200 ease-in-out"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      backgroundColor: hoveredItem === item.id ? 'var(--primary)' : 'text-blue-500',
                    }}
                  >
                    {item.title}
                  </motion.div>
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface ContributionModalProps {
  item: { id: number; title: string };
}

const ContributionModal: React.FC<ContributionModalProps> = ({ item }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="w-full text-left p-2 rounded-md text-primary hover:text-blue-500  transition-colors duration-200 ease-in-out"
          whileHover={{ scale: 1.05 }}
        >
          {item.title}
        </motion.button>
      </DialogTrigger>
      <DialogContent className='bg-primary text-body-color dark:text-body-color-dark'>
        <DialogHeader>
          <DialogTitle>{item.title} Contribution</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Enter your {item.title} contribution details here.</p>
          {/* Add form fields for contribution here */}
        </div>
        <Button variant={'outline'} className="w-full bg-blue-500 text-white">Submit Contribution</Button>
      </DialogContent>
    </Dialog>
  );
}