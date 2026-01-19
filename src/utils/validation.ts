import { z } from 'zod';

// User validation schemas
export const userSchemas = {
  createUser: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters')
      .trim(),
    email: z.string()
      .email('Invalid email format')
      .toLowerCase()
      .trim(),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must not exceed 128 characters'),
    role: z.enum(['user', 'admin']).default('user').optional()
  }),

  updateUser: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters')
      .trim()
      .optional(),
    email: z.string()
      .email('Invalid email format')
      .toLowerCase()
      .trim()
      .optional(),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must not exceed 128 characters')
      .optional()
  }).refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update'
  }),

  login: z.object({
    email: z.string()
      .email('Invalid email format')
      .toLowerCase()
      .trim(),
    password: z.string()
      .min(1, 'Password is required')
  })
};

// TypeScript types inferred from Zod schemas
export type CreateUserInput = z.infer<typeof userSchemas.createUser>;
export type UpdateUserInput = z.infer<typeof userSchemas.updateUser>;
export type LoginInput = z.infer<typeof userSchemas.login>;

// Query parameter validation schemas
export const querySchemas = {
  pagination: z.object({
    page: z.string()
      .optional()
      .default('1')
      .transform(val => parseInt(val, 10))
      .refine(val => val > 0, 'Page must be greater than 0'),
    limit: z.string()
      .optional()
      .default('10')
      .transform(val => parseInt(val, 10))
      .refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100'),
    sortBy: z.string()
      .optional()
      .default('createdAt'),
    order: z.enum(['asc', 'desc'])
      .optional()
      .default('desc')
  }),

  userId: z.object({
    id: z.string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId format')
  })
};

export type PaginationQuery = z.infer<typeof querySchemas.pagination>;
export type UserIdParam = z.infer<typeof querySchemas.userId>;