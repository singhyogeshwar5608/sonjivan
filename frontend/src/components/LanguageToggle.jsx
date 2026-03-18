import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
      aria-label="Toggle Language"
    >
      <Languages className="w-5 h-5" />
      <span className="font-semibold text-sm">
        {language === 'english' ? 'हिंदी' : 'English'}
      </span>
    </button>
  );
};

export default LanguageToggle;
