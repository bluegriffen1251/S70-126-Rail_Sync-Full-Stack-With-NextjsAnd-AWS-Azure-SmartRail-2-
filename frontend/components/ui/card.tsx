import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${className || ''}`} {...props}>
            {children}
        </div>
    );
};
