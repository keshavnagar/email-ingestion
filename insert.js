const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Check if EmailIngestionConfig exists
  let emailConfig = await prisma.emailIngestionConfig.findFirst({
    where: { id: "config-1" },
  });

  // If EmailIngestionConfig doesn't exist, create it
  if (!emailConfig) {
    emailConfig = await prisma.emailIngestionConfig.create({
      data: {
        id: "config-1",
        emailAddress: "config@example.com",
        connectionType: "IMAP",
      },
    });
  }

  // Insert into EmailMetadata
  await prisma.emailMetadata.create({
    data: {
      id: "test-email-1",
      emailConfigId: emailConfig.id, // Foreign key must match
      fromAddress: "test@example.com",
      createdAt: new Date(),
      dateReceived: new Date(),
      subject: "Test Email Subject",
      attachmentFileName: "attachment.pdf",
    },
  });

  console.log("Data inserted successfully!");
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
