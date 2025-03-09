import { connectToDatabase } from "./mongodb";

const menuItems = [
  {
    category: "Biriyani & Rice",
    items: [
      {
        name: "Kacchi Biriyani",
        description: "Traditional Dhaka-style mutton kacchi biriyani with tender meat and aromatic rice",
        price: 450,
        image: "/images/menu/kacchi-biriyani.jpg",
        isPopular: true,
        isVegetarian: false,
        spiceLevel: "medium",
      },
      {
        name: "Morog Polao",
        description: "Fragrant rice cooked with chicken, ghee, and aromatic spices",
        price: 380,
        image: "/images/menu/morog-polao.jpg",
        isPopular: true,
        isVegetarian: false,
        spiceLevel: "mild",
      },
      {
        name: "Bhuna Khichuri",
        description: "Classic Bengali yellow rice cooked with lentils and vegetables",
        price: 280,
        image: "/images/menu/bhuna-khichuri.jpg",
        isPopular: false,
        isVegetarian: true,
        spiceLevel: "mild",
      },
    ],
  },
  {
    category: "Curries",
    items: [
      {
        name: "Beef Bhuna",
        description: "Slow-cooked beef in rich aromatic spices and caramelized onions",
        price: 320,
        image: "/images/menu/beef-bhuna.jpg",
        isPopular: true,
        isVegetarian: false,
        spiceLevel: "hot",
      },
      {
        name: "Ilish Paturi",
        description: "Hilsa fish marinated in mustard paste, wrapped in banana leaf and steamed",
        price: 420,
        image: "/images/menu/ilish-paturi.jpg",
        isPopular: true,
        isVegetarian: false,
        spiceLevel: "medium",
      },
      {
        name: "Chingri Malai Curry",
        description: "Prawns cooked in coconut milk with mild spices",
        price: 380,
        image: "/images/menu/chingri-malai.jpg",
        isPopular: false,
        isVegetarian: false,
        spiceLevel: "mild",
      },
    ],
  },
  {
    category: "Appetizers",
    items: [
      {
        name: "Shammi Kabab",
        description: "Minced meat patties with aromatic spices and herbs",
        price: 220,
        image: "/images/menu/shammi-kabab.jpg",
        isPopular: true,
        isVegetarian: false,
        spiceLevel: "medium",
      },
      {
        name: "Beguni",
        description: "Crispy eggplant fritters - a Bengali monsoon favorite",
        price: 120,
        image: "/images/menu/beguni.jpg",
        isPopular: false,
        isVegetarian: true,
        spiceLevel: "mild",
      },
      {
        name: "Dhakai Fuchka",
        description: "Crispy shells filled with spicy potato mix and tamarind water",
        price: 150,
        image: "/images/menu/fuchka.jpg",
        isPopular: true,
        isVegetarian: true,
        spiceLevel: "hot",
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Mishti Doi",
        description: "Traditional Bengali sweet yogurt in earthen pot",
        price: 120,
        image: "/images/menu/mishti-doi.jpg",
        isPopular: true,
        isVegetarian: true,
        spiceLevel: "none",
      },
      {
        name: "Roshmalai",
        description: "Soft cottage cheese dumplings in saffron-flavored milk",
        price: 150,
        image: "/images/menu/roshmalai.jpg",
        isPopular: true,
        isVegetarian: true,
        spiceLevel: "none",
      },
      {
        name: "Patishapta",
        description: "Rice crepes with coconut and jaggery filling",
        price: 100,
        image: "/images/menu/patishapta.jpg",
        isPopular: false,
        isVegetarian: true,
        spiceLevel: "none",
      },
    ],
  },
];

export async function seedMenu() {
  try {
    const { db } = await connectToDatabase();

    // Clear existing menu items
    await db.collection("menu").deleteMany({});

    // Insert categories and items
    for (const category of menuItems) {
      const items = category.items.map((item) => ({
        ...item,
        category: category.category,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await db.collection("menu").insertMany(items);
    }

    console.log("Menu seeded successfully!");
  } catch (error) {
    console.error("Error seeding menu:", error);
    throw error;
  }
}

// Export menuItems for use in other parts of the application
export { menuItems };

// Create a script to run the seeder
if (require.main === module) {
  seedMenu()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
