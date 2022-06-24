const { Router } = require('express');
const bcrypt = require('bcrypt');
const { PrismaClient, Prisma } = require('@prisma/client');

const prisma = new PrismaClient();

const routes = new Router();

// login usuario
routes.post('/login', (req, res) => {
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
routes.get('/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany()
    res.json(posts)
  } catch (error) {
    console.error(error)
  }
})

// Mostrar un registro
routes.get('/post/:id', async (req, res) => {
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
routes.post('/post', async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await prisma.post.create({
      data: { title, content }
    });
    if (res.status(200)) {
      res.json({result: true});
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log('There is a unique constraint violation.')
      }
    }
    res.json({result: false});
    //throw e
  }


})

//Actualizar registro
routes.put('/post/:id', async (req, res) => {
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
routes.delete('/post/:id', async (req, res) => {
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


module.exports = routes;
