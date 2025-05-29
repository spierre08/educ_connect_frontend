import React, { useState } from 'react';

import { AiFillMoneyCollect } from 'react-icons/ai';
import {
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa';
import { FaBookOpenReader } from 'react-icons/fa6';
import { GrDocumentPerformance } from 'react-icons/gr';
import { LuSquareActivity } from 'react-icons/lu';
import {
  MdDashboard,
  MdManageAccounts,
} from 'react-icons/md';
import { RiUserCommunityFill } from 'react-icons/ri';

const menuItems = [
  { label: "Dashboard", icon: <MdDashboard /> },
  {
    label: "Gestion",
    icon: <MdManageAccounts />,
    subItems: ["Académique", "Administrative", "Ressources humaines"],
  },
  { label: "Communication", icon: <RiUserCommunityFill /> },
  {
    label: "Activités",
    icon: <LuSquareActivity />,
    subItems: ["Liste", "Ajouter", "Permissions"],
  },
  { label: "Performance & qualité", icon: <GrDocumentPerformance /> },
  {
    label: "Finances",
    icon: <AiFillMoneyCollect />,
    subItems: ["Comptabilités", "Dépenses"],
  },
  {
    label: "E-learning",
    icon: <FaBookOpenReader />,
    subItems: ["Profil", "Sécurité"],
  },
];

export default function SliberBar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (label) => {
    setActiveMenu((prev) => (prev === label ? null : label));
  };

  return (
    <div className="w-[300px] h-[100vh] relative bg-blue-900">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-white font-bold text-lg">Logo</h1>
      </div>

      <div className="p-5">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label} className="text-white">
              <button
                className="w-full flex items-center justify-between hover:text-blue-400"
                onClick={() => item.subItems && toggleMenu(item.label)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.subItems &&
                  (activeMenu === item.label ? (
                    <FaChevronDown className="text-sm" />
                  ) : (
                    <FaChevronRight className="text-sm" />
                  ))}
              </button>

              {item.subItems && activeMenu === item.label && (
                <ul className="mt-2 ml-6 space-y-1 text-sm text-gray-300">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem}
                      className="cursor-pointer hover:text-blue-300"
                    >
                      {subItem}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
