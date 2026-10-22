<template>
  <footer class="bg-[#f5f0e8] text-stone-700">
    <div
      class="flex items-center justify-center border-b border-stone-200 px-5 py-10 sm:px-8 sm:py-16 md:px-20"
    >
      <div class="items-center gap-16">
        <div>
          <span class="text-xs uppercase tracking-[0.25em] text-[#a56c52]">
            A moment for yourself
          </span>

          <h2
            class="mt-4 max-w-lg text-3xl font-light leading-tight tracking-tight text-stone-900 sm:text-4xl"
          >
            Make room for
            <span class="text-[#a56c52]">little moments of joy.</span>
          </h2>

          <p class="mt-4 max-w-md text-sm leading-6 text-stone-500">
            Join our world of mindful beauty, thoughtful rituals, and
            inspiration for everyday living.
          </p>
        </div>

        <p class="mt-3 text-sm text-[#a56c52]">Thank you for joining us.</p>
      </div>
    </div>

    <div
      class="grid grid-cols-2 gap-8 px-5 py-10 sm:gap-10 sm:px-8 sm:py-14 md:grid-cols-4 md:gap-12 md:px-20"
    >
      <div class="col-span-2 md:col-span-1">
        <RouterLink
          to="/"
          @click="scrollToTop"
          class="text-2xl font-light tracking-[0.2em] text-stone-900"
        >
          RITUALS<span class="text-[#a56c52]">.</span>
        </RouterLink>

        <p class="mt-5 max-w-xs text-sm leading-7 text-stone-500">
          Thoughtful skincare inspired by nature, timeless traditions, and the
          beauty of everyday rituals.
        </p>

        <div class="mt-6 flex items-center gap-5">
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            class="text-stone-500 transition hover:text-[#a56c52]"
          >
            <i class="pi pi-instagram text-lg"></i>
          </a>

          <a
            href="https://facebook.com"
            aria-label="Facebook"
            class="text-stone-500 transition hover:text-[#a56c52]"
          >
            <i class="pi pi-facebook text-lg"></i>
          </a>

          <a
            href="https://pinterest.com"
            aria-label="Pinterest"
            class="text-stone-500 transition hover:text-[#a56c52]"
          >
            <i class="pi pi-pinterest text-lg"></i>
          </a>
        </div>
      </div>

      <div>
        <h3
          class="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-900"
        >
          Discover
        </h3>

        <div class="flex flex-col items-start gap-4 text-sm text-stone-500">
          <RouterLink to="/products" class="transition hover:text-[#a56c52]">
            All products
          </RouterLink>
          <RouterLink
            to="/#collections"
            class="transition hover:text-[#a56c52]"
          >
            Collections
          </RouterLink>
          <RouterLink to="/#philosophy" class="transition hover:text-[#a56c52]">
            Our philosophy
          </RouterLink>
          <RouterLink to="/#about" class="transition hover:text-[#a56c52]">
            Our story
          </RouterLink>
        </div>
      </div>

      <div>
        <h3
          class="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-900"
        >
          Customer care
        </h3>

        <div class="flex flex-col items-start gap-4 text-sm text-stone-500">
          <RouterLink to="/contact" class="transition hover:text-[#a56c52]">
            Contact us
          </RouterLink>
          <RouterLink to="/shipping" class="transition hover:text-[#a56c52]">
            Shipping & delivery
          </RouterLink>
          <RouterLink to="/returns" class="transition hover:text-[#a56c52]">
            Returns & refunds
          </RouterLink>
          <RouterLink to="/faq" class="transition hover:text-[#a56c52]">
            Frequently asked questions
          </RouterLink>
        </div>
      </div>

      <div>
        <h3
          class="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-stone-900"
        >
          Your account
        </h3>

        <div class="flex flex-col items-start gap-4 text-sm text-stone-500">
          <RouterLink to="/login" class="transition hover:text-[#a56c52]">
            Sign in
          </RouterLink>
          <RouterLink to="/register" class="transition hover:text-[#a56c52]">
            Create an account
          </RouterLink>
          <RouterLink to="/cart" class="transition hover:text-[#a56c52]">
            Your shopping bag
          </RouterLink>
        </div>

        <div class="mt-8 flex items-center gap-3 text-stone-500">
          <i class="pi pi-lock text-[#a56c52]"></i>
          <span class="text-xs">A secure shopping experience</span>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col gap-4 border-t border-stone-200 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between md:px-20"
    >
      <p class="text-xs text-stone-500">
        © {{ new Date().getFullYear() }} Rituals. All rights reserved.
      </p>

      <div
        class="flex flex-wrap items-center gap-5 text-xs text-stone-500 sm:gap-6"
      >
        <RouterLink to="/privacy" class="transition hover:text-[#a56c52]">
          Privacy
        </RouterLink>
        <RouterLink to="/terms" class="transition hover:text-[#a56c52]">
          Terms
        </RouterLink>
        <button class="transition hover:text-[#a56c52]" @click="scrollToTop">
          Back to top ↑
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
