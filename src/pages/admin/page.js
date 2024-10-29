import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import "../../app/globals.css";

const userSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().optional(),
  Domain: z.string().optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-z]/, 'Password must include a lowercase letter')
    .regex(/[A-Z]/, 'Password must include an uppercase letter')
    .regex(/[0-9]/, 'Password must include a number')
    .regex(/[@$!%*?&]/, 'Password must include a special character'),
  confirmPassword: z.string(),
  address1: z.string().min(1, { message: 'Address 1 is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().optional(),
  zip: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, 'Invalid ZIP code'),
  roles: z.object({
    superAdmin: z.boolean().optional(),
    Admin: z.boolean().optional(),
    Post3: z.boolean().optional(),
    Post4: z.boolean().optional(),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
});

const AdminProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    alert('User added successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold mb-2">Add User</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                {...register('firstName')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                {...register('lastName')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Domain</label>
              <input
                type="text"
                {...register('Domain')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                {...register('password')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                {...register('confirmPassword')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold mb-2">Address</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">Address 1</label>
              <input
                type="text"
                {...register('address1')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.address1 && <span className="text-red-500 text-sm">{errors.address1.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium">Address 2</label>
              <input
                type="text"
                {...register('address2')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                type="text"
                {...register('city')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium">State</label>
              <input
                type="text"
                {...register('state')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">ZIP</label>
              <input
                type="text"
                {...register('zip')}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {errors.zip && <span className="text-red-500 text-sm">{errors.zip.message}</span>}
            </div>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="text-lg font-semibold mb-2">Assign a Role</legend>
          <div className="flex flex-wrap gap-4">
            <label>
              <input type="checkbox" {...register('roles.superAdmin')} /> Super Admin
            </label>
            <label>
              <input type="checkbox" {...register('roles.Admin')} /> Admin
            </label>
            <label>
              <input type="checkbox" {...register('roles.Post3')} /> Role 3
            </label>
            <label>
              <input type="checkbox" {...register('roles.Post4')} /> Role 4
            </label>
          </div>
        </fieldset>

        <button type="submit" className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminProfilePage;