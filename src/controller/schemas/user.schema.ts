import { z } from 'zod';


export const createUserSchema = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    username: z.string().min(2).max(255),
    password: z.string().min(6).max(255),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const forgotPasswordSchema = {
    body: {
        type: 'object',
        required: ['email'],
        properties: {
            email: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    },
};

export const verifyOTPSchema = {
    body: {
        type: 'object',
        required: ['email', 'otp'],
        properties: {
            email: { type: 'string' },
            otp: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                verified: { type: 'boolean' },
            },
        },
    },
};
