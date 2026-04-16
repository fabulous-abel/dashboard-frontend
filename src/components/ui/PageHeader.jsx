import React from 'react';

const PageHeader = ({ title, subtitle, children }) => (
  <div className="page-header glass-panel animate-fade-in shadow-xl">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {children && <div className="header-actions">{children}</div>}
    </div>
  </div>
);

export default PageHeader;
