<template>
  <article class="group">
    <RouterLink
      :to="`/products/${product.id}`"
      class="relative block overflow-hidden bg-[#f3efe9]"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="aspect-4/5 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      <span
        v-if="product.badge"
        class="absolute left-4 top-4 bg-white/90 px-3 py-2 text-[9px] tracking-[0.15em] text-stone-700"
      >
        {{ product.badge }}
      </span>

      <span
        class="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white text-stone-800 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      >
        <i class="pi pi-arrow-up-right"></i>
      </span>
    </RouterLink>

    <div class="pt-5">
      <p class="text-[10px] uppercase tracking-[0.18em] text-[#a56c52]">
        {{ product.category }}
      </p>

      <h3 class="mt-2 text-lg font-light text-stone-900">
        {{ product.name }}
      </h3>

      <p class="mt-2 min-h-12 text-sm leading-6 text-stone-500">
        {{ product.description }}
      </p>

      <div class="mt-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="text-sm text-stone-900">
            €{{ product.price.toFixed(2) }}
          </span>

          <span
            v-if="product.oldPrice"
            class="text-sm text-stone-400 line-through"
          >
            €{{ product.oldPrice.toFixed(2) }}
          </span>
        </div>

        <RouterLink
          :to="`/products/${product.id}`"
          class="border-b border-stone-300 pb-1 text-[10px] tracking-[0.12em] text-stone-700 transition-colors hover:border-[#a56c52] hover:text-[#a56c52]"
        >
          DISCOVER
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>
