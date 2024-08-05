const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/registerPresence', async (req, res) => {
  const { adolescentId } = req.body;
  const adolescent = await prisma.adolescent.update({
    where: { id: adolescentId },
    data: {
      presences: { increment: 1 },
      points: { increment: 50 },
      presenceLogs: {
        create: { date: new Date() }
      }
    },
    include: { presenceLogs: true }
  });
  res.json(adolescent);
});

app.post('/registerCorrectAnswer', async (req, res) => {
  const { adolescentId, correctAnswers } = req.body;
  const adolescent = await prisma.adolescent.update({
    where: { id: adolescentId },
    data: {
      correctAnswers: { increment: correctAnswers },
      points: { increment: 60 * correctAnswers }
    }
  });
  res.json(adolescent);
});

app.get('/leaderboard', async (req, res) => {
  const leaderboard = await prisma.adolescent.findMany({
    orderBy: { points: 'desc' }
  });
  res.json(leaderboard);
});

app.post('/addAdolescent', async (req, res) => {
  const { name, birthdate } = req.body;
  const adolescent = await prisma.adolescent.create({
    data: {
      name,
      birthdate: new Date(birthdate)
    }
  });
  res.json(adolescent);
});

app.put('/updateAdolescentBirthdate', async (req, res) => {
  const { id, birthdate } = req.body;
  const adolescent = await prisma.adolescent.update({
    where: { id: id },
    data: {
      birthdate: new Date(birthdate)
    }
  });
  res.json(adolescent);
});

app.get('/adolescents', async (req, res) => {
  const adolescents = await prisma.adolescent.findMany();
  res.json(adolescents);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
