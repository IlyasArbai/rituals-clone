<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "../utils/pinia";

onMounted(() => {
  console.log("Current URL:", window.location.href);
  console.log("Current hash:", window.location.hash);
  console.log("Scroll position:", window.scrollY);
});

const auth = useAuthStore();

console.log("Store state:", {
  user: auth.user,
  initialized: auth.initialized,
  isAuthenticated: auth.isAuthenticated,
});
</script>

<template>
  <section
    class="grid min-h-[90vh] w-full grid-cols-1 gap-8 overflow-hidden px-5 py-8 sm:px-8 md:h-[90vh] md:grid-cols-2 md:gap-0 md:px-20 md:py-0"
  >
    <div class="flex flex-col items-start justify-center">
      <span
        class="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-500"
      >
        Discover the beauty of nature
      </span>

      <div class="flex items-start">
        <h1
          class="text-6xl font-light tracking-tight text-stone-900 sm:text-7xl md:text-8xl"
        >
          RITUALS
        </h1>
        <span class="ml-1 mt-2 text-2xl text-[#a56c52]">.</span>
      </div>

      <div class="mb-6 mt-5 h-px w-16 bg-[#a56c52]"></div>

      <p class="mb-8 max-w-md text-base leading-7 text-stone-500">
        Discover carefully crafted skincare essentials inspired by ancient
        traditions. Natural ingredients, timeless rituals, and moments of calm
        made just for you.
      </p>

      <div class="flex flex-wrap items-center gap-4 sm:gap-6">
        <RouterLink
          to="/#philosophy"
          class="bg-stone-900 px-7 py-3.5 text-sm text-white transition hover:bg-[#a56c52]"
        >
          Discover More
        </RouterLink>

        <RouterLink
          to="/products"
          class="border-b border-stone-300 pb-1 text-sm text-stone-700 transition hover:border-[#a56c52] hover:text-[#a56c52]"
        >
          Explore products
        </RouterLink>
      </div>

      <div
        class="mt-12 flex items-center gap-4 border-t border-stone-200 pt-6 sm:mt-16"
      >
        <div class="flex -space-x-2">
          <img
            src="https://i.pravatar.cc/80?img=47"
            alt=""
            class="h-9 w-9 rounded-full border-2 border-white object-cover"
          />
          <img
            src="https://i.pravatar.cc/80?img=44"
            alt=""
            class="h-9 w-9 rounded-full border-2 border-white object-cover"
          />
          <img
            src="https://i.pravatar.cc/80?img=49"
            alt=""
            class="h-9 w-9 rounded-full border-2 border-white object-cover"
          />
          <div
            class="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-stone-100 text-[10px] text-stone-600"
          >
            +99
          </div>
        </div>

        <div>
          <p class="text-sm font-medium text-stone-800">Loved by thousands</p>
          <p class="mt-1 text-xs text-stone-500">
            A moment of calm, every day.
          </p>
        </div>
      </div>
    </div>

    <div
      class="relative flex min-h-100 items-center justify-center overflow-hidden bg-[#f5f0e8] sm:min-h-120 md:min-h-0"
    >
      <div
        class="absolute h-[75%] w-[75%] rounded-full border border-stone-200"
      ></div>
      <div
        class="absolute h-[60%] w-[60%] rounded-full bg-white/70 blur-3xl"
      ></div>

      <span
        class="absolute right-4 top-6 z-20 text-xs uppercase tracking-[0.25em] text-stone-500 sm:right-8 sm:top-10"
      >
        Pure · Natural · You
      </span>

      <img
        src="../assets/hero.png"
        alt="Rituals-inspired skincare and body care products"
        class="relative z-10 max-h-[75vh] w-[85%] object-contain transition-transform duration-700 hover:scale-105"
      />

      <div class="absolute left-4 top-1/2 z-20 -translate-y-1/2 sm:left-8">
        <p class="text-xs uppercase tracking-[0.2em] text-stone-500">
          Our philosophy
        </p>
        <p class="mt-2 text-xl font-light text-stone-800 sm:text-2xl">
          Slow down.
        </p>
        <p class="text-xl font-light text-[#a56c52] sm:text-2xl">
          Find balance.
        </p>
      </div>

      <span
        class="absolute bottom-6 left-4 z-20 text-xs uppercase tracking-[0.2em] text-stone-500 sm:bottom-8 sm:left-8"
      >
        Your daily beauty ritual
      </span>

      <div
        class="absolute bottom-6 right-4 z-20 text-right sm:bottom-8 sm:right-8"
      >
        <div class="flex items-center justify-end gap-2">
          <span class="text-3xl font-light text-stone-900">6M+</span>
          <i class="pi pi-arrow-up-right text-[#a56c52]"></i>
        </div>
        <p class="mt-1 text-xs uppercase tracking-wider text-stone-500">
          Products sold yearly
        </p>
      </div>
    </div>

    <div
      class="col-span-1 mt-0 grid grid-cols-1 gap-6 border-t border-stone-200 py-6 sm:grid-cols-2 md:col-span-2 md:mt-8 md:grid-cols-3 md:gap-0"
    >
      <div class="flex items-center gap-4">
        <span class="text-3xl font-light tracking-tight text-stone-900">
          18<span class="text-[#a56c52]">+</span>
        </span>
        <div>
          <p class="text-sm font-medium text-stone-800">Years of expertise</p>
          <p class="mt-1 text-xs text-stone-500">Beauty rooted in tradition</p>
        </div>
      </div>

      <div
        class="flex items-center gap-4 border-stone-200 sm:justify-center sm:border-l sm:pl-4 md:border-x md:pl-0"
      >
        <span class="text-3xl font-light tracking-tight text-stone-900">
          350k<span class="text-[#a56c52]">+</span>
        </span>
        <div>
          <p class="text-sm font-medium text-stone-800">Happy customers</p>
          <p class="mt-1 text-xs text-stone-500">Moments shared every day</p>
        </div>
      </div>

      <div
        class="flex items-center justify-start gap-4 sm:col-span-2 sm:justify-end md:col-span-1"
      >
        <div class="text-left sm:text-right">
          <p class="text-sm font-medium text-stone-800">Mindful by nature</p>
          <p class="mt-1 text-xs text-stone-500">Care for body and soul</p>
        </div>
        <div
          class="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-[#a56c52]"
        >
          <i class="pi pi-leaf text-lg"></i>
        </div>
      </div>
    </div>
  </section>

  <section
    id="collections"
    class="grid min-h-[90dvh] w-full grid-cols-1 gap-8 px-5 py-8 sm:px-8 md:h-[90dvh] md:grid-cols-2 md:gap-0 md:px-20 md:py-0"
  >
    <div class="flex flex-col justify-center md:pr-8 lg:pr-12">
      <span
        class="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[#a56c52]"
      >
        A little moment for you
      </span>

      <h2
        class="max-w-xl text-4xl font-light leading-[1.15] tracking-tight text-stone-900 sm:text-5xl md:text-6xl"
      >
        Make every day
        <span class="text-[#a56c52]">feel special.</span>
      </h2>

      <div class="mb-6 mt-7 h-px w-20 bg-[#a56c52]"></div>

      <p class="max-w-lg text-base leading-8 text-stone-500">
        From refreshing morning routines to relaxing evening rituals, discover
        everyday essentials that help you slow down and enjoy the little things.
      </p>

      <RouterLink
        to="/products"
        class="mt-8 flex w-fit items-center gap-4 border-b border-stone-300 pb-3 text-sm font-medium text-stone-800 transition hover:gap-6 hover:border-[#a56c52]"
      >
        Explore the collection
        <i class="pi pi-arrow-up-right text-[#a56c52]"></i>
      </RouterLink>
    </div>

    <div
      class="relative flex min-h-100 items-center justify-center overflow-hidden sm:min-h-120 md:min-h-0"
    >
      <span
        class="absolute left-4 top-6 text-xs uppercase tracking-[0.25em] text-stone-400 sm:left-8 sm:top-8"
      >
        01 — Everyday rituals
      </span>

      <img
        src="../assets/section2.png"
        alt="Body care and wellness essentials"
        class="relative z-10 h-[80%] max-h-150 w-[90%] object-contain transition-transform duration-700 hover:scale-105"
      />

      <span
        class="absolute bottom-6 right-4 text-xs uppercase tracking-widest text-stone-500 sm:bottom-8 sm:right-8"
      >
        Find your moment of calm
      </span>
    </div>
  </section>

  <section
    id="philosophy"
    class="grid min-h-[90dvh] w-full grid-cols-1 gap-8 px-5 py-8 sm:px-8 md:h-[90dvh] md:grid-cols-2 md:gap-0 md:px-20 md:py-0"
  >
    <div
      class="relative flex min-h-100 items-center justify-center overflow-hidden bg-[#f5f0e8] sm:min-h-120 md:min-h-0"
    >
      <span
        class="absolute left-4 top-6 text-xs uppercase tracking-[0.25em] text-stone-400 sm:left-8 sm:top-8"
      >
        02 — Our philosophy
      </span>

      <img
        src="../assets/about.png"
        alt="Skincare inspired by nature and tradition"
        class="relative z-10 h-[85%] max-w-full object-contain transition-transform duration-700 hover:scale-105"
      />

      <div
        class="absolute bottom-6 right-4 flex items-center gap-2 text-xs tracking-widest text-stone-500 sm:bottom-8 sm:right-8"
      >
        <i class="pi pi-leaf text-[#a56c52]"></i>
        NATURE MEETS SCIENCE
      </div>
    </div>

    <div class="flex flex-col justify-center md:pl-10 lg:pl-16">
      <span
        class="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[#a56c52]"
      >
        The art of gentle skincare
      </span>

      <h2
        class="max-w-xl text-4xl font-light leading-[1.15] tracking-tight text-stone-900 sm:text-5xl md:text-6xl"
      >
        Your skin deserves
        <span class="text-[#a56c52]">the purest care.</span>
      </h2>

      <div class="mb-6 mt-7 h-px w-20 bg-[#a56c52]"></div>

      <p class="max-w-lg text-base leading-8 text-stone-500">
        Discover the perfect balance of nature and science. Thoughtfully crafted
        skincare transforms your everyday routine into a moment of relaxation,
        care, and personal well-being.
      </p>

      <RouterLink
        to="/products"
        class="mt-8 flex w-fit items-center gap-4 border-b border-stone-300 pb-3 text-sm font-medium text-stone-800 transition hover:gap-6 hover:border-[#a56c52]"
      >
        Discover our collection
        <i class="pi pi-arrow-up-right text-[#a56c52]"></i>
      </RouterLink>

      <div
        class="mt-10 grid grid-cols-3 border-t border-stone-200 pt-7 sm:mt-14"
      >
        <div class="pr-2 sm:pr-4">
          <i class="pi pi-leaf mb-4 text-xl text-[#a56c52]"></i>
          <h3 class="text-sm font-medium text-stone-800">Pure ingredients</h3>
          <p class="mt-2 text-xs leading-5 text-stone-500">
            Inspired by nature
          </p>
        </div>

        <div class="border-x border-stone-200 px-2 sm:px-5">
          <i class="pi pi-verified mb-4 text-xl text-[#a56c52]"></i>
          <h3 class="text-sm font-medium text-stone-800">Quality first</h3>
          <p class="mt-2 text-xs leading-5 text-stone-500">
            Thoughtfully developed
          </p>
        </div>

        <div class="pl-2 sm:pl-5">
          <i class="pi pi-heart mb-4 text-xl text-[#a56c52]"></i>
          <h3 class="text-sm font-medium text-stone-800">Mindful care</h3>
          <p class="mt-2 text-xs leading-5 text-stone-500">
            Made for your ritual
          </p>
        </div>
      </div>
    </div>
  </section>

  <section
    id="story"
    class="flex min-h-[90dvh] flex-col items-center justify-center px-5 py-16 text-center sm:px-8 md:px-20"
  >
    <span
      class="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-[#a56c52]"
    >
      Our story
    </span>

    <h2
      class="max-w-2xl text-4xl font-light leading-tight tracking-tight text-stone-900 sm:text-5xl"
    >
      Beauty is more than a routine.
      <span class="text-[#a56c52]">It's a moment for yourself.</span>
    </h2>

    <div class="my-7 h-px w-20 bg-[#a56c52]"></div>

    <p class="max-w-xl text-base leading-8 text-stone-500">
      We believe everyday care can become a meaningful ritual. Our approach
      brings together thoughtful ingredients, sensory experiences, and the
      simple pleasure of slowing down.
    </p>

    <RouterLink
      to="/about"
      class="mt-8 border-b border-stone-300 pb-2 text-sm text-stone-800 transition hover:border-[#a56c52] hover:text-[#a56c52]"
    >
      Discover our story
    </RouterLink>
  </section>
</template>
