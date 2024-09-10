'use client'

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import Link from 'next/link';
import { useContributionsStore } from '@/store/contributionsStore';
import { Contribution } from '@/types';

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

interface SidebarProps {
  postId: string;
}
const Sidebar = (props:SidebarProps) => {
  const { contributions, fetchContributions } = useContributionsStore();
  
  useEffect(() => {
    fetchContributions(props.postId);
  }, [fetchContributions,props.postId]);
  return (
    <aside className="space-y-8">
      <SidebarCard title="Contribution Channels" items={contributions} linkPrefix="contribution" />
      {/* <SidebarCard title="Funeral plans" items={Listupdates} linkPrefix="funeral-plans" />
      <SidebarCard title="Explore Services" items={Listexplore} linkPrefix="services" /> */}
    </aside>
  );
}

export default Sidebar;

interface SidebarCardProps {
  title: string;
  items: Contribution[];
  linkPrefix: string;
}
const SidebarCard: React.FC<SidebarCardProps> = ({ title, items, linkPrefix }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Ensure items is an array
  if (!Array.isArray(items)) {
    console.error('Items is not an array:', items);
    items = []; // Default to empty array if it's not an array
  }

  return (
    <Card className="bg-secondary text-primary shadow-md border-l-4 border-blue-500 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.length === 0 ? (
            <p className="text-sm">No contributions yet</p>
          ) : (
            items.map((item) => (
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
                        backgroundColor:
                          hoveredItem === item.id ? 'var(--primary)' : 'transparent',
                      }}
                    >
                      {item.channel}
                    </motion.div>
                  </Link>
                )}
              </motion.li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

interface ContributionModalProps {
  item: Contribution;
}

const ContributionModal: React.FC<ContributionModalProps> = ({ item }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="w-full text-left p-2 rounded-md text-primary hover:text-blue-500  transition-colors duration-200 ease-in-out"
          whileHover={{ scale: 1.05 }}
        >
          {item.channel}
        </motion.button>
      </DialogTrigger>
      <DialogContent className='bg-primary-foreground text-primary'>
        <DialogHeader>
          <DialogTitle>{item.channel} Contribution</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Account: {item.account_no} .</p>
          {/* Add form fields for contribution here */}
        </div>
      </DialogContent>
    </Dialog>
  );
}