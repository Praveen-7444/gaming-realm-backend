import Fastify from 'fastify';

const fastify = Fastify();


import fastifyCookie from "@fastify/cookie";

fastify.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET, 
});


import userRoutes from './src/routes/user.route';
import authRoutes from './src/routes/auth.route';

fastify.register(userRoutes, { prefix: '/api/users'});
fastify.register(authRoutes, { prefix: '/api/auth'});




fastify.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at http://localhost:${process.env.PORT || 8000}`);
});


