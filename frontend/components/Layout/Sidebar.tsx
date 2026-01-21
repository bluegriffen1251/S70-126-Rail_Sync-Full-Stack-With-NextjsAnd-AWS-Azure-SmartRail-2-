import React from 'react';
import { Home, Map, Clock, Settings, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';

export const Sidebar: React.FC = () => {
    const navItems = [
        { icon: <Home className="w-5 h-5" />, label: 'Dashboard', href: '/dashboard', active: true },
        { icon: <Map className="w-5 h-5" />, label: 'Route Map', href: '/dashboard/map', active: false },
        { icon: <Clock className="w-5 h-5" />, label: 'Schedules', href: '/dashboard/schedules', active: false },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', href: '/dashboard/settings', active: false },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 hidden md:flex flex-col z-20">
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">R</span>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        RailSync
                    </span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${item.active
                                ? 'bg-blue-50 text-blue-600 font-medium'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                    >
                        <span className={`${item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                            {item.icon}
                        </span>
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};
