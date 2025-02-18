import { prisma } from './index';

async function main() {
  await prisma.division.createMany({
    data: [
      { id: 1, name: 'Operations' },
      { id: 2, name: 'Marketing' },
      { id: 3, name: 'Finance' },
      { id: 4, name: 'Human Resources' },
      { id: 5, name: 'IT' },
      { id: 6, name: 'Sales' },
      { id: 7, name: 'Customer Service' },
    ],
  });

  await prisma.position.create({
    data: {
      id: 1,
      title: '',
      divisionId: 1,
      x: 550,
      y: 100,
    },
  });

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
