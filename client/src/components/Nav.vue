<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../utils/pinia.js";
import { RouterLink } from "vue-router";

const auth = useAuthStore();
const cartOpen = ref(false);
const menuOpen = ref(false);
const cartItems = ref([]);

const navItems = [
  { label: "Products", href: "/products" },
  { label: "Collections", href: "/#collections" },
  { label: "Our philosophy", href: "/#philosophy" },
  { label: "Our story", href: "/#story" },
];

function handleKeydown(event) {
  if (event.key === "Escape") {
    cartOpen.value = false;
    menuOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-[10vh] min-h-16 w-full items-center justify-between border-b border-stone-200 bg-white px-5 md:px-20"
  >
    <RouterLink
      to="/"
      class="text-xl font-light tracking-[0.2em] text-stone-900 transition-opacity hover:opacity-70 sm:text-2xl"
    >
      RITUALS<span class="text-[#a56c52]">.</span>
    </RouterLink>

    <nav class="hidden items-center gap-10 text-sm text-stone-600 md:flex">
      <RouterLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.href"
        class="group relative py-2 transition-colors duration-200 hover:text-[#a56c52]"
      >
        {{ item.label }}
        <span
          class="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#a56c52] transition-transform duration-300 group-hover:scale-x-100"
        ></span>
      </RouterLink>
    </nav>

    <div class="flex items-center gap-4 sm:gap-6">
      <RouterLink
        to="/dashboard"
        aria-label="My account"
        class="flex items-center gap-3 rounded-full px-3 py-2 text-stone-600 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-100 hover:text-[#a56c52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a56c52]"
      >
        <span class="text-sm font-medium">
          {{ auth.user?.name ? `Welcome ${auth.user.name}` : "Login" }}
        </span>

        <i class="pi pi-user text-lg"></i>
      </RouterLink>

      <button
        v-if="auth.user?.role !== 'ADMIN'"
        type="button"
        aria-label="Open shopping bag"
        class="relative text-stone-600 transition hover:-translate-y-0.5 hover:text-[#a56c52]"
        @click="cartOpen = true"
      >
        <i class="pi pi-shopping-bag text-lg"></i>

        <span
          class="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#a56c52] text-[9px] text-white"
        >
          {{ cartItems.length }}
        </span>
      </button>

      <button
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="menuOpen"
        class="text-stone-600 transition hover:text-[#a56c52] md:hidden"
        @click="menuOpen = !menuOpen"
      >
        <i :class="menuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-lg"></i>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="-translate-y-2 opacity-0"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <nav
        v-if="menuOpen"
        class="absolute left-0 right-0 top-full flex flex-col border-b border-stone-200 bg-white px-5 py-4 shadow-lg md:hidden"
      >
        <a
          v-for="item in navItems"
          :key="item.label"
          :href="item.href"
          class="border-b border-stone-100 py-4 text-sm text-stone-600 transition hover:text-[#a56c52] last:border-0"
          @click="menuOpen = false"
        >
          {{ item.label }}
        </a>
      </nav>
    </Transition>
  </header>

  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="cartOpen"
        class="fixed inset-0 z-100 bg-black/35"
        @click.self="cartOpen = false"
      ></div>
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="cartOpen"
        class="fixed right-0 top-0 z-101 flex h-dvh w-full flex-col bg-[#faf9f6] shadow-2xl sm:w-[85%] md:w-[50%] lg:w-[30%]"
      >
        <div
          class="flex items-center justify-between border-b border-stone-200 px-5 py-5 sm:px-8 sm:py-6"
        >
          <div>
            <p class="text-[10px] tracking-[0.2em] text-[#a56c52]">
              YOUR SELECTION
            </p>

            <h2 class="mt-2 text-xl font-light text-stone-900">
              Shopping bag
              <span class="text-sm text-stone-400">
                ({{ cartItems.length }})
              </span>
            </h2>
          </div>

          <button
            type="button"
            aria-label="Close shopping bag"
            class="text-stone-500 transition hover:rotate-90 hover:text-[#a56c52]"
            @click="cartOpen = false"
          >
            <i class="pi pi-times text-lg"></i>
          </button>
        </div>

        <div
          v-if="!cartItems.length"
          class="flex flex-1 flex-col items-center justify-center px-5 text-center sm:px-8"
        >
          <i class="pi pi-shopping-bag mb-6 text-3xl text-stone-300"></i>

          <h3 class="text-lg font-light text-stone-900">
            A moment for yourself
          </h3>

          <p class="mt-3 max-w-xs text-sm leading-6 text-stone-500">
            Your shopping bag is empty. Discover something special for your
            everyday ritual.
          </p>

          <a
            href="/products"
            class="mt-8 bg-stone-900 px-8 py-4 text-[10px] tracking-[0.15em] text-white transition hover:bg-[#a56c52]"
            @click="cartOpen = false"
          >
            DISCOVER PRODUCTS
          </a>
        </div>

        <div v-else class="flex-1 overflow-y-auto px-5 py-4 sm:px-8 sm:py-6">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex gap-3 border-b border-stone-200 py-5 sm:gap-4"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="h-20 w-16 shrink-0 object-cover sm:h-24 sm:w-20"
            />

            <div class="flex min-w-0 flex-1 flex-col justify-center">
              <h3 class="wrap-break-word text-sm text-stone-900">
                {{ item.name }}
              </h3>

              <p class="mt-2 text-sm text-stone-500">
                {{ item.quantity }} × {{ item.price }}
              </p>
            </div>
          </div>
        </div>

        <div class="border-t border-stone-200 px-5 py-5 sm:px-8 sm:py-6">
          <p class="text-center text-xs leading-6 text-stone-500">
            Thoughtfully chosen. Beautifully yours.
          </p>

          <a
            v-if="cartItems.length"
            href="/cart"
            class="mt-4 flex w-full justify-center bg-stone-900 px-6 py-4 text-center text-[10px] tracking-[0.15em] text-white transition hover:bg-[#a56c52]"
            @click="cartOpen = false"
          >
            VIEW SHOPPING BAG
          </a>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>
