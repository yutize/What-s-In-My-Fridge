import { Form, useActionData } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
    username?: string;
    confirmEmail?: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    general?: string;
  };
}

export function SignUp() {
  const actionData = useActionData<ActionData>();
  const errors = actionData?.errors;

  return (
    <main className="flex items-center justify-center min-h-screen pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <header className="flex flex-col items-center gap-6">
          <div className="w-[300px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="What's In My Fridge"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="What's In My Fridge"
              className="hidden w-full dark:block"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to What's in My Fridge.
          </h1>
          <h2 className="text-lg text-gray-600 dark:text-gray-300">
            Create an account to get started
          </h2>
        </header>

        <div className="max-w-[400px] w-full space-y-6 px-4">
          <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
            
            {/* General Error Alert */}
            {errors?.general && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg dark:bg-red-900 dark:border-red-700 dark:text-red-200">
                <p className="font-medium">Error</p>
                <p className="text-sm">{errors.general}</p>
              </div>
            )}

            <Form method="post" className="space-y-6">

              <div className="flex gap-4">
                <div className="w-full">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors?.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="First Name"
                  />
                  {errors?.firstName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
                  )}
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors?.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Last Name"
                  />
                  {errors?.lastName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors?.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Username"
                />
                {errors?.username && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors?.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Email"
                />
                {errors?.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  id="confirmationEmail"
                  name="confirmationEmail"
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors?.confirmEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirmation Email"
                />
                {errors?.confirmEmail && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmEmail}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors?.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Password"
                />
                {errors?.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  id="confirmationPassword"
                  name="confirmationPassword"
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors?.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirmation Password"
                />
                {errors?.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
                )}
              </div>


              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition-colors"
              >
                Create Account
              </button>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="/"
                  className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/about"
              className="text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              Learn more about What's In My Fridge →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
