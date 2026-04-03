import { Form, useNavigation } from "react-router";
import type { SavedRecipe } from "~/types/recipe";
import type { NutritionProfile } from "~/types/nutrition";
import type { ProfileOption, InventoryItem } from "~/types/dashboard";
import type { RecipePicksResult, RecipePick } from "~/services/recipePicksService";
import { ThemeToggle } from "~/components/ThemeToggle";

interface ExpiringItem extends InventoryItem {
  days_until_expiration: number;
}

const TAG_STYLES: Record<string, { pill: string; label: string }> = {
  primary: {
    pill: "bg-primary/90 text-on-primary",
    label: "text-primary",
  },
  secondary: {
    pill: "bg-secondary/90 text-on-secondary",
    label: "text-secondary",
  },
  tertiary: {
    pill: "bg-tertiary/90 text-on-tertiary",
    label: "text-tertiary",
  },
};

function recipeHref(pick: RecipePick): string {
  if (pick.url) {
    return pick.url; // opens Edamam source in a new tab (handled with target="_blank")
  }
  const q = encodeURIComponent(pick.name);
  return `/recipes?q=${q}`;
}

function SkeletonFeatured() {
  return (
    <div className="animate-pulse relative overflow-hidden rounded-3xl bg-surface-container shadow-lg aspect-[4/5]">
      <div className="absolute inset-0 bg-surface-container-high" />
      <div className="absolute bottom-0 p-8 space-y-3 w-full">
        <div className="flex gap-2">
          <div className="h-5 w-20 rounded-full bg-surface-container-highest" />
          <div className="h-5 w-24 rounded-full bg-surface-container-highest" />
        </div>
        <div className="h-8 w-56 rounded bg-surface-container-highest" />
        <div className="h-4 w-48 rounded bg-surface-container-highest" />
      </div>
    </div>
  );
}

function SkeletonSmallCard() {
  return (
    <div className="animate-pulse bg-surface-container-lowest rounded-3xl p-4 shadow-sm flex gap-4">
      <div className="w-32 h-32 rounded-2xl bg-surface-container shrink-0" />
      <div className="flex flex-col justify-center space-y-2.5 flex-1">
        <div className="h-3 w-14 rounded bg-surface-container" />
        <div className="h-5 w-40 rounded bg-surface-container" />
        <div className="h-3 w-36 rounded bg-surface-container" />
        <div className="flex gap-3 mt-1">
          <div className="h-3 w-10 rounded bg-surface-container" />
          <div className="h-3 w-10 rounded bg-surface-container" />
        </div>
      </div>
    </div>
  );
}

