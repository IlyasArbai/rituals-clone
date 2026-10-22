<script setup>
import { useAuthStore } from "../../utils/pinia.js";
import AdminDashboard from "./admin.vue";
import UserDashboard from "./user.vue";

const auth = useAuthStore();
</script>

<template>
  <section v-if="auth.loading" class="h-[90dvh]">Checking session...</section>

  <AdminDashboard v-else-if="auth.user?.role === 'ADMIN'" />
  <UserDashboard v-else-if="auth.user?.role === 'USER'" />

  <section v-else class="h-[90dvh]">elseee</section>
</template>
