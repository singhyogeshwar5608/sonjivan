import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const CategoriesSection = ({ categories }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={cardVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t.shopByCategoryTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.shopByCategoryDescription}
          </p>
        </motion.div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Link
                  to="/categories"
                  className="block bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
                >
                  {category.image ? (
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-lg font-bold text-white text-center">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="text-xs text-white/80 text-center mt-1 line-clamp-2">
                            {category.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 aspect-square flex items-center justify-center p-4">
                      <div className="text-center">
                        <Package className="w-12 h-12 text-white mx-auto mb-2" />
                        <h3 className="text-lg font-bold text-white">
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            variants={cardVariants}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">{t.categoriesLoading}</p>
          </motion.div>
        )}

        <motion.div 
          className="text-center mt-12"
          variants={cardVariants}
        >
          <Link to="/categories">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
            >
              {t.viewAllCategories}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CategoriesSection;
