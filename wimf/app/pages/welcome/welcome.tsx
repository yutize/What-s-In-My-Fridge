import { Form, useActionData } from "react-router";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

interface ActionData {
  error?: string;
}

export function Welcome() {
  const actionData = useActionData<ActionData>();
  return (
    <main className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 max-w-[1240px] w-full items-stretch mx-auto">
        
        {/* PANEL 1: Login Form (Left Side, Full Height) */}
        <div className="lg:col-span-5 lg:row-span-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 dark:border-gray-700/50 shadow-[0_8px_40px_rgb(0,0,0,0.12)] p-8 sm:p-10 xl:p-14 flex flex-col justify-center relative z-20">
          
          <header className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl xl:text-4xl font-extrabold drop-shadow-sm mb-3" style={{color: '#047857'}}>
              Welcome Back
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-semibold text-lg">Log in to manage your kitchen.</p>
          </header>

          {/* Error Alert */}
          {actionData?.error && (
            <div className="mb-8 p-5 bg-red-50/90 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-2xl backdrop-blur-md animate-fade-in shadow-sm flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              <div>
                <p className="font-bold text-sm">Login Failed</p>
                <p className="text-sm mt-1 opacity-90">{actionData.error}</p>
              </div>
            </div>
          )}
          
          <Form method="post" className="space-y-6">
            <div className="group relative">
              <input
                type="text"
                id="username"
                name="username"
                required
                className="peer w-full px-5 py-4 pt-7 border-[2.5px] border-transparent bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200/50 rounded-2xl focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:shadow-md transition-all outline-none text-gray-900 dark:text-white font-semibold placeholder-transparent ring-offset-2 focus:ring-4 focus:ring-blue-500/10"
                placeholder="Username"
              />
              <label
                htmlFor="username"
                className="absolute left-5 top-3 text-[0.7rem] font-bold text-gray-500 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:font-medium peer-focus:top-3 peer-focus:text-[0.7rem] peer-focus:font-bold peer-focus:text-blue-600 peer-focus:uppercase peer-focus:tracking-widest cursor-text pointer-events-none"
              >
                Username
              </label>
            </div>

            <div className="group relative">
              <input
                type="password"
                id="password"
                name="password"
                required
                className="peer w-full px-5 py-4 pt-7 border-[2.5px] border-transparent bg-gray-100/70 dark:bg-gray-800/70 hover:bg-gray-200/50 rounded-2xl focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:shadow-md transition-all outline-none text-gray-900 dark:text-white font-semibold placeholder-transparent ring-offset-2 focus:ring-4 focus:ring-blue-500/10"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-5 top-3 text-[0.7rem] font-bold text-gray-500 uppercase tracking-widest transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:normal-case peer-placeholder-shown:font-medium peer-focus:top-3 peer-focus:text-[0.7rem] peer-focus:font-bold peer-focus:text-blue-600 peer-focus:uppercase peer-focus:tracking-widest cursor-text pointer-events-none"
              >
                Password
              </label>
            </div>

            <div className="flex items-center justify-between pt-3">
              <label className="flex items-center cursor-pointer group/nav">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="remember"
                    className="peer w-6 h-6 text-blue-600 border-2 border-gray-300 bg-white rounded-lg cursor-pointer transition-all focus:ring-blue-500/30 checked:border-blue-600"
                  />
                </div>
                <span className="ml-3 text-sm font-bold text-gray-500 dark:text-gray-300 group-hover/nav:text-gray-900 dark:group-hover/nav:text-white transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:underline transition-all">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white mt-6 py-4 px-6 rounded-2xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 font-bold text-lg transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] active:translate-y-0 flex justify-center items-center overflow-hidden relative group/btn"
            >
              <span className="relative z-10 flex items-center gap-2">
                Sign In to Dashboard
                <svg className="w-5 h-5 transform group-hover/btn:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Form>

          <p className="mt-10 text-center text-sm font-semibold text-gray-500 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all hover:text-blue-800">Create one now</a>
          </p>
        </div>

        {/* PANEL 2: Hero Image (Top Right) */}
        <div className="lg:col-span-7 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden relative shadow-xl group min-h-[320px] xl:min-h-[400px] border border-white/50 dark:border-gray-700/50 flex flex-col justify-end">
          <img src="/recipes/cuttingboard.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 ease-out" alt="Cooking background" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#047857] via-[#047857]/40 to-transparent mix-blend-multiply opacity-90 transition-opacity duration-700 group-hover:opacity-100"></div>
          
          <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
             <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30 text-white shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
             </div>
          </div>

          <div className="relative z-10 p-8 sm:p-12 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white drop-shadow-md mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">AI Recipe Magic</h2>
            <p className="text-white/95 text-lg sm:text-xl font-semibold drop-shadow-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100 max-w-lg leading-relaxed">
              Let our AI analyze your ingredients and suggest the perfect meal. Cooking has never been smarter.
            </p>
          </div>
        </div>

        {/* PANEL 3: Call to Action (Bottom Right) */}
        <div className="lg:col-span-7 signin-gradient rounded-[2.5rem] shadow-[0_10px_30px_rgb(0,0,0,0.15)] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between text-white relative overflow-hidden group border border-[#1e7e48]">
          {/* Animated rings */}
          <div className="absolute -right-20 -top-20 w-80 h-80 border-[40px] border-white/5 rounded-full group-hover:scale-[1.3] transition-transform duration-[1000ms] ease-out"></div>
          <div className="absolute right-10 -bottom-16 w-40 h-40 border-[20px] border-white/5 rounded-full group-hover:-translate-x-12 transition-transform duration-[1000ms] ease-out delay-100"></div>
          
          <div className="relative z-10 w-full sm:w-2/3 lg:w-3/4 mb-6 sm:mb-0 pr-4">
            <h3 className="text-xl sm:text-2xl font-extrabold mb-3">Reduce waste, eat better.</h3>
            <p className="text-emerald-50 font-semibold text-lg leading-relaxed max-w-sm">
              Discover how What's In My Fridge perfectly manages your inventory and creates stunning meal plans.
            </p>
          </div>
          
          <a href="/about" className="relative z-10 flex-shrink-0 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center gap-3 overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center group/link">
            <span className="relative z-10">Discover</span>
            <svg className="w-5 h-5 relative z-10 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
        
      </div>
    </main>
  );
}
