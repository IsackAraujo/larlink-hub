"use client";

import { BottomNav } from "@/components/ui/BottomNav";
import { House, MessageCircleQuestion, User, Users } from "lucide-react";

export function SdrNav() {
  return (
    <BottomNav
      items={[
        { href: "/hoje", label: "Hoje", icon: House },
        { href: "/leads", label: "Leads", icon: Users },
        { href: "/objecoes", label: "Objeções", icon: MessageCircleQuestion },
        { href: "/eu", label: "Eu", icon: User },
      ]}
    />
  );
}
