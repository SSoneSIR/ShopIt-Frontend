import img1 from "/assets/Body/img1.webp";
import img2 from "/assets/Body/img2.webp";
import img3 from "/assets/Body/img3.webp";
import img4 from "/assets/Body/img4.webp";

function Body() {
  const promoCards = [
    {
      image: img1,
      alt: "EveryDay Necessities Promo",
    },
    {
      image: img2,
      alt: "Dry Snacks Promo",
    },
    {
      image: img3,
      alt: "Free Delivery Promo",
    },
    {
      image: img4,
      alt: "Home Appliances Promo",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Promo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {promoCards.map((card, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <img
              src={card.image}
              alt={card.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              width="600"
              height="300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Body };
