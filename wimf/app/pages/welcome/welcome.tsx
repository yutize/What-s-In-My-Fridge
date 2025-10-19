import { Form } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
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
            Welcome Back
          </h1>
        </header>

        <div className="max-w-[400px] w-full space-y-6 px-4">
          <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
            <Form method="post" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition-colors"
              >
                Sign In
              </button>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-600 hover:underline dark:text-blue-400 font-medium"
                >
                  Sign up
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
