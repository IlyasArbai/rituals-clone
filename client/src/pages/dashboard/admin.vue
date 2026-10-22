<template>
  <section class="h-[90dvh]">
    admin dashboard {{ auth.user.name }}
    <button
      type="button"
      @click="logout"
      class="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg border border-[#E0D2C8] px-5 py-3 text-sm font-medium transition hover:border-[#762C40] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#762C40] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        class="h-4 w-4"
      >
        <path
          d="M10 17l5-5-5-5M15 12H3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6"
          stroke-linecap="round"
        />
      </svg>
      <span>"Log out"</span>
    </button>
  </section>
</template>

<script setup>
import { useAuthStore } from "../../utils/pinia.js";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

async function logout() {
  try {
    await auth.logout();
    await router.push("/login");
  } catch (err) {
    console.error("Logout failed:", err);
  }
}
</script>
