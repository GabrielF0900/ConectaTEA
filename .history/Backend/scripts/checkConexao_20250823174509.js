const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const ids = [1,2];
  const profs = await prisma.profissional.findMany({ where: { id: { in: ids } } });
  console.log('por id:', profs);
  const byUsuario = await prisma.profissional.findMany({ where: { usuario_id: { in: ids } } });
  console.log('por usuario_id:', byUsuario);
  await prisma.$disconnect();
})();