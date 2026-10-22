<script setup>
import { ref } from "vue";
import api from "../../utils/axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../utils/pinia";

const router = useRouter();
const auth = useAuthStore();

const phone = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

async function login() {
  errorMessage.value = "";
  loading.value = true;

  try {
    const { data } = await api.post("/auth/login", {
      email: phone.value,
      password: password.value,
    });

    if (!data.success) {
      console.log("success false");
      errorMessage.value = data.message;
      return;
    }

    auth.login(data.user);
    router.replace("/dashboard");
  } catch (error) {
    errorMessage.value = "Unable to sign in. Please check your details.";
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section
    class="flex min-h-[90dvh] items-center justify-center bg-[#faf8f5] px-5 py-16"
  >
    <div class="w-full max-w-md">
      <div class="mb-10 text-center">
        <p
          @click="
            () => {
              console.log(auth);
            }
          "
          class="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500"
        >
          A moment for yourself
        </p>

        <h1
          class="font-serif text-4xl font-normal tracking-tight text-neutral-900 sm:text-5xl"
        >
          Welcome back
        </h1>

        <p class="mt-4 text-sm leading-6 text-neutral-500">
          Sign in to discover your personal rituals.
        </p>
      </div>

      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label
            for="email"
            class="mb-2 block text-xs font-medium tracking-wide text-neutral-700"
          >
            Email address
          </label>

          <input
            id="email"
            v-model="phone"
            type="email"
            autocomplete="email"
            placeholder="Enter your email address"
            required
            class="w-full border border-[#e5e0d9] bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-800"
          />
        </div>

        <div>
          <div class="mb-2 flex items-center justify-between">
            <label
              for="password"
              class="text-xs font-medium tracking-wide text-neutral-700"
            >
              Password
            </label>

            <RouterLink
              to="/forgot-password"
              class="text-xs text-neutral-500 underline-offset-4 transition hover:text-neutral-900 hover:underline"
            >
              Forgot password?
            </RouterLink>
          </div>

          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="Enter your password"
            required
            class="w-full border border-[#e5e0d9] bg-white px-4 py-3.5 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-800"
          />
        </div>

        <p v-if="errorMessage" role="alert" class="text-sm text-red-700">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-neutral-900 px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition duration-300 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ loading ? "Signing in..." : "Sign in" }}
        </button>
      </form>

      <div class="my-8 flex items-center gap-4">
        <div class="h-px flex-1 bg-[#e5e0d9]"></div>
        <span class="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
          New to Rituals?
        </span>
        <div class="h-px flex-1 bg-[#e5e0d9]"></div>
      </div>

      <RouterLink
        to="/register"
        class="flex w-full items-center justify-center border border-neutral-900 bg-transparent px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-900 transition duration-300 hover:bg-neutral-900 hover:text-white"
      >
        Create an account
      </RouterLink>

      <p class="mt-8 text-center text-[11px] leading-5 text-neutral-400">
        By continuing, you agree to our Terms & Conditions and Privacy Policy.
      </p>
    </div>
  </section>
</template>
