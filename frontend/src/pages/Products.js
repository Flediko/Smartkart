import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setFilters, clearFilters } from '../store/slices/productSlice';
import { FiFilter, FiX, FiStar, FiShoppingCart } from 'react-icons/fi';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const { products, loading, totalPages, currentPage, total, filters } = useSelector(
    (state) => state.products
  );

  const categories = [
    'All',
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Toys',
    'Other'
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Newest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name: A to Z' }
  ];

  useEffect(() => {
    // Initialize filters from URL params
    const urlFilters = {
      category: searchParams.get('category') || '',
      search: searchParams.get('search') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sortBy: searchParams.get('sortBy') || 'createdAt',
      sortOrder: searchParams.get('sortOrder') || 'desc',
      page: searchParams.get('page') || 1
    };
    
    dispatch(setFilters(urlFilters));
  }, [dispatch, searchParams]);

  useEffect(() => {
    // Fetch products when filters change
    const params = {
      ...filters,
      page: currentPage
    };
    dispatch(fetchProducts(params));
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    dispatch(setFilters(newFilters));
    
    // Update URL
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== 'All') {
        newSearchParams.set(k, v);
      }
    });
    setSearchParams(newSearchParams);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setSearchParams({});
  };

  const handlePageChange = (page) => {
    dispatch(setFilters({ page }));
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', page);
      return newParams;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={filters.category === category || (category === 'All' && !filters.category)}
                      onChange={(e) => handleFilterChange('category', e.target.value === 'All' ? '' : e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Sort By</h4>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFilterChange('sortBy', sortBy);
                  handleFilterChange('sortOrder', sortOrder);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleClearFilters}
              className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Products</h1>
              <p className="text-gray-600">
                {total} products found
                {filters.search && ` for "${filters.search}"`}
                {filters.category && filters.category !== 'All' && ` in ${filters.category}`}
              </p>
            </div>
            
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FiFilter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="spinner"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-blue-600 hover:text-blue-700 underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
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
                      
                      <div className="flex items-center justify-between mb-4">
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
                        <span className="text-sm text-gray-500">
                          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                      
                      <Link
                        to={`/products/${product._id}`}
                        className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-2 border rounded-lg ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;