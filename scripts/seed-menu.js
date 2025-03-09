const { seedMenu } = require("../src/lib/seed");

console.log("Starting menu seeder...");

seedMenu()
  .then(() => {
    console.log("Menu seeding completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding menu:", error);
    process.exit(1);
  });
