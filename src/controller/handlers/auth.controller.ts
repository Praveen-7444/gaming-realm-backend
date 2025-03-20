import { FastifyReply, FastifyRequest } from 'fastify';
import { createUser, findUserByEmail } from '../../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import { sendRandomPasswordEmail, sendResetOtpEmail } from './nodemailer';
import prisma from '../../utility/prisma';

export async function registerUserHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const body = request.body as CreateUserInput;

        const existingUser = await findUserByEmail(body.email);
        if (existingUser) {
            return reply.status(400).send({ message: 'User already exists' });
        }

        const user = await createUser(body);

        const { name, email, username } = user;
        reply.status(201).send({
            message: 'User created successfully',
            user: { name, email, username },
        });
    } catch (error) {
        reply.status(500).send({ message: 'Error registering user' });
    }
}

export async function loginUserHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const { email, password } = request.body as {
            email: string;
            password: string;
        };

        const user = await findUserByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return reply.status(400).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );
        reply
            .setCookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 3600,
            })
            .send({ message: 'Login successful', token });
    } catch (error) {
        reply.status(500).send({ message: 'Error logging in' });
    }
}

export async function logoutUserHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    reply.clearCookie('token').send({ message: 'Logout successful' });
}

export async function forgotPasswordHandler(
    request: FastifyRequest<{ Body: { email: string } }>,
    reply: FastifyReply
) {
    try {
        const { email } = request.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return reply.status(404).send({ message: 'User not found' });
        }

        const prisma = new PrismaClient();

        const existingOtp = await prisma.otp.findUnique({
            where: { userId: user.id },
        });

        if (existingOtp) {
            await prisma.otp.delete({ where: { userId: user.id } });
        }

        const resetOtp = crypto.randomInt(100000, 999999);
        sendResetOtpEmail(email, resetOtp);
        const hashedOtp = await bcrypt.hash(resetOtp.toString(), 10);

        await prisma.otp.create({
            data: {
                userId: user.id,
                code: hashedOtp,
            },
        });

        setTimeout(
            () => prisma.otp.delete({ where: { userId: user.id } }),
            5 * 60 * 1000
        );

        reply.send({ message: 'Password reset email sent' });
    } catch (e) {
        reply.status(500).send({ message: 'Error resetting password' });
    } finally {
        await prisma.$disconnect();
    }
}

export async function verifyOTPHandler(
    request: FastifyRequest<{ Body: { email: string; otp: string } }>,
    reply: FastifyReply
) {
    try {
        const prisma = new PrismaClient();
        const user = await findUserByEmail(request.body.email);

        if (!user) {
            throw new Error('User not found');
        }

        const existingOtp = await prisma.otp.findUnique({
            where: { userId: user.id },
        });

        if (!existingOtp) {
            throw new Error('OTP not found');
        }

        if (existingOtp.expirationDate < new Date()) {
            throw new Error('OTP expired');
        }

        if (!(await bcrypt.compare(request.body.otp, existingOtp.code))) {
            console.log('OTP:', request.body.otp);

            throw new Error('Invalid OTP');
        }
        await prisma.otp.delete({ where: { userId: user.id } });

        const generator = require('random-password');
        const randomPassword = generator(10);
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
            },
        });

        sendRandomPasswordEmail(request.body.email, randomPassword);

        reply.send({ message: 'OTP verified', verified: true });
    } catch (e: any) {
        reply.status(400).send({ message: e.message, verified: false });
    } finally {
        await prisma.$disconnect();
    }
}
