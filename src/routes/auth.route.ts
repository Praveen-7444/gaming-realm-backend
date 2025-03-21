import { FastifyInstance } from 'fastify';
import {
    forgotPasswordHandler,
    loginUserHandler,
    logoutUserHandler,
    registerUserHandler,
    verifyOTPHandler,
} from '../controller/handlers/auth.controller';
import {changePasswordHandler} from "../controller/handlers/changepassword.controller"
import {
    forgotPasswordSchema,
    verifyOTPSchema,
} from '../controller/schemas/user.schema';

const forgotPasswordOptions = {
    schema: forgotPasswordSchema,
    handler: forgotPasswordHandler,
};

const verifyOTPOptions = {
    schema: verifyOTPSchema,
    handler: verifyOTPHandler,
};

async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/signup', registerUserHandler);

    fastify.post('/login', loginUserHandler);

  fastify.post("/logout", logoutUserHandler);

  fastify.post("/change-password", changePasswordHandler);

    fastify.post('/forgot-password', forgotPasswordOptions);

    fastify.post('/verify-otp', verifyOTPOptions);
}

export default authRoutes;
