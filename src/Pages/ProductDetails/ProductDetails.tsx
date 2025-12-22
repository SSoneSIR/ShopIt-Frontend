import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";
import CategoryCard from "../../components/cards/CategoryCard";
import ProductCard from "../../components/cards/ProductCards";
import { ChevronDown, ChevronUp, Truck } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { allProducts } from "../../data/products";
import { popularCategories } from "../../data/categories";
import type { Product } from "../../data/products";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cartItems, cartCount, handleAddToCart, handleUpdateQuantity } =
    useCart();

  const productId = id ? parseInt(id) : null;
  const selectedProduct = productId
    ? allProducts.find((p) => p.id === productId)
    : null;

  const [showAllSimilar, setShowAllSimilar] = useState(false);
  const [showAllRelated, setShowAllRelated] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [showCheckoutButton, setShowCheckoutButton] = useState(false);
  const [detailViewCategory, setDetailViewCategory] = useState<string>(
    selectedProduct?.categoryCard || "All"
  );

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const handleProductClick = (productId: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${productId}`);
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header cartCount={cartCount} />
        <div className="container mx-auto px-4 py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const getRelatedProducts = (categoryCard: string) => {
    if (categoryCard === "All") {
      return allProducts.filter((p) => p.id !== selectedProduct.id);
    }
    return allProducts.filter(
      (p) => p.categoryCard === categoryCard && p.id !== selectedProduct.id
    );
  };

  const getSimilarProducts = () => {
    return allProducts.filter(
      (p) => p.name === selectedProduct.name && p.id !== selectedProduct.id
    );
  };

  const handleAddToCartClick = (product: Product, event?: React.MouseEvent) => {
    event?.stopPropagation();
    handleAddToCart(product);
    if (product.id === selectedProduct.id) {
      setShowCheckoutButton(true);
    }
  };

  const similarProducts = getSimilarProducts();
  const relatedProducts = getRelatedProducts(detailViewCategory);
  const displayedSimilarProducts = showAllSimilar
    ? similarProducts.slice(0, 5)
    : similarProducts.slice(0, 3);
  const displayedRelatedProducts = showAllRelated
    ? relatedProducts
    : relatedProducts.slice(0, 8);

  const isInCart = cartItems.find((item) => item.id === selectedProduct.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex justify-center">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl w-full">
            {/* Product Image */}
            <div
              className="bg-gray-100 rounded-lg p-4 flex items-center justify-center flex-shrink-0"
              style={{ width: "180px", height: "180px" }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-500 mb-6 font-medium transition-colors cursor-pointer"
              >
                <span className="flex items-start justify-center w-8 h-8 bg-white rounded-md shadow-md text-green-600 font-bold text-lg">
                  &lt;
                </span>
              </button>
              <h1 className="text-lg font-bold text-gray-900 mb-2">
                {selectedProduct.name}
              </h1>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex text-yellow-400"
                  style={{ fontSize: "14px" }}
                >
                  {"★".repeat(Math.floor(selectedProduct.rating))}
                  {"☆".repeat(5 - Math.floor(selectedProduct.rating))}
                </div>
                <span className="text-gray-600" style={{ fontSize: "13px" }}>
                  ({selectedProduct.rating})
                </span>
                <div
                  className="flex items-center gap-1 text-green-600"
                  style={{ fontSize: "13px" }}
                >
                  <Truck className="w-4 h-4" />
                  <span>Delivered Today</span>
                </div>
              </div>
              <div className="mb-4">
                {selectedProduct.discount && (
                  <div className="mb-1.5">
                    <span
                      className="bg-red-500 text-white font-semibold px-2 py-1 rounded"
                      style={{ fontSize: "12px" }}
                    >
                      {selectedProduct.discount}
                    </span>
                  </div>
                )}
                {selectedProduct.originalPrice && (
                  <div
                    className="text-gray-400 line-through"
                    style={{ fontSize: "13px" }}
                  >
                    Rs. {selectedProduct.originalPrice}
                  </div>
                )}
                <div className="text-xl font-bold text-gray-900">
                  Rs. {selectedProduct.price}
                </div>
              </div>

              {/* Add to Cart / Quantity Controls */}
              {isInCart ? (
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          selectedProduct.id,
                          isInCart.quantity - 1
                        )
                      }
                      className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <div className="px-8 py-2 bg-gray-100 rounded-lg font-semibold text-gray-900">
                      {isInCart.quantity}
                    </div>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          selectedProduct.id,
                          isInCart.quantity + 1
                        )
                      }
                      className="w-10 h-10 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  {showCheckoutButton && (
                    <button
                      onClick={() => navigate("/checkout")}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer py-3 px-6 rounded-3xl flex items-center justify-center gap-1.5 transition-colors"
                      style={{ width: "fit-content", fontSize: "14px" }}
                    >
                      Checkout
                    </button>
                  )}
                </div>
              ) : (
                <div className="mb-4">
                  <button
                    onClick={(e) => handleAddToCartClick(selectedProduct, e)}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium cursor-pointer py-3 px-6 rounded-3xl flex items-center justify-center gap-1.5 transition-colors"
                    style={{ width: "fit-content", fontSize: "14px" }}
                  >
                    <span>+</span>
                    Add to Cart
                  </button>
                </div>
              )}

              <div className="border-t border-gray-200 mb-3"></div>

              {/* Description */}
              <div className="mb-2">
                <h3 className="font-bold mb-1" style={{ fontSize: "12px" }}>
                  Description:
                </h3>
                <p
                  className={`text-gray-600 leading-relaxed ${
                    expandedDescription ? "" : "line-clamp-3"
                  }`}
                  style={{
                    fontSize: expandedDescription ? "12px" : "11px",
                    maxWidth: "600px",
                    transition: "font-size 0.3s ease",
                  }}
                >
                  2PM noodles bring authentic Asian & Thai flavour with
                  chickpeas, bar for ingredients. Packed with natural spices and
                  nutrients. They're a quick, healthy, and delicious meal in
                  minutes!
                  {expandedDescription && (
                    <>
                      {" "}
                      2PM noodles bring authentic Asian & Thai flavour with
                      chickpeas, bar for ingredients. Packed with natural spices
                      and nutrients. They're a quick, healthy, and delicious
                      meal in minutes! Perfect for busy lifestyles, these
                      noodles combine convenience with taste. Made with premium
                      ingredients sourced from local farms, ensuring freshness
                      and quality in every bite.
                    </>
                  )}
                </p>
                <button
                  onClick={() => setExpandedDescription(!expandedDescription)}
                  className="text-green-600 hover:text-green-700 font-medium mt-2 flex items-center gap-1 text-xs"
                >
                  {expandedDescription ? (
                    <>
                      Show Less <ChevronUp className="w-3 h-3" />
                    </>
                  ) : (
                    <>
                      Show More <ChevronDown className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>

              {/* Product Details */}
              <div className="mb-3">
                <h3 className="font-bold mb-1" style={{ fontSize: "12px" }}>
                  Product Details:
                </h3>
                <div style={{ fontSize: "11px" }}>
                  <div className="flex">
                    <span className="font-semibold" style={{ width: "80px" }}>
                      Net weight:
                    </span>
                    <span className="text-gray-600">
                      {selectedProduct.weight}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold" style={{ width: "80px" }}>
                      Detail 1:
                    </span>
                    <span className="text-gray-600">Details</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold" style={{ width: "80px" }}>
                      Detail 2:
                    </span>
                    <span className="text-gray-600">Details</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold" style={{ width: "80px" }}>
                      Detail 3:
                    </span>
                    <span className="text-gray-600 hover:underline cursor-pointer">
                      Details
                    </span>
                  </div>
                </div>
              </div>

              {/* Similar Products */}
              <div className="mb-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold" style={{ fontSize: "13px" }}>
                    More Similar Products:
                  </h3>
                  {similarProducts.length > 3 && (
                    <button
                      onClick={() => setShowAllSimilar(!showAllSimilar)}
                      className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1 text-xs"
                    >
                      {showAllSimilar ? (
                        <>
                          Show Less <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          See More <ChevronDown className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  )}
                </div>
                {similarProducts.length > 0 ? (
                  <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                    {displayedSimilarProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={(e) => handleAddToCartClick(product, e)}
                        onClick={() => handleProductClick(product.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p style={{ fontSize: "13px" }}>
                      No similar products available at the moment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Cards */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Popular Categories
          </h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {popularCategories.map((category) => (
              <CategoryCard
                key={category.name}
                {...category}
                onClick={() => {
                  setDetailViewCategory(category.name);
                }}
                isActive={detailViewCategory === category.name}
              />
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div id="related-products" className="mb-8 mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              {detailViewCategory === "All"
                ? "All Products"
                : `More ${detailViewCategory} Products`}
            </h2>
            {relatedProducts.length > 8 && (
              <button
                onClick={() => setShowAllRelated(!showAllRelated)}
                className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
              >
                {showAllRelated ? (
                  <>
                    Show Less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    See More <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {displayedRelatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={(e?: any) => handleAddToCartClick(product, e)}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
