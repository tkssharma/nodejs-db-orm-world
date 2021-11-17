import express from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const app = express();


app.get('/', async (req, res) => {
  const { start, stop, first_name } = req.query;
  try {
    /*
      prisma has alrady been connected to a database with car_owners table
      using the database connection string in a .env file
    */
    const cars = await prisma.car_owners.findMany({
      orderBy: { first_name: 'asc' },
      first: +start, last: +stop,
      where: {
        first_name: first_name.toString()
      }
    });
    return res.status(200).json({ data: cars });
  } catch (error) {
    console.error(error)
  }
})

const PORT: any = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  error ? console.error(error) : console.log(`Drone running on port |${PORT}|`);
})