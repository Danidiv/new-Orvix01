interface LocalPortfolioImage {
  id: number;
  category: "corporate" | "wedding" | "food";
  title: string;
  image: string;
  video: false;
}

const corporateTitles = [
  "Business Networking",
  "Executive Team Portrait",
  "Leadership Summit",
  "Corporate Conference",
  "Team Strategy Session",
  "Executive Headshot",
  "Business Leadership",
  "Corporate Celebration",
  "Professional Panel",
  "Business Summit Highlights",
  "Corporate Awards Evening",
  "Brand Forum",
  "Industry Conference",
  "Executive Discussion",
  "Leadership Panel",
  "Corporate Gala",
  "Business Conference",
  "Team Achievement",
  "Professional Presentation",
  "Executive Interview",
  "Leadership in Focus",
  "Corporate Editorial Portrait",
  "Business Portrait",
  "Executive Studio Portrait",
  "Professional Profile",
  "Modern Leadership Portrait",
  "Confident Executive",
  "Corporate Chair Portrait",
  "Studio Executive Portrait",
  "Business Leader",
  "Corporate Team",
  "Leadership Group Portrait",
  "Executive Lineup",
  "Team Members",
  "Professional Team",
  "Corporate Partners",
  "Business Community",
  "Executive Portrait",
  "Modern Corporate Portrait",
  "Leadership Portrait",
  "Brand Ambassador",
  "Professional Headshot",
  "Studio Business Portrait",
  "Executive Fashion Portrait",
  "Corporate Individual Portrait",
  "Businesswoman Portrait",
  "Executive Studio Session",
  "Leadership Portrait Series",
  "Team Executive Portrait",
  "Professional Brand Portrait",
  "Corporate Profile",
  "Business Portrait Session",
  "Executive Brand Portrait",
  "Modern Leadership",
  "Corporate Portrait",
  "Leadership Campaign",
  "Executive Portrait Series",
  "Professional Corporate Portrait",
];

const weddingTitles = [
  "Wedding City Portrait",
  "Bride and Groom",
  "Wedding Ceremony",
  "Garden Wedding",
  "Bride in the City",
  "Wedding Sunset",
  "Sunset Couple Portrait",
  "Elegant Wedding Couple",
  "Bride and Groom at Sunset",
  "Dubai Wedding Portrait",
  "Wedding Portrait by the Sea",
  "Romantic Beach Wedding",
  "Oceanfront Wedding",
  "Classic Wedding Portrait",
  "Wedding Couple in the City",
  "Wedding Celebration",
  "Traditional Wedding Ceremony",
  "Bridal Portrait",
  "Indian Wedding Ceremony",
  "Bride and Groom Portrait",
  "Wedding Reception",
  "Luxury Wedding Portrait",
  "Golden Hour Wedding",
  "Wedding Arch Portrait",
  "Mountain Wedding",
  "Romantic Couple Moment",
  "Wedding at the Beach",
  "Elegant Bridal Portrait",
  "Wedding Journey",
  "Bride on the Shore",
  "Desert Wedding Portrait",
  "Classic Bridal Look",
  "Wedding Memories",
  "Outdoor Wedding",
  "Wedding Couple Embrace",
  "Modern Wedding Portrait",
  "Wedding Celebration Moment",
  "Night Wedding Portrait",
  "Wedding by the Marina",
  "Wedding Details",
  "Wedding Dress Portrait",
  "Luxury Bridal Portrait",
  "Wedding Couple Story",
  "Bride with Bouquet",
  "Wedding Day Portrait",
  "Bridal Elegance",
  "Wedding in the City",
  "Couple Portrait",
  "Wedding Moment",
  "Bridal Fashion Portrait",
  "Wedding Event",
  "Romantic Wedding",
  "Couple Celebration",
  "Wedding Highlights",
  "Bride and Groom in the City",
  "Elegant Wedding Day",
  "Wedding Portrait Session",
  "Romantic Ceremony",
  "Wedding Memories in Dubai",
  "Destination Wedding",
  "Wedding Reception Portrait",
  "Bride & Groom",
  "Wedding Day Celebration",
  "Bridal Portrait Series",
  "Wedding Couple Collection",
  "Wedding Ceremony Details",
  "Luxury Wedding Ceremony",
  "Wedding Fashion Portrait",
  "Golden Wedding Moment",
  "Wedding Celebration Portrait",
  "Bride & Groom Moment",
  "Wedding Album",
  "Wedding Love Story",
  "Wedding Portrait Collection",
  "Wedding Arch Ceremony",
  "Wedding Party",
  "Wedding Celebration Highlights",
  "Bride's Final Portrait",
  "Wedding Day Memories",
];

