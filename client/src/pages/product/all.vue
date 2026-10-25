<script setup>
import { computed, ref, onMounted } from "vue";
import ProductCard from "#src/components/Card.vue";
import api from "#src/utils/axios.js";
import { useAuthStore } from "#root/src/utils/pinia.js";

const auth = useAuthStore();
const products = ref([]);

onMounted(async () => {
  const { data } = await api.get("/products");
  products.value = data.products;
});

const categories = [
  "All products",
  "BODY_CARE",
  "FACE_BEAUTY",
  "HAIR_STRENGTH",
  "HOME",
];

const selectedCategory = ref("All products");

const filteredProducts = computed(() =>
  selectedCategory.value === "All products"
    ? products.value
    : products.value.filter(
        (product) => product.category === selectedCategory.value,
      ),
);
</script>

<template>
  <section class="flex h-[90dvh] flex-col px-4 py-6 sm:px-8 sm:py-8 lg:px-20">
    <div class="mb-8 flex shrink-0 items-center justify-between gap-4">
      <div class="flex gap-4 overflow-x-auto sm:gap-6">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="
            selectedCategory === category
              ? 'border-b border-[#a56c52] text-stone-900'
              : 'text-stone-400'
          "
          class="shrink-0 pb-2 text-sm transition-colors"
        >
          {{ category }}
        </button>
      </div>
      <div class="flex items-center justify-between">
        <p class="shrink-0 text-sm text-stone-500">
          {{ filteredProducts.length }} products
        </p>

        <RouterLink
          v-if="auth?.user?.role == 'ADMIN'"
          to="/products/create"
          aria-label="Create product"
          title="Create product"
          class="inline-flex h-8 w-8 items-center justify-center rounded-md text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
        >
          <i class="pi pi-plus text-lg"></i>
        </RouterLink>
      </div>
    </div>

    <div class="min-h-0 flex-1 overflow-y-auto">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>
