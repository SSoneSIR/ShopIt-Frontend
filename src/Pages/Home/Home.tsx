import { useState, useRef, useEffect } from "react";
import Header from "../../components/layout/Header";
import CategoryCard from "../../components/cards/CategoryCard";
import ProductCard from "../../components/cards/ProductCards";
import CategoryTabs from "./components/CategoryTabs";
import { Body } from "./components/Body";
import CartSidebar from "./components/CartSideBar";
import CartToast from "../../components/feedback/CartToast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { popularCategories, categoryTabs } from "../../data/categories";
import { allProducts } from "../../data/products";
import type { Product } from "../../data/products";
import ProductCardSkeleton from "../../components/skeletons/ProductCardSkeleton";
import CategoryCardSkeleton from "../../components/skeletons/CategoryCardSkeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function HomePage() {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    handleAddToCart: addToCart,
    handleUpdateQuantity,
    handleRemoveItem,
  } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCategoryCard, setActiveCategoryCard] = useState<string | null>(
    null
  );
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<string>("");
  const [lastAddedItemImage, setLastAddedItemImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const lastCartItem = cartItems.find((item) => item.name === lastAddedItem);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleProductClick = (product: Product) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${product.id}`);
  };

  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleCategoryCardClick = (categoryName: string) => {
    setActiveCategoryCard(categoryName);
    setTimeout(() => {
      categoryRefs.current[categoryName]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleAddToCart = (product: Product, event?: any) => {
    addToCart(product);

    setLastAddedItem(product.name);
    setLastAddedItemImage(product.image);
    setShowToast(true);

    if (event?.target) {
      const button = event.target.closest("button");
      if (button) {
        button.classList.add("animate-flick");
        setTimeout(() => {
          button.classList.remove("animate-flick");
        }, 500);
      }
    }
  };

  const getFilteredProductsForCategory = (categoryName: string) => {
    const categoryProducts = allProducts.filter(
      (product) => product.categoryCard === categoryName
    );

    if (activeCategory === "All") {
      return categoryProducts;
    }

    return categoryProducts.filter(
      (product) => product.category === activeCategory
    );
  };

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        onCloseCart={() => setIsCartOpen(false)}
      />
      <div
        className={`transition-all duration-300 ease-in-out ${
          isCartOpen ? "mr-[28rem]" : "mr-0"
        }`}
      >
        <Body />
        <main className="max-w-7xl mx-auto px-6 py-6">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-foreground font-bold text-xl">
                Popular Categories
              </h2>
              <button className="text-primary text-sm font-medium hover:underline cursor-pointer text-green-900">
                See All
              </button>
            </div>

            {/* Carousel for Mobile */}
            <div className="md:hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <CategoryCardSkeleton />
                        </CarouselItem>
                      ))
                    : popularCategories.map((category) => (
                        <CarouselItem key={category.name}>
                          <CategoryCard
                            {...category}
                            onClick={() =>
                              handleCategoryCardClick(category.name)
                            }
                            isActive={activeCategoryCard === category.name}
                          />
                        </CarouselItem>
                      ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Grid for Desktop */}
            <div
              className={`hidden md:grid gap-4 transition-all duration-300 ${
                isCartOpen
                  ? "grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
                  : "grid-cols-2 md:grid-cols-4"
              }`}
            >
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <CategoryCardSkeleton key={index} />
                  ))
                : popularCategories.map((category) => (
                    <CategoryCard
                      key={category.name}
                      {...category}
                      onClick={() => handleCategoryCardClick(category.name)}
                      isActive={activeCategoryCard === category.name}
                    />
                  ))}
            </div>
          </div>

          <div className="mb-6">
            <CategoryTabs
              categories={categoryTabs}
              activeCategory={activeCategory}
              onCategoryChange={(cat) => {
                setActiveCategory(cat);
                setActiveCategoryCard(null);
              }}
            />
          </div>

          <div>
            {popularCategories.map((category) => {
              const categoryProducts = getFilteredProductsForCategory(
                category.name
              );

              if (categoryProducts.length === 0) return null;

              return (
                <div
                  key={category.name}
                  className="mb-8"
                  ref={(el) => {
                    categoryRefs.current[category.name] = el;
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg ${category.bgColor}`}
                    >
                      <img
                        src={category.images[0]}
                        alt={category.name}
                        className="w-10 h-10 object-contain flex-shrink-0"
                      />
                      <h2 className="text-foreground font-bold text-lg">
                        {category.name}
                      </h2>
                    </div>
                    <button className="text-primary text-sm font-medium hover:underline cursor-pointer text-green-900">
                      See All
                    </button>
                  </div>
                  <div
                    className={`grid gap-4 transition-all duration-300 ${
                      isCartOpen
                        ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
                    }`}
                  >
                    {isLoading
                      ? Array.from({ length: 8 }).map((_, index) => (
                          <ProductCardSkeleton key={index} />
                        ))
                      : categoryProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            {...product}
                            onAddToCart={(event) =>
                              handleAddToCart(product, event)
                            }
                            onClick={() => handleProductClick(product)}
                          />
                        ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        isLoading={isLoading}
      />
      <CartToast
        isVisible={showToast}
        itemName={lastAddedItem}
        itemImage={lastAddedItemImage}
        itemId={lastCartItem?.id ?? 0}
        currentQuantity={lastCartItem?.quantity ?? 1}
        quantityAdded={1}
        itemPrice={lastCartItem?.price ?? 0}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onViewCart={() => {
          setShowToast(false);
          setIsCartOpen(true);
        }}
        onClose={() => setShowToast(false)}
      />

      <style>{`
        @keyframes flick {
          0% { transform: scale(1); }
          25% { transform: scale(0.9); }
          50% { transform: scale(1.1); }
          75% { transform: scale(0.95); }
          100% { transform: scale(1); }
        }
        .animate-flick {
          animation: flick 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
}
