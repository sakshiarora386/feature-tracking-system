import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'gray' | 'green' | 'blue' | 'yellow' | 'red' | 'purple';
}

const Badge: React.FC<BadgeProps> = ({ children, color = 'gray' }) => {
  const colorStyles = {
    gray: 'bg-gray-100 text-gray-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${colorStyles[color]}`}
    >
      {children}
    </span>
  );
};

export default Badge;