import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeaturedProducts } from '../store/slices/productSlice';
import { FiStar, FiShoppingCart, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (featuredProducts.length === 0) {
      dispatch(fetchFeaturedProducts());
    }
  }, [dispatch, featuredProducts.length]);

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', link: '/products?category=Electronics' },
    { name: 'Clothing', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400', link: '/products?category=Clothing' },
    { name: 'Books', image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400', link: '/products?category=Books' },
    { name: 'Home & Garden', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', link: '/products?category=Home & Garden' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to MERN Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover amazing products at unbeatable prices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Shop Now
              <FiArrowRight className="ml-2" />
            </Link>
            <Link
              to="/products?featured=true"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Featured Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-lg font-semibold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link
              to="/products?featured=true"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              View All
              <FiArrowRight className="ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <div key={product._id} className="card group">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.onSale && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Sale
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                        <FiShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        ({product.numReviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {product.onSale && product.salePrice ? (
                          <>
                            <span className="text-lg font-bold text-red-600">
                              ${product.salePrice}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${product.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Link
                      to={`/products/${product._id}`}
                      className="block mt-4 w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShoppingCart className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $50</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully curated products from trusted brands</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiArrowRight className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;