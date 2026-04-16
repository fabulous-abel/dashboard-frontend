import React from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const SearchBar = ({ value, onChange, placeholder }) => {
  const { t } = useLanguage();

  return (
    <div className="search-container">
      <Search className="search-icon" size={18} />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder || t('students.searchPlaceholder', { target: t('students.searchTarget') })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
