import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 md:ml-64">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                    <Menu className="w-6 h-6" />
                </button>
                <div className="hidden md:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all w-96">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search trains, stations..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-900"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">John Commuter</p>
                        <p className="text-xs text-gray-500">Premium User</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-medium shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                        icon
                    </div>
                </div>
            </div>
        </header>
    );
};
