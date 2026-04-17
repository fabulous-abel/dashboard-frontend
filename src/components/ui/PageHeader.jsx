import React from 'react';
import '../../pages/PageStyles.css';

const PageHeader = ({ title, subtitle, children }) => (
  <div className="page-header glass-panel animate-fade-in shadow-xl">
    <div className="page-header-content">
      <div className="page-header-copy">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {children && <div className="header-actions">{children}</div>}
    </div>
  </div>
);

export default PageHeader;
