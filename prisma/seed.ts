import { PrismaClient, type Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    id: "1",
    name: "produk1",
    description: "deskripsi produk1",
    stock: 10,
  },
  {
    id: "2",
    name: "produk2",
    description: "deskripsi produk2",
    stock: 20,
  },
  {
    id: "3",
    name: "produk3",
    description: "deskripsi produk3",
    stock: 30,
  },
];

export async function main() {
  try {
    for (const data of productData) {
      await prisma.product.create({ data: data });
    }
    console.log("Seed data berhasil di-generate");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
