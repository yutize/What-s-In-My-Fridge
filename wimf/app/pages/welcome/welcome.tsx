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

        <div className="max-w-[920px] w-full px-4">
          <div className="w-full rounded-3xl overflow-hidden shadow-lg bg-white/0">
            <div className="flex flex-col md:flex-row w-full">
              {/* Left: form */}
              <div className="w-full md:w-1/2 bg-[#F5F5F5] p-8">
                <Form method="post" className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="remember"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium transition-colors"
                  >
                    Sign In
                  </button>
                </Form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-blue-600 hover:underline font-medium">Sign up</a>
                  </p>
                </div>
              </div>

              {/* Right: gradient panel */}
              <div className="hidden md:flex md:w-1/2 signin-gradient items-center justify-center p-8">
                <div className="text-center px-4">
                  <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                  <p className="mt-2 text-white/90">Sign in to manage your fridge inventory.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
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
