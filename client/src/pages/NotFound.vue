<template>
  <section
    class="flex h-[90dvh] flex-col items-center justify-center px-6 text-center"
  >
    <p class="mb-6 text-sm tracking-[0.3em] text-[#a56c52] uppercase">
      Page not found
    </p>

    <h1 class="mb-4 text-8xl font-extralight tracking-tight text-stone-900">
      404
    </h1>

    <h2 class="mb-4 text-2xl font-light">This page has wandered away.</h2>

    <p class="mb-10 max-w-md leading-relaxed text-stone-500">
      The page you're looking for doesn't exist or may have been moved. Let's
      help you find something beautiful instead.
    </p>

    <RouterLink
      to="/products"
      class="bg-stone-900 px-10 py-4 text-sm tracking-widest text-white transition-colors hover:bg-[#a56c52]"
    >
      EXPLORE OUR COLLECTION
      <i class="pi pi-arrow-up-right ml-3"></i>
    </RouterLink>

    <RouterLink
      to="/"
      class="mt-6 text-sm text-stone-500 transition-colors hover:text-[#a56c52]"
    >
      Back to home
    </RouterLink>
  </section>
</template>
