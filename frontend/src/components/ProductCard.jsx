import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const ProductCard = ({ product }) => {

  return (
    <Link to={`/product/${product.id}`} className="card overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={product.image || 'https://via.placeholder.com/400x300?text=Medical+Test'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            -{product.discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-textDark mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          {product.originalPrice > product.discountedPrice && (
            <span className="text-gray-500 line-through text-sm">
              ₹{product.originalPrice}
            </span>
          )}
          <span className="text-2xl font-bold text-primary">
            ₹{product.discountedPrice}
          </span>
        </div>

        {/* Book Now Button */}
        <div className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold">
          <Calendar className="w-5 h-5" />
          <span>Book Now</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