function EditorsPicks({ picks, isLoading }: { picks: RecipePicksResult | null; isLoading: boolean }) {
  const featured = picks?.featured;
  const card1 = picks?.picks?.[0];
  const card2 = picks?.picks?.[1];

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-3xl font-serif">Our Picks!</h3>
        <a
          className="text-primary font-label text-xs uppercase tracking-widest font-bold flex items-center gap-1 group"
          href="/recipes"
        >
          Explore Archive
          <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {isLoading || !featured ? (
          <SkeletonFeatured />
        ) : (
          <a
            href={featured.url ?? `https://www.google.com/search?q=${encodeURIComponent(featured.name + " recipe")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-3xl bg-surface-container-lowest shadow-lg block"
          >
            <div className="aspect-[4/5] overflow-hidden bg-surface-container">
              {featured.image ? (
                <img
                  alt={featured.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={featured.image}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-outline-variant">
                    restaurant
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 p-8 text-white">
              <div className="flex gap-2 mb-3">
                <span
                  className={`px-3 py-1 ${TAG_STYLES[featured.tagColor]?.pill ?? "bg-primary/90 text-on-primary"} text-[10px] uppercase tracking-widest rounded-full font-label`}
                >
                  {featured.tag}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-[10px] uppercase tracking-widest rounded-full font-label">
                  AI's Choice
                </span>
              </div>
              <h4 className="text-3xl font-serif leading-tight">{featured.name}</h4>
              <p className="text-sm text-stone-200 mt-2 font-body max-w-xs">{featured.description}</p>
              <div className="flex items-center gap-3 mt-3 text-stone-300 text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {featured.cookTime}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  {featured.difficulty}
                </span>
              </div>
            </div>
          </a>
        )}

        <div className="flex flex-col gap-6">

          {isLoading || !card1 ? (
            <SkeletonSmallCard />
          ) : (
            <a
              href={card1.url ?? `https://www.google.com/search?q=${encodeURIComponent(card1.name + " recipe")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface-container-lowest rounded-3xl p-4 shadow-sm flex gap-4 transition-all hover:shadow-md"
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                {card1.image ? (
                  <img
                    alt={card1.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={card1.image}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-outline-variant">
                      restaurant
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span
                  className={`text-[10px] font-label uppercase tracking-widest ${TAG_STYLES[card1.tagColor]?.label ?? "text-secondary"} font-bold mb-1`}
                >
                  {card1.tag}
                </span>
                <h4 className="text-xl font-serif text-on-surface">{card1.name}</h4>
                <p className="text-xs text-on-surface-variant mt-1">{card1.description}</p>
                <div className="mt-3 flex items-center gap-3 text-stone-400">
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {card1.cookTime}
                  </div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    {card1.difficulty}
                  </div>
                </div>
              </div>
            </a>
          )}

          {isLoading || !card2 ? (
            <SkeletonSmallCard />
          ) : (
            <a
              href={card2.url ?? `https://www.google.com/search?q=${encodeURIComponent(card2.name + " recipe")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-surface-container-lowest rounded-3xl p-4 shadow-sm flex gap-4 transition-all hover:shadow-md"
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-surface-container">
                {card2.image ? (
                  <img
                    alt={card2.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    src={card2.image}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-outline-variant">
                      restaurant
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span
                  className={`text-[10px] font-label uppercase tracking-widest ${TAG_STYLES[card2.tagColor]?.label ?? "text-primary"} font-bold mb-1`}
                >
                  {card2.tag}
                </span>
                <h4 className="text-xl font-serif text-on-surface">{card2.name}</h4>
                <p className="text-xs text-on-surface-variant mt-1">{card2.description}</p>
                <div className="mt-3 flex items-center gap-3 text-stone-400">
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {card2.cookTime}
                  </div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="material-symbols-outlined text-sm">trending_up</span>
                    {card2.difficulty}
                  </div>
                </div>
              </div>
            </a>
          )}

          <Form method="post" className="flex-1">
            <input type="hidden" name="actionType" value="surpriseMe" />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-full min-h-[100px] bg-primary-container/30 border-2 border-dashed border-primary/20 rounded-3xl flex flex-col items-center justify-center p-8 text-center hover:bg-primary-container/50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined text-primary text-4xl mb-2 animate-spin">
                    autorenew
                  </span>
                  <h5 className="font-serif text-lg text-on-primary-container">Generating…</h5>
                  <p className="text-xs text-on-primary-container/70 font-body max-w-[180px] mt-1">
                    Asking our AI for a surprise pick…
                  </p>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-primary text-4xl mb-2">
                    auto_awesome
                  </span>
                  <h5 className="font-serif text-lg text-on-primary-container">Surprise Me</h5>
                  <p className="text-xs text-on-primary-container/70 font-body max-w-[180px] mt-1">
                    Let our AI pick a random gourmet recipe for you.
                  </p>
                </>
              )}
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}

export function Dashboard({
  user,
  savedRecipes,
  nutritionProfile,
  allProfiles,
  inventoryItems,
  expiringSoonItems = [],
  recipePicks,
}: {
  user: any;
  savedRecipes: SavedRecipe[];
  nutritionProfile: NutritionProfile | null;
  allProfiles: ProfileOption[];
  inventoryItems: InventoryItem[];
  expiringSoonItems?: ExpiringItem[];
  recipePicks: RecipePicksResult | null;
}) {
  const navigation = useNavigation();
  const isSurprising =
    navigation.state === "submitting" &&
    navigation.formData?.get("actionType") === "surpriseMe";

  return (
    <div className="bg-surface text-on-surface min-h-[100vh]">

      <header className="bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-serif italic text-emerald-900 dark:text-emerald-100">
            What's In My Fridge
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4 text-xs font-label uppercase tracking-widest text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>{inventoryItems.length} items in fridge</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
              <span>{savedRecipes.length} saved recipes</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-8 w-8 rounded-full ring-2 ring-primary/10 flex items-center justify-center font-bold text-sm bg-primary text-on-primary">
              {user.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <aside className="h-screen w-64 fixed left-0 top-0 hidden md:flex flex-col bg-stone-50 dark:bg-stone-950 pt-20 px-4">
        <nav className="flex flex-col gap-2">
          <a
            className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/dashboard"
          >
            <span className="material-symbols-outlined">explore</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">Discover</span>
          </a>
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/ingredients"
          >
            <span className="material-symbols-outlined">restaurant</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">My Kitchen</span>
          </a>

          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/nutrition"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">Profile</span>
          </a>
          <a
            className="text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 rounded-xl mx-2 flex items-center gap-4 px-4 py-3 transition-transform duration-200 hover:translate-x-1"
            href="/logout"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label text-sm font-medium uppercase tracking-wider">Sign Out</span>
          </a>
        </nav>
        <div className="mt-auto pb-8 px-4">
          <a
            href="/recipes"
            className="w-full bg-primary text-on-primary py-3 rounded-xl flex items-center justify-center gap-2 font-label font-bold text-sm tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>NEW RECIPE</span>
          </a>
        </div>
      </aside>

      <main className="pt-24 pb-20 md:pl-64 px-4 md:pr-8 min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-8 flex flex-col gap-10">

            <section>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold">
                Good Morning, {user}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-2 text-on-surface">
                What's on the menu today?
              </h2>
            </section>

            <section className="bg-surface-container-low rounded-3xl p-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-2xl font-serif text-on-surface">Nutrition Hub</h3>
                  <p className="text-sm text-on-surface-variant font-body">
                    Tracking your daily editorial balance
                  </p>
                </div>
                <a
                  href="/nutrition"
                  className="text-xs font-label uppercase tracking-widest text-primary font-semibold hover:underline"
                >
                  {nutritionProfile ? "Manage Profile" : "Setup Profile"}
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-primary text-xl">
                      local_fire_department
                    </span>
                    <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                      Calories
                    </span>
                  </div>
                  <div className="text-2xl font-serif text-on-surface">
                    {nutritionProfile?.caloriesLow ? `${nutritionProfile.caloriesLow}` : "N/A"}
                    {nutritionProfile?.caloriesHigh ? `–${nutritionProfile.caloriesHigh}` : ""}
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[75%] rounded-full" />
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-secondary text-xl">
                      fitness_center
                    </span>
                    <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                      Protein
                    </span>
                  </div>
                  <div className="text-2xl font-serif text-on-surface">
                    {nutritionProfile?.protein || "-"}
                    <span className="text-sm font-body ml-1">g</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-[60%] rounded-full" />
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-tertiary text-xl">
                      bakery_dining
                    </span>
                    <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                      Carbs
                    </span>
                  </div>
                  <div className="text-2xl font-serif text-on-surface">
                    {nutritionProfile?.carbs || "-"}
                    <span className="text-sm font-body ml-1">g</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary w-[45%] rounded-full" />
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-outline text-xl">water_drop</span>
                    <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant">
                      Fats
                    </span>
                  </div>
                  <div className="text-2xl font-serif text-on-surface">
                    {nutritionProfile?.fat || "-"}
                    <span className="text-sm font-body ml-1">g</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-on-surface-variant w-[30%] rounded-full" />
                  </div>
                </div>
              </div>
            </section>

            <EditorsPicks picks={recipePicks} isLoading={isSurprising} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <section className="bg-surface-container p-8 rounded-[2rem] sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-on-surface">Kitchen Management</h3>
                <a href="/ingredients" className="text-primary">
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>

              <div className="space-y-4">

                {inventoryItems.length > 0 ? (
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {inventoryItems.slice(0, 5).map((item) => (
                      <div
                        key={item.inventory_id}
                        className="flex justify-between items-center p-3 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-sm">kitchen</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-on-surface">
                              {item.ingredient_name}
                            </p>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                              {item.category || "General"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-on-surface">{item.quantity}</p>
                          <p className="text-[10px] text-on-surface-variant">{item.unit}</p>
                        </div>
                      </div>
                    ))}
                    {inventoryItems.length > 5 && (
                      <a
                        href="/ingredients"
                        className="block text-center text-xs font-label text-primary font-bold uppercase tracking-widest hover:underline mt-2"
                      >
                        View all {inventoryItems.length} items
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="bg-surface-container-lowest rounded-2xl p-8 flex flex-col items-center text-center border-2 border-dashed border-outline-variant/30">
                    <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-outline-variant text-2xl">
                        kitchen
                      </span>
                    </div>
                    <h4 className="font-serif text-md mb-1">Your fridge is empty.</h4>
                    <p className="text-[10px] text-on-surface-variant font-body">
                      Add ingredients to get recipe recommendations.
                    </p>
                    <a
                      href="/ingredients"
                      className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-label font-bold uppercase tracking-widest hover:bg-primary/20 transition-colors inline-block"
                    >
                      Add Ingredients
                    </a>
                  </div>
                )}

                {expiringSoonItems.length > 0 && (
                  <div className="pt-4">
                    <h4 className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                      Urgent Reminders
                    </h4>
                    <div className="space-y-3">
                      {expiringSoonItems.map((item) => (
                        <div
                          key={item.inventory_id}
                          className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl"
                        >
                          <div
                            className={`w-2 h-2 rounded-full ${item.days_until_expiration <= 2 ? "bg-error" : "bg-tertiary"
                              }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-body font-semibold truncate text-on-surface">
                              {item.ingredient_name} ({item.quantity} {item.unit})
                            </p>
                            <p className="text-[10px] text-stone-500">
                              {item.days_until_expiration === 0
                                ? "Expires today!"
                                : `${item.days_until_expiration} days remaining`}
                            </p>
                          </div>
                          <a href="/ingredients">
                            <span className="material-symbols-outlined text-stone-400 text-sm hover:text-primary transition-colors">
                              chevron_right
                            </span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 p-6 bg-[#2d4436] rounded-2xl text-white">
                <p className="text-[10px] font-label uppercase tracking-[0.2em] opacity-70">
                  Kitchen Efficiency
                </p>
                <div className="flex items-end justify-between mt-2">
                  <span className="text-3xl font-serif">
                    {inventoryItems.length > 0
                      ? `${Math.min(100, Math.round((inventoryItems.length / 20) * 100))}%`
                      : "0%"}
                  </span>
                  <span className="text-[10px] font-body bg-white/20 px-2 py-0.5 rounded-full mb-1">
                    {inventoryItems.length > 15
                      ? "Zero Waste Hero"
                      : inventoryItems.length > 5
                        ? "Well Stocked"
                        : "Getting Started"}
                  </span>
                </div>
                <div className="mt-4 h-1 w-full bg-white/20 rounded-full">
                  <div
                    className="h-full bg-emerald-400 rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, Math.round((inventoryItems.length / 20) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-stone-50/90 backdrop-blur-xl flex items-center justify-around px-6 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <a href="/dashboard" className="text-emerald-900 flex flex-col items-center gap-0.5">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            explore
          </span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Discover
          </span>
        </a>
        <a href="/ingredients" className="text-stone-500 flex flex-col items-center gap-0.5">
          <span className="material-symbols-outlined">restaurant</span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Kitchen
          </span>
        </a>
        <a
          href="/recipes"
          className="bg-primary text-white p-3 rounded-full -translate-y-4 shadow-lg shadow-primary/40 ring-4 ring-background"
        >
          <span className="material-symbols-outlined">add</span>
        </a>
        <a href="/nutrition" className="text-stone-500 flex flex-col items-center gap-0.5">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[9px] font-label font-bold uppercase tracking-tighter">
            Profile
          </span>
        </a>
      </nav>
    </div>
  );
}
