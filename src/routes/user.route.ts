import { FastifyInstance } from "fastify";
import { getPreference, setPreference } from "../controller/handlers/user.controller";



async function userRoutes(fastify: FastifyInstance) {


  fastify.get('/:id/preference', getPreference);
  fastify.put('/:id/preference', setPreference);

// to get the list of all users
  fastify.get('/', async (request, reply) => {
    // const users = await fastify.prisma.user.findMany();
    // reply.send(users);
    console.log('users');
    reply.send('users');
  });


// to get a single user by id
  fastify.get('/:id/settings', async (request, reply) => {
 
    console.log(' single user');
    reply.send('single user');
  });

// to update a user
fastify.put('/:id/settings', async (request, reply) => {
 
  console.log('update User');
  reply.send('update User');
});
  

fastify.get('/:id/stats', async (request, reply) => {
 
  console.log('stats');
  reply.send('stats')
});

fastify.get('games/:id/stats', async (request, reply) => {
 
  console.log('games');
  reply.send('games');
});


fastify.get('/:id', async (request, reply) => {

  console.log('id');
  reply.send('id');
});




}

export default userRoutes;  