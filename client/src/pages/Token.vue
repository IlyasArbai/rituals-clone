<template>
  <section
    class="relative flex min-h-[90dvh] items-center justify-center overflow-hidden bg-[#f7f4ee] px-5 py-12 text-[#3c2925]"
  >
    <!-- Soft decorative background -->
    <div
      class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#e9ded0]/60 blur-3xl"
    />
    <div
      class="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#e7d8cc]/50 blur-3xl"
    />

    <div class="relative z-10 w-full max-w-lg">
      <!-- Brand -->
      <header class="mb-10 text-center">
        <div
          class="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-[#87685a]"
        >
          YOUR BRAND
        </div>
        <div class="mx-auto h-px w-12 bg-[#b99b82]" />
      </header>

      <!-- Loading -->
      <section
        v-if="status === 'loading'"
        class="py-12 text-center"
        aria-live="polite"
      >
        <div
          class="mx-auto mb-6 h-10 w-10 animate-spin rounded-full border border-[#d9c8b8] border-t-[#765044]"
        />
        <h1 class="font-serif text-3xl">A moment of care</h1>
        <p class="mt-3 text-sm text-[#826f65]">
          We're checking your verification link.
        </p>
      </section>

      <!-- Verification success -->
      <section
        v-else-if="status === 'verified'"
        class="border border-[#e8ded2] bg-[#fffdf9]/90 px-7 py-12 text-center shadow-[0_20px_70px_rgba(75,49,36,0.07)] sm:px-12 sm:py-14"
        aria-live="polite"
      >
        <div
          class="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#d8c4b2] bg-[#f5eee5]"
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            class="h-9 w-9"
            aria-hidden="true"
          >
            <path
              d="M13 24.5L21 32L36 16"
              stroke="#795747"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <p
          class="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#987963]"
        >
          YOUR JOURNEY BEGINS
        </p>

        <h1
          class="font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl"
        >
          A little more<br />peace of mind.
        </h1>

        <p class="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#7d6a60]">
          Your email has been verified successfully. Everything is ready for you
          to continue.
        </p>

        <div class="mx-auto my-8 h-px w-12 bg-[#d7c1ae]" />

        <p class="font-serif text-lg italic text-[#795747]">
          Thank you for being here.
        </p>
      </section>

      <!-- Invalid or expired token -->
      <section
        v-else-if="status === 'expired'"
        class="border border-[#e8ded2] bg-[#fffdf9]/90 px-7 py-12 text-center shadow-[0_20px_70px_rgba(75,49,36,0.07)] sm:px-12 sm:py-14"
        aria-live="polite"
      >
        <div
          class="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#e4d6c9] bg-[#f5eee5]"
        >
          <svg
            viewBox="0 0 48 48"
            fill="none"
            class="h-8 w-8"
            aria-hidden="true"
          >
            <path
              d="M24 15V25M24 32H24.02"
              stroke="#795747"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle
              cx="24"
              cy="24"
              r="17"
              stroke="#795747"
              stroke-width="1.5"
            />
          </svg>
        </div>

        <p
          class="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#987963]"
        >
          ONE SMALL STEP
        </p>

        <h1 class="font-serif text-4xl font-normal sm:text-5xl">
          Let's try again.
        </h1>

        <p class="mx-auto mt-6 max-w-sm text-sm leading-7 text-[#7d6a60]">
          This verification link may have expired or is no longer valid. Request
          a new link to continue.
        </p>
      </section>

      <!-- Existing verification form -->

      <!-- Set password form -->
      <section
        v-else-if="status === 'pending'"
        class="border border-[#e8ded2] bg-[#fffdf9]/90 px-7 py-12 shadow-[0_20px_70px_rgba(75,49,36,0.07)] sm:px-12 sm:py-14"
      >
        <div class="mb-8 text-center">
          <p
            class="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[#987963]"
          >
            YOUR NEXT CHAPTER
          </p>

          <h1
            class="font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl"
          >
            Create your<br />new password.
          </h1>

          <p class="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#7d6a60]">
            Choose a password to keep your account safe and secure.
          </p>
        </div>

        <form @submit.prevent="handlePasswordSubmit" class="space-y-6">
          <div>
            <label
              for="password"
              class="mb-2 block text-xs font-medium tracking-wide text-[#795747]"
            >
              Password
            </label>

            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="new-password"
              required
              minlength="8"
              placeholder="Enter your password"
              class="w-full border border-[#e4d6c9] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#3c2925] outline-none transition placeholder:text-[#b6a398] focus:border-[#987963] focus:ring-1 focus:ring-[#987963]/20"
            />
          </div>

          <div>
            <label
              for="confirmPassword"
              class="mb-2 block text-xs font-medium tracking-wide text-[#795747]"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              minlength="8"
              placeholder="Confirm your password"
              class="w-full border border-[#e4d6c9] bg-[#fffdf9] px-4 py-3.5 text-sm text-[#3c2925] outline-none transition placeholder:text-[#b6a398] focus:border-[#987963] focus:ring-1 focus:ring-[#987963]/20"
            />
          </div>

          <p v-if="passwordError" class="text-sm text-red-700" role="alert">
            {{ passwordError }}
          </p>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-[#795747] px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-[#fffdf9] transition hover:bg-[#634437] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {{ isSubmitting ? "Please wait..." : "Set New Password" }}
          </button>
        </form>

        <div class="mx-auto mt-8 h-px w-12 bg-[#d7c1ae]"></div>
      </section>

      <footer class="mt-9 text-center">
        <p class="text-[10px] tracking-[0.18em] text-[#9b897d]">
          MADE FOR YOUR EVERYDAY MOMENTS
        </p>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from "../utils/axios";

const route = useRoute();
const status = ref("loading");

onMounted(async () => {
  try {
    const token = route.params.token;
    const { data } = await api.get(`/auth/${token}`);
    console.log(data);
    status.value = data.status;
  } catch {
    status.value = "expired";
  }
});
</script>
