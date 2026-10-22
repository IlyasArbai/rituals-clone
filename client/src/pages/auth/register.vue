<script setup>
import { ref } from "vue";
import api from "../../utils/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const loading = ref(false);

async function register() {
  errorMessage.value = "";

  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match.";
    return;
  }

  loading.value = true;

  try {
    const { data } = await api.post("/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (!data.success) {
      errorMessage.value = data.message;
      return;
    }

    router.replace("/login");
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      "Unable to create your account. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section
    class="flex h-[90dvh] w-full items-center justify-center overflow-y-auto bg-[#faf8f5] px-4 py-6 sm:px-6 sm:py-8"
  >
    <div class="my-auto w-full max-w-md shrink-0">
      <div class="mb-6 text-center sm:mb-8">
        <p
          class="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500 sm:mb-4"
        >
          A moment for yourself
        </p>

        <h1
          class="font-serif text-3xl font-normal tracking-tight text-neutral-900 sm:text-4xl md:text-5xl"
        >
          Create your account
        </h1>

        <p
          class="mx-auto mt-3 max-w-xs text-sm leading-6 text-neutral-500 sm:mt-4"
        >
          Begin your journey to more mindful rituals.
        </p>
      </div>

      <form @submit.prevent="register" class="space-y-4 sm:space-y-5">
        <div>
          <label
            for="name"
            class="mb-2 block text-xs font-medium tracking-wide text-neutral-700"
          >
            Full name
          </label>

          <input
            id="name"
            v-model="name"
            type="text"
            autocomplete="name"
            placeholder="Enter your full name"
            required
            class="w-full min-w-0 border border-[#e5e0d9] bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-800"
          />
        </div>

        <div>
          <label
            for="email"
            class="mb-2 block text-xs font-medium tracking-wide text-neutral-700"
          >
            Email address
          </label>

          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="Enter your email address"
            required
            class="w-full min-w-0 border border-[#e5e0d9] bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-800"
          />
        </div>

        <div>
          <label
            for="password"
            class="mb-2 block text-xs font-medium tracking-wide text-neutral-700"
          >
            Password
          </label>

          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="new-password"
            placeholder="Create a password"
            minlength="8"
            required
            class="w-full min-w-0 border border-[#e5e0d9] bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-800"
          />

          <p class="mt-1.5 text-xs text-neutral-400">
            Use at least 8 characters.
          </p>
        </div>

        <div>
          <label
            for="confirmPassword"
            class="mb-2 block text-xs font-medium tracking-wide text-neutral-700"
          >
            Confirm password
          </label>

          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="Confirm your password"
            minlength="8"
            required
            class="w-full min-w-0 border border-[#e5e0d9] bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-800"
          />
        </div>

        <p
          v-if="errorMessage"
          role="alert"
          class="wrap-break-word text-sm text-red-700"
        >
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-neutral-900 px-4 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 sm:tracking-[0.2em]"
        >
          {{ loading ? "Creating account..." : "Create account" }}
        </button>
      </form>

      <div class="my-5 flex items-center gap-3 sm:my-6 sm:gap-4">
        <div class="h-px flex-1 bg-[#e5e0d9]"></div>

        <span
          class="shrink-0 text-center text-[9px] uppercase tracking-[0.15em] text-neutral-400 sm:text-[10px] sm:tracking-[0.2em]"
        >
          Already a member?
        </span>

        <div class="h-px flex-1 bg-[#e5e0d9]"></div>
      </div>

      <RouterLink
        to="/login"
        class="flex w-full items-center justify-center border border-neutral-900 bg-transparent px-4 py-4 text-xs font-medium uppercase tracking-[0.15em] text-neutral-900 transition duration-300 hover:bg-neutral-900 hover:text-white sm:tracking-[0.2em]"
      >
        Sign in
      </RouterLink>

      <p
        class="mx-auto mt-5 max-w-sm text-center text-[10px] leading-5 text-neutral-400 sm:mt-6 sm:text-[11px]"
      >
        By creating an account, you agree to our Terms & Conditions and Privacy
        Policy.
      </p>
    </div>
  </section>
</template>
