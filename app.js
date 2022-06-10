const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const morgan = require('morgan');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// login usuario
app.post('/login', (req, res) => {
  const { user, password } = req.body
  const hash = bcrypt.hashSync(password, 10)
  const valPassword = '7477'
  res.json({
    'user': user,
    'password': password,
    'encrypt': hash,
    'length': hash.length,
    'isValid': bcrypt.compareSync(valPassword, hash)
  })
})

// Mostrar todos los registros
app.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany()
    res.json(posts)
  } catch (error) {
    console.error(error)
  }
})

// Mostrar un registro
app.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params
    const post = await prisma.post.findMany({
      where: { id: Number(id) }
    })
    res.json(post)
  } catch (error) {
    console.error(error)
  }
})

// Crear un registro
app.post('/post', async (req, res) => {
  try {
    const { title, content } = req.body
    result = await prisma.post.create({
      data: { title, content }
    })
    res.json(result)
  } catch (error) {
    console.error(error)
  }
})

//Actualizar registro
app.put('/post/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, content } = req.body
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content }
    })
    res.json(post);
  } catch (error) {
    console.error(error)
  }
})

//Elimiar registro
app.delete('/post/:id', async (req, res) => {
  try {
    const { id } = req.params
    const post = await prisma.post.delete({
      where: { id: Number(id) }
    })
    res.json({ 'message': 'Eliminado' });
  } catch (error) {
    console.error(error)
  }
})


app.listen(4000, () => {
  console.log('Servidor localhost:4000 escuchando.');
});