const foodTitles: Record<string, string> = {
  "IMG_1823": "Catering Selection",
  "IMG_1824": "Sweet Dessert Finish",
  "IMG_1825": "Fresh Garden Salad",
  "IMG_1826": "Gourmet Dinner",
  "IMG_1827": "Seasonal Fresh Dish",
  "IMG_1828": "Chef's Plated Creation",
  "IMG_1829": "Fine Dining Experience",
  "IMG_1830": "Elegant Restaurant Plate",
  "IMG_1831": "Table of Shared Plates",
  "IMG_1832": "Chef's Garden Dish",
  "IMG_1833": "Fresh Table Appetizers",
  "IMG_1834": "Colorful Seasonal Salad",
  "IMG_1835": "Restaurant Story",
  "IMG_1836": "Signature Gourmet Plate",
  "IMG_1837": "Mediterranean Dish",
  "IMG_1838": "Chef's Final Touch",
  "IMG_1839": "Fresh Lunch Selection",
  "IMG_1840": "Artisan Plate",
  "IMG_1841": "Dinner at the Table",
  "IMG_1842": "Seasonal Vegetarian Dish",
  "IMG_1843": "Restaurant Menu Feature",
  "IMG_1844": "Fresh Gourmet Meal",
  "IMG_1845": "Culinary Presentation",
  "business-people-choosing-snacks-buffet-table": "Corporate Buffet",
  "chicken-gardenblue-with-vegetables-plate": "Chicken Garden Plate",
  "fried-meat-with-herbs-pomegranate": "Herbed Meat with Pomegranate",
  "fresh-vegetable-salad-table": "Fresh Vegetable Table",
  "onion-rings-batter-with-sauce-tomato": "Onion Rings and Tomato Sauce",
  "side-view-boiled-rice-meat-cherries": "Rice, Meat and Cherries",
};

const imageModules = import.meta.glob<string>(
  "../assets/portfolio/**/*.{jpg,JPG,jpeg,JPEG}",
  { eager: true, query: "?url", import: "default" }
);

const categoryCounters = { corporate: 0, wedding: 0, food: 0 };

export const LOCAL_PORTFOLIO_IMAGES: LocalPortfolioImage[] = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, image], index): LocalPortfolioImage => {
    const normalized = path.replace(/\\/g, "/").toLowerCase();
    const fileName = path.split("/").pop()?.replace(/\.[^.]+$/, "") ?? `Portfolio ${index + 1}`;
    const namedFood = !!foodTitles[fileName];
    const category = namedFood
      ? "food"
      : normalized.includes("/corporate/")
      ? "corporate"
      : normalized.includes("/wedding/")
        ? "wedding"
        : "food";
    const counter = categoryCounters[category];
    categoryCounters[category] += 1;

    let title =
      category === "corporate"
        ? corporateTitles[counter] ?? `Corporate Project ${counter + 1}`
        : category === "wedding"
          ? weddingTitles[counter] ?? `Wedding Story ${counter + 1}`
          : foodTitles[fileName] ?? `Culinary Story ${counter + 1}`;

    if (category === "corporate" && foodTitles[fileName]) title = foodTitles[fileName];

    return {
      id: 10000 + index + 1,
      category,
      title,
      image,
      video: false,
    };
  });
