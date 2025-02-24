const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const data = await prisma.emailMetadata.findMany(); // Apni table ka naam use karo
  console.log(data);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
