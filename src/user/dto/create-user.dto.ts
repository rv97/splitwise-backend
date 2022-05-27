import { User } from '@prisma/client';
export type CreateUserDto = Pick<User, 'email' | 'name' | 'password' | 'phone'>;
