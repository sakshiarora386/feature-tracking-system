import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: React.ReactNode;
  error?: string;
}

const Select: React.FC<SelectProps> = ({ label, children, error, ...props }) => {
  const baseStyles =
    'mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-white shadow-sm hover:border-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md appearance-none transition-colors duration-200';
  const errorStyles = 'border-red-500 hover:border-red-600 focus:ring-red-500 focus:border-red-500';

  return (
    <div>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative">
        <select className={`${baseStyles} ${error ? errorStyles : ''}`} {...props}>
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;