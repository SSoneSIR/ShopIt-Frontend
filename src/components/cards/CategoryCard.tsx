interface CategoryCardProps {
  name: string;
  images: string[];
  bgColor: string;
  onClick: () => void;
  isActive?: boolean;
}

const CategoryCard = ({
  name,
  images,
  bgColor,
  onClick,
  isActive,
}: CategoryCardProps) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      className={`relative ${bgColor} rounded-xl md:rounded-2xl lg:rounded-[20px] w-full aspect-[3/2] cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-card-hover overflow-hidden ${
        isActive ? "ring-2 ring-primary ring-offset-2" : ""
      }`}
    >
      {/* Title */}
      <p className="absolute bold top-3 left-3 md:top-4 md:left-4 text-foreground font-semibold text-sm md:text-base lg:text-lg xl:text-xl z-10 leading-tight max-w-[50%] md:max-w-[45%]">
        {name}
      </p>

      {/* Image group at bottom-right */}
      <div className="absolute bottom-0 right-0 w-[70%] md:w-[75%] h-[75%] md:h-[80%] flex items-end justify-end p-1 md:p-0">
        {images.map((imgSrc, idx) => (
          <img
            key={idx}
            src={imgSrc}
            alt={`${name}-${idx}`}
            className="object-contain max-h-full w-auto drop-shadow-product"
            style={{
              marginLeft: idx > 0 ? "-12px" : "0",
              zIndex: images.length - idx,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
