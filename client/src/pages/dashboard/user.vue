<template>
  <section
    class="min-h-[90dvh] space-y-8 bg-[#F8F5F0] px-5 pt-10 pb-[15dvh] text-[#49252C] md:px-20"
  >
    <!-- Header -->
    <header
      class="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white p-6 shadow-sm"
    >
      <div>
        <p class="text-sm font-medium uppercase tracking-widest text-[#A47A70]">
          Your account
        </p>
        <h1 class="mt-1 text-3xl font-bold">
          Welcome{{ form.name ? `, ${form.name}` : "" }}
        </h1>
        <p class="mt-2 text-sm text-[#856B67]">
          Manage your profile and keep track of your orders.
        </p>
      </div>

      <button
        class="rounded-xl border border-[#E6D8D0] px-5 py-2.5 font-medium transition hover:bg-[#F8F5F0] disabled:opacity-60"
        :disabled="loggingOut"
        @click="logout"
      >
        {{ loggingOut ? "Logging out..." : "Log out" }}
      </button>
    </header>

    <!-- Overview -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm text-[#856B67]">Total orders</p>
        <p class="mt-2 text-3xl font-bold">{{ orders.length }}</p>
        <p class="mt-1 text-sm text-[#A47A70]">Orders on your account</p>
      </article>

      <article class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm text-[#856B67]">Email verification</p>
        <p class="mt-2 font-semibold">
          {{ isEmailVerified ? "Verified" : "Not verified" }}
        </p>
        <button
          v-if="!isEmailVerified"
          class="mt-3 text-sm font-semibold text-[#9A5C51] underline underline-offset-4 hover:text-[#49252C] disabled:opacity-60"
          :disabled="sendingVerification"
          @click="resendVerification"
        >
          {{ sendingVerification ? "Sending..." : "Resend verification email" }}
        </button>
      </article>

      <article
        class="rounded-2xl bg-[#49252C] p-6 text-white sm:col-span-2 lg:col-span-1"
      >
        <p class="text-sm text-[#E8D5CC]">Account reminder</p>
        <p class="mt-2 font-semibold">Keep your details up to date</p>
        <p class="mt-1 text-sm text-[#E8D5CC]">
          Check your profile information and order status here.
        </p>
      </article>
    </div>

    <!-- Feedback -->
    <div
      v-if="verificationMessage"
      class="rounded-xl border border-[#D9E8D8] bg-[#F0F7EF] px-4 py-3 text-sm text-[#315B35]"
      role="status"
    >
      {{ verificationMessage }}
    </div>

    <div
      v-if="verificationError"
      class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      role="alert"
    >
      {{ verificationError }}
    </div>

    <div
      v-if="profileError"
      class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
      role="alert"
    >
      {{ profileError }}
    </div>

    <!-- Profile -->
    <div class="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <div class="mb-6">
        <h2 class="text-xl font-bold">Profile settings</h2>
        <p class="mt-1 text-sm text-[#856B67]">
          Update the name and email associated with your account.
        </p>
      </div>

      <form class="grid gap-5 md:grid-cols-2" @submit.prevent="saveProfile">
        <label class="block">
          <span class="mb-2 block text-sm font-medium">Full name</span>
          <input
            v-model="form.name"
            type="text"
            autocomplete="name"
            required
            class="w-full rounded-xl border border-[#E6D8D0] bg-[#FFFEFC] px-4 py-3 outline-none transition focus:border-[#9A5C51] focus:ring-2 focus:ring-[#9A5C51]/15"
          />
        </label>

        <label class="block">
          <span class="mb-2 block text-sm font-medium">Email address</span>
          <input
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            class="w-full rounded-xl border border-[#E6D8D0] bg-[#FFFEFC] px-4 py-3 outline-none transition focus:border-[#9A5C51] focus:ring-2 focus:ring-[#9A5C51]/15"
          />
        </label>

        <p
          v-if="successMessage"
          class="text-sm text-green-700 md:col-span-2"
          role="status"
        >
          {{ successMessage }}
        </p>

        <div class="flex flex-wrap items-center gap-3 md:col-span-2">
          <button
            type="submit"
            :disabled="saving || !hasChanges"
            class="rounded-xl bg-[#49252C] px-6 py-3 font-semibold text-white transition hover:bg-[#63343D] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{ saving ? "Saving..." : "Save changes" }}
          </button>

          <button
            v-if="hasChanges"
            type="button"
            class="rounded-xl border border-[#E6D8D0] px-5 py-3 font-medium hover:bg-[#F8F5F0]"
            @click="resetProfile"
          >
            Discard changes
          </button>
        </div>
      </form>
    </div>

    <!-- Orders -->
    <div class="space-y-5">
      <div>
        <h2 class="text-2xl font-bold">Order history</h2>
        <p class="mt-1 text-sm text-[#856B67]">
          View order details and check the latest status.
        </p>
      </div>

      <div
        v-if="loading"
        class="rounded-2xl bg-white p-8 text-center text-[#856B67] shadow-sm"
      >
        Loading your orders...
      </div>

      <div
        v-else-if="error"
        class="rounded-2xl bg-white p-8 text-center shadow-sm"
      >
        <p>{{ error }}</p>
        <button
          class="mt-4 rounded-xl bg-[#49252C] px-5 py-2.5 font-medium text-white hover:bg-[#63343D]"
          @click="fetchOrders"
        >
          Try again
        </button>
      </div>

      <div
        v-else-if="!orders.length"
        class="rounded-2xl bg-white p-10 text-center shadow-sm"
      >
        <h3 class="font-semibold">No orders yet</h3>
        <p class="mt-2 text-sm text-[#856B67]">
          Your orders will appear here when you place one.
        </p>
      </div>

      <article
        v-for="order in orders"
        :key="order.id"
        class="overflow-hidden rounded-2xl bg-white shadow-sm"
      >
        <button
          class="flex w-full flex-wrap items-center justify-between gap-4 p-5 text-left transition hover:bg-[#FFFCF9] md:p-6"
          :aria-expanded="expandedOrder === order.id"
          @click="toggleOrder(order.id)"
        >
          <div>
            <p class="font-semibold">Order #{{ order.id }}</p>
            <p class="mt-1 text-sm text-[#856B67]">
              {{
                formatDate(order.createdAt || order.created_at || order.date)
              }}
            </p>
          </div>

          <div class="flex items-center gap-3">
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold capitalize"
              :class="statusClass(order.status)"
            >
              {{ order.status || "Placed" }}
            </span>
            <span class="font-semibold">{{
              formatPrice(orderTotal(order))
            }}</span>
            <span class="text-[#856B67]">
              {{ expandedOrder === order.id ? "−" : "+" }}
            </span>
          </div>
        </button>

        <div
          v-if="expandedOrder === order.id"
          class="border-t border-[#F0E6DF] px-5 py-5 md:px-6"
        >
          <h3 class="mb-4 font-semibold">Items</h3>

          <div v-if="order.items?.length" class="divide-y divide-[#F0E6DF]">
            <div
              v-for="(item, index) in order.items"
              :key="item.id || item.product_id || index"
              class="flex items-start justify-between gap-4 py-3"
            >
              <div>
                <p class="font-medium">
                  {{ item.name || item.product?.name || "Item" }}
                </p>
                <p class="mt-1 text-sm text-[#856B67]">
                  Quantity: {{ item.quantity ?? 1 }}
                </p>
              </div>
              <p class="whitespace-nowrap font-medium">
                {{
                  formatPrice(
                    Number(item.price ?? 0) * Number(item.quantity ?? 1),
                  )
                }}
              </p>
            </div>
          </div>

          <p v-else class="text-sm text-[#856B67]">
            No item details are available for this order.
          </p>

          <div
            class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0E6DF] pt-4"
          >
            <button
              v-if="String(order.status).toLowerCase() === 'preparing'"
              class="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
              :disabled="cancellingOrderId === order.id"
              @click.stop="cancelOrder(order)"
            >
              {{
                cancellingOrderId === order.id
                  ? "Cancelling..."
                  : "Cancel order"
              }}
            </button>
          </div>

          <p
            v-if="order.cancelSuccess"
            class="mt-3 text-sm text-green-700"
            role="status"
          >
            {{ order.cancelSuccess }}
          </p>

          <p
            v-if="order.cancelError"
            class="mt-3 text-sm text-red-700"
            role="alert"
          >
            {{ order.cancelError }}
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../utils/pinia.js";
import api from "../../utils/axios.js";

const auth = useAuthStore();
const router = useRouter();

const orders = ref([]);
const expandedOrder = ref(null);
const cancellingOrderId = ref(null);
const loading = ref(true);
const loggingOut = ref(false);
const saving = ref(false);
const sendingVerification = ref(false);

const error = ref("");
const profileError = ref("");
const successMessage = ref("");
const verificationMessage = ref("");
const verificationError = ref("");

const form = ref({ name: "", email: "" });
const originalProfile = ref({ name: "", email: "" });

const isEmailVerified = computed(() => auth.user?.emailVerified === true);

const emailChanged = computed(
  () =>
    form.value.email.trim().toLowerCase() !==
    originalProfile.value.email.toLowerCase(),
);

const hasChanges = computed(
  () =>
    form.value.name.trim() !== originalProfile.value.name || emailChanged.value,
);

function syncProfile(user = {}) {
  const profile = {
    name: user.name ?? "",
    email: user.email ?? "",
  };

  form.value = { ...profile };
  originalProfile.value = { ...profile };
}

function resetProfile() {
  syncProfile(originalProfile.value);
  profileError.value = "";
  successMessage.value = "";
}

function formatPrice(price) {
  const amount = Number(price ?? 0);
  return `$${(Number.isFinite(amount) ? amount : 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date) {
  if (!date || Number.isNaN(new Date(date).getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

function orderTotal(order) {
  return (order.items ?? []).reduce(
    (total, item) =>
      total + Number(item.price ?? 0) * Number(item.quantity ?? 1),
    0,
  );
}

function statusClass(status) {
  const value = String(status ?? "placed").toLowerCase();

  if (["cancelled", "canceled", "failed", "refunded"].includes(value)) {
    return "bg-red-50 text-red-700";
  }
  if (["delivered", "completed"].includes(value)) {
    return "bg-emerald-50 text-emerald-700";
  }
  if (["preparing", "processing"].includes(value)) {
    return "bg-amber-50 text-amber-800";
  }
  if (["shipped", "out for delivery"].includes(value)) {
    return "bg-blue-50 text-blue-700";
  }

  return "bg-[#F1E8E0] text-[#76534E]";
}

function toggleOrder(id) {
  expandedOrder.value = expandedOrder.value === id ? null : id;
}

async function fetchOrders() {
  loading.value = true;
  error.value = "";

  try {
    const { data } = await api.get("/users/me");
    orders.value = Array.isArray(data.orders) ? data.orders : [];

    if (data.user) auth.user = { ...auth.user, ...data.user };
    syncProfile(auth.user);
  } catch (err) {
    error.value = "Please check your connection and try again.";
    console.error("Unable to load account:", err);
  } finally {
    loading.value = false;
  }
}

async function saveProfile() {
  profileError.value = "";
  successMessage.value = "";

  const name = form.value.name.trim();
  const email = form.value.email.trim();

  if (!name || !email) {
    profileError.value = "Please enter your name and email.";
    return;
  }

  if (!hasChanges.value || saving.value) return;

  saving.value = true;

  try {
    const changedEmail = emailChanged.value;
    const { data } = await api.patch("/users", { name, email });
    auth.user = { ...auth.user, ...(data.user ?? data) };
    syncProfile(auth.user);

    successMessage.value = changedEmail
      ? "Profile updated. Please verify your new email if requested."
      : "Your profile has been updated successfully.";
  } catch (err) {
    profileError.value =
      err.response?.data?.message ||
      "Unable to update your profile. Please try again.";
  } finally {
    saving.value = false;
  }
}

async function resendVerification() {
  verificationError.value = "";
  verificationMessage.value = "";

  if (sendingVerification.value) return;
  sendingVerification.value = true;

  try {
    // The server identifies the user from the existing session/cookie.
    const { data } = await api.post("/auth/send", { purpose: "email" });
    console.log(data);
    verificationMessage.value =
      "Verification email sent. Please check your inbox.";
  } catch (err) {
    verificationError.value =
      err.response?.data?.message ||
      "Unable to send the verification email. Please try again.";
  } finally {
    sendingVerification.value = false;
  }
}

async function cancelOrder(order) {
  if (String(order.status).toLowerCase() !== "preparing") return;
  if (cancellingOrderId.value !== null) return;

  if (!window.confirm(`Are you sure you want to cancel order #${order.id}?`)) {
    return;
  }

  cancellingOrderId.value = order.id;
  order.cancelError = "";
  order.cancelSuccess = "";

  try {
    await api.post("/order/cancel", { order_id: order.id });
    order.status = "Cancelled";
    order.cancelSuccess = "Your order has been cancelled successfully.";
  } catch (err) {
    order.cancelError =
      err.response?.data?.message ||
      "Unable to cancel this order. Please try again.";
  } finally {
    cancellingOrderId.value = null;
  }
}

async function logout() {
  if (loggingOut.value) return;

  loggingOut.value = true;

  try {
    await auth.logout();
    await router.push("/login");
  } catch (err) {
    console.error("Logout failed:", err);
    profileError.value = "Unable to log out. Please try again.";
  } finally {
    loggingOut.value = false;
  }
}

onMounted(fetchOrders);
</script>
