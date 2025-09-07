import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, addReview } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { FiStar, FiShoppingCart, FiHeart, FiMinus, FiPlus, FiCheck } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  
  const { currentProduct, loading } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    dispatch(addToCart({ productId: id, quantity }));
    toast.success('Item added to cart!');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to add a review');
      return;
    }

    dispatch(addReview({
      productId: id,
      rating: reviewData.rating,
      comment: reviewData.comment
    }));
    
    setReviewData({ rating: 5, comment: '' });
    setShowReviewForm(false);
    toast.success('Review added successfully!');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= currentProduct?.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-12">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const displayPrice = currentProduct.onSale && currentProduct.salePrice 
    ? currentProduct.salePrice 
    : currentProduct.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={currentProduct.images[selectedImage]}
              alt={currentProduct.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          
          {currentProduct.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {currentProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${currentProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            {currentProduct.onSale && (
              <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                Sale
              </span>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{currentProduct.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(currentProduct.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {currentProduct.rating.toFixed(1)} ({currentProduct.numReviews} reviews)
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-4 mb-4">
              {currentProduct.onSale && currentProduct.salePrice ? (
                <>
                  <span className="text-3xl font-bold text-red-600">
                    ${currentProduct.salePrice}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${currentProduct.price}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ${currentProduct.price}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4">{currentProduct.description}</p>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Brand:</span> {currentProduct.brand}</p>
              <p><span className="font-medium">Category:</span> {currentProduct.category}</p>
              <p><span className="font-medium">Stock:</span> 
                <span className={currentProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {currentProduct.stock > 0 ? ` ${currentProduct.stock} available` : ' Out of stock'}
                </span>
              </p>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          {currentProduct.stock > 0 && (
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <FiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <FiHeart className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Reviews</h2>
          {isAuthenticated && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Write a Review
            </button>
          )}
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className={`w-8 h-8 ${
                        star <= reviewData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    >
                      <FiStar className="w-full h-full" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Comment</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Share your thoughts about this product..."
                  required
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
          <div className="space-y-4">
            {currentProduct.reviews.map((review, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{review.name}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;