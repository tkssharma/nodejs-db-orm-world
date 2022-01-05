import { PrismaClient } from '@prisma/client'

import express from 'express';
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post('/', async (req: any, res: any) => {
  try {
    const user = await prisma.users.create({
      data: req.body
    });
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
});
const PORT: any = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Drone running on port |${PORT}|`);
})