import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function About() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto w-full">
        {/* Header Section */}
        <header className="text-center mb-16 relative">
          <div className="absolute inset-0 max-w-3xl mx-auto bg-[#047857]/10 blur-[100px] rounded-full h-40 top-0 pointer-events-none"></div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white drop-shadow-sm mb-6 relative z-10">
            About <span style={{color: '#047857'}}>What's In My Fridge</span>
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed relative z-10">
            Your truly intelligent kitchen companion. We transform your ingredients into delicious meal possibilities and eliminate food waste.
          </p>
        </header>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-min">
          
          {/* Main Intro Card */}
          <div className="md:col-span-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3rem] border border-white/60 dark:border-gray-700/50 shadow-[0_8px_40px_rgb(0,0,0,0.12)] p-10 lg:p-14 group hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">What We Do</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              What's In My Fridge is your intelligent kitchen companion that helps you make the most of what you have. 
              No more wasting food or wondering what to cook for dinner—our app transforms your ingredients into 
              delicious meal possibilities effortlessly.
            </p>
          </div>

          {/* Built With Card */}
          <div className="bg-gradient-to-br from-[#1e7e48] to-[#047857] text-white rounded-[2.5rem] md:rounded-[3rem] shadow-xl p-10 lg:p-12 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 flex flex-col justify-center border border-[#1e7e48]">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-[1.5] transition-transform duration-700"></div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 relative z-10 tracking-tight">Built With</h2>
            <p className="text-emerald-50 leading-relaxed font-semibold text-lg relative z-10">
              Modern tech: React Router, TypeScript, SQLite, and the Edamam API to provide a blazing fast experience.
            </p>
          </div>

          {/* Features Header */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-10 mb-2 flex items-center gap-6">
            <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Key Features</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800 rounded-full"></div>
          </div>

          {/* Feature 1 */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-gray-600/50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner transform group-hover:rotate-12 transition-transform duration-300">🥗</div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-snug">Smart Inventory</h3>
            <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
              Organize ingredients, track quantities, and monitor expiration dates effortlessly to crush food waste.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-gray-600/50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner transform group-hover:rotate-12 transition-transform duration-300">🍳</div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-snug">AI Discovery</h3>
            <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
              Find recipes based on what you already have. Cook smarter, not harder, with immediate suggestions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-gray-600/50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner transform group-hover:rotate-12 transition-transform duration-300">📊</div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-snug">Data Sync</h3>
            <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
              Create multiple nutrition profiles tailored to your dietary needs and active calorie goals seamlessly.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-gray-600/50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1 group">
             <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner transform group-hover:rotate-12 transition-transform duration-300">🤖</div>
             <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-snug">AI Nutritionist</h3>
             <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
               Chat with our advanced AI to calculate exact macros tailored to your personal body and activity metrics.
             </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-[2rem] border border-white/50 dark:border-gray-600/50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-xl hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-2 group">
             <div className="flex flex-col md:flex-row gap-6 items-start md:items-center h-full">
               <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner transform group-hover:rotate-12 transition-transform duration-300">📱</div>
               <div>
                 <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-snug">Detailed Dashboard</h3>
                 <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                   A perfect command center displaying your saved recipes, active macro goals, and complete fridge inventory all in one unified, beautiful place.
                 </p>
               </div>
             </div>
          </div>

          {/* How It Works - Full Width Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[3rem] border border-white/60 dark:border-gray-700/50 shadow-[0_8px_40px_rgb(0,0,0,0.12)] p-10 lg:p-16 mt-10">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-16 text-center tracking-tight">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative">
              {/* Optional connection line behind steps for md+ */}
              <div className="hidden md:block absolute top-10 left-12 right-12 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full z-0"></div>
              
              {[
                { step: "1", title: "Add Items", desc: "Input your fridge ingredients" },
                { step: "2", title: "Profile", desc: "Set your nutrition goals" },
                { step: "3", title: "AI Guide", desc: "Chat for macro guidance" },
                { step: "4", title: "Discover", desc: "Find matching recipes" },
                { step: "5", title: "Track", desc: "Save and stay organized" },
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-white dark:bg-gray-900 text-[#047857] border-[4px] border-[#047857] rounded-3xl flex items-center justify-center text-2xl font-black mb-5 shadow-lg group-hover:-translate-y-2 group-hover:shadow-[0_10px_20px_rgba(4,120,87,0.3)] transition-all duration-300">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 max-w-[140px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Get Started CTA */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 signin-gradient rounded-[3rem] mt-10 p-12 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden group border border-[#1e7e48]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 border-[30px] border-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="absolute -right-20 -top-20 w-64 h-64 border-[30px] border-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000 delay-100"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight max-w-3xl drop-shadow-sm">Ready to transform your kitchen?</h2>
              <a
                href="/"
                className="inline-flex items-center gap-3 bg-white text-[#047857] px-10 py-5 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:translate-y-0 group/cta"
              >
                Get Started Now
                <svg className="w-6 h-6 transform group-hover/cta:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}