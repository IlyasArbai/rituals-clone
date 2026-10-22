<template>
  <template v-if="product">
    <!-- Main product -->
    <section
      class="grid min-h-[90dvh] grid-cols-1 gap-10 px-6 py-2 md:grid-cols-2 md:gap-16 md:px-20"
    >
      <div class="aspect-4/5 max-h-[95%] w-full overflow-hidden bg-stone-100">
        <img
          :src="product.image"
          :alt="product.name"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="flex flex-col justify-center">
        <RouterLink
          to="/products"
          class="mb-10 text-sm text-stone-500 transition-colors hover:text-[#a56c52]"
        >
          <i class="pi pi-arrow-left mr-2"></i>
          All products
        </RouterLink>

        <p class="mb-4 text-sm tracking-[0.2em] text-[#a56c52] uppercase">
          {{ product.category }}
        </p>

        <span
          v-if="product.badge"
          class="mb-4 w-fit border border-stone-200 px-3 py-1 text-xs tracking-widest"
        >
          {{ product.badge }}
        </span>

        <h1 class="mb-5 text-4xl font-light md:text-5xl">
          {{ product.name }}
        </h1>

        <p class="mb-6 leading-relaxed text-stone-500">
          {{ product.description }}
        </p>

        <p v-if="product.size" class="mb-6 text-sm text-stone-500">
          Size: {{ product.size }}
        </p>

        <div class="mb-8 flex items-center gap-3">
          <span class="text-2xl">
            {{ formatPrice(product.price) }}
          </span>

          <span v-if="product.oldPrice" class="text-stone-400 line-through">
            {{ formatPrice(product.oldPrice) }}
          </span>
        </div>

        <button
          v-if="auth.user?.role === 'USER'"
          class="w-full bg-stone-900 px-10 py-4 text-sm tracking-widest text-white transition-colors hover:bg-[#a56c52] md:w-fit"
        >
          ADD TO BAG
        </button>

        <div v-else-if="auth.user?.role === 'ADMIN'" class="flex space-x-5">
          <button
            class="w-full bg-stone-900 px-10 py-4 text-sm tracking-widest text-white transition-colors hover:bg-[#a56c52] md:w-fit"
            @click="$router.push(`/products/${product.id}/edit`)"
          >
            Modify
          </button>
          <button
            class="w-full bg-red-600 px-10 py-4 text-sm tracking-widest text-white transition-colors hover:bg-red-800 md:w-fit"
            @click="destroy"
          >
            Delete
          </button>
        </div>

        <button
          v-else
          class="w-full bg-stone-900 px-10 py-4 text-sm tracking-widest text-white transition-colors hover:bg-[#a56c52] md:w-fit"
          @click="$router.push('/login')"
        >
          You have to login to add to bag
        </button>
      </div>
    </section>

    <!-- Product information -->
    <section class="h-[90dvh] px-6 py-2 md:px-20">
      <div class="grid gap-10 md:grid-cols-2">
        <!-- Ingredients -->
        <div>
          <p class="mb-3 text-xs tracking-[0.2em] text-[#a56c52] uppercase">
            What's inside
          </p>

          <h2 class="mb-6 text-3xl font-light">Ingredients</h2>

          <ul class="divide-y divide-stone-200">
            <li
              v-for="ingredient in product.ingredients"
              :key="ingredient"
              class="py-4 text-sm text-stone-600"
            >
              {{ ingredient }}
            </li>
          </ul>
        </div>

        <!-- Benefits -->
        <div>
          <p class="mb-3 text-xs tracking-[0.2em] text-[#a56c52] uppercase">
            The benefits
          </p>

          <h2 class="mb-6 text-3xl font-light">Why you'll love it</h2>

          <ul class="space-y-5">
            <li
              v-for="benefit in product.benefits"
              :key="benefit"
              class="flex items-start gap-3 text-sm leading-relaxed text-stone-600"
            >
              <i class="pi pi-check mt-1 text-[#a56c52]"></i>
              {{ benefit }}
            </li>
          </ul>
        </div>

        <!-- Scent profile -->
        <div v-if="product.scent">
          <p class="mb-3 text-xs tracking-[0.2em] text-[#a56c52] uppercase">
            Fragrance
          </p>

          <h2 class="mb-6 text-3xl font-light">Scent notes</h2>

          <div class="space-y-5">
            <div
              v-for="(note, level) in product.scent"
              :key="level"
              class="flex items-center justify-between gap-6 border-b border-stone-200 pb-4"
            >
              <span class="text-sm capitalize text-stone-400">
                {{ level }}
              </span>

              <span class="text-sm text-stone-700">
                {{ note }}
              </span>
            </div>
          </div>
        </div>

        <!-- Usage and details -->
        <div>
          <p class="mb-3 text-xs tracking-[0.2em] text-[#a56c52] uppercase">
            Your ritual
          </p>

          <h2 class="mb-6 text-3xl font-light">How to use</h2>

          <p class="mb-8 text-sm leading-relaxed text-stone-500">
            {{ product.howToUse }}
          </p>

          <div v-if="product.skinType" class="mb-6">
            <h3 class="mb-2 text-sm font-medium">Skin type</h3>
            <p class="text-sm text-stone-500">
              {{ product.skinType }}
            </p>
          </div>

          <ul class="space-y-3">
            <li
              v-for="detail in product.details"
              :key="detail"
              class="text-sm text-stone-500"
            >
              {{ detail }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </template>

  <section
    v-else
    class="flex h-[90dvh] flex-col items-center justify-center px-6 text-center"
  >
    <h1 class="mb-6 text-3xl font-light">Product not found</h1>

    <RouterLink to="/products" class="text-sm text-[#a56c52] hover:underline">
      Back to products
    </RouterLink>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../utils/axios.js";
import { useAuthStore } from "../../utils/pinia.js";

const product = ref();
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

onMounted(async () => {
  const { data } = await api.get("/products/" + route.params.id);
  product.value = data.product;
  console.log(product.value);
});

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(price);

async function destroy() {
  await api.delete("/products/" + route.params.id);
  router.push("/products");
}
</script>
