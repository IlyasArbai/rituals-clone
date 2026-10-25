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
          Administration
        </p>
        <h1 class="mt-1 text-3xl font-bold">Admin dashboard</h1>
        <p class="mt-2 text-sm text-[#856B67]">
          Manage customers, monitor orders, and update order statuses.
        </p>
      </div>

      <button
        class="rounded-xl border border-[#E6D8D0] px-5 py-2.5 font-medium hover:bg-[#F8F5F0] disabled:opacity-60"
        :disabled="loggingOut"
        @click="logout"
      >
        {{ loggingOut ? "Logging out..." : "Log out" }}
      </button>
    </header>

    <!-- Statistics -->
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm text-[#856B67]">Total users</p>
        <p class="mt-2 text-3xl font-bold">{{ users.length }}</p>
        <p class="mt-1 text-sm text-[#A47A70]">Registered users</p>
      </article>

      <article class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm text-[#856B67]">Verified users</p>
        <p class="mt-2 text-3xl font-bold">{{ verifiedUsers }}</p>
        <p class="mt-1 text-sm text-[#A47A70]">Email verified</p>
      </article>

      <article class="rounded-2xl bg-white p-6 shadow-sm">
        <p class="text-sm text-[#856B67]">Total orders</p>
        <p class="mt-2 text-3xl font-bold">{{ orders.length }}</p>
        <p class="mt-1 text-sm text-[#A47A70]">All loaded orders</p>
      </article>

      <article class="rounded-2xl bg-[#49252C] p-6 text-white">
        <p class="text-sm text-[#E8D5CC]">In progress</p>
        <p class="mt-2 text-3xl font-bold">{{ activeOrders }}</p>
        <p class="mt-1 text-sm text-[#E8D5CC]">Orders being processed</p>
      </article>
    </div>

    <!-- Messages -->
    <div
      v-if="successMessage"
      role="status"
      class="rounded-xl border border-[#D9E8D8] bg-[#F0F7EF] px-4 py-3 text-sm text-[#315B35]"
    >
      {{ successMessage }}
    </div>

    <div
      v-if="error"
      role="alert"
      class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {{ error }}
      <button class="ml-2 font-semibold underline" @click="fetchDashboard">
        Try again
      </button>
    </div>

    <!-- Order management -->
    <div class="space-y-5">
      <div>
        <h2 class="text-2xl font-bold">Order management</h2>
        <p class="mt-1 text-sm text-[#856B67]">
          Review orders and update their current status.
        </p>
      </div>

      <div class="grid gap-3 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-3">
        <input
          v-model="search"
          type="search"
          placeholder="Search order, customer, or email..."
          class="w-full rounded-xl border border-[#E6D8D0] bg-[#FFFEFC] px-4 py-3 outline-none focus:border-[#9A5C51] focus:ring-2 focus:ring-[#9A5C51]/15"
        />

        <select
          v-model="statusFilter"
          class="w-full rounded-xl border border-[#E6D8D0] bg-[#FFFEFC] px-4 py-3 outline-none focus:border-[#9A5C51]"
        >
          <option value="">All statuses</option>
          <option v-for="status in statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>

        <button
          class="rounded-xl bg-[#49252C] px-5 py-3 font-semibold text-white hover:bg-[#63343D] disabled:opacity-50"
          :disabled="loading"
          @click="fetchDashboard"
        >
          {{ loading ? "Loading..." : "Refresh dashboard" }}
        </button>
      </div>

      <div
        v-if="loading && !orders.length"
        class="rounded-2xl bg-white p-8 text-center text-[#856B67] shadow-sm"
      >
        Loading dashboard...
      </div>

      <div
        v-else-if="!filteredOrders.length"
        class="rounded-2xl bg-white p-10 text-center shadow-sm"
      >
        <h3 class="font-semibold">No orders found</h3>
        <p class="mt-2 text-sm text-[#856B67]">
          Try another search or status filter.
        </p>
      </div>

      <article
        v-for="order in filteredOrders"
        :key="order.id"
        class="overflow-hidden rounded-2xl bg-white shadow-sm"
      >
        <button
          class="flex w-full flex-wrap items-center justify-between gap-4 p-5 text-left hover:bg-[#FFFCF9] md:p-6"
          :aria-expanded="expandedOrder === order.id"
          @click="expandedOrder = expandedOrder === order.id ? null : order.id"
        >
          <div>
            <p class="font-semibold">Order #{{ order.id }}</p>
            <p class="mt-1 text-sm text-[#856B67]">
              {{ customerName(order) }}
            </p>
            <p class="mt-1 text-xs text-[#A47A70]">
              {{
                formatDate(order.createdAt || order.created_at || order.date)
              }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="statusClass(order.status)"
            >
              {{ order.status || "Placed" }}
            </span>

            <span class="font-semibold">
              {{ formatPrice(orderTotal(order)) }}
            </span>

            <span class="text-[#856B67]">
              {{ expandedOrder === order.id ? "−" : "+" }}
            </span>
          </div>
        </button>

        <div
          v-if="expandedOrder === order.id"
          class="border-t border-[#F0E6DF] px-5 py-5 md:px-6"
        >
          <!-- Customer -->
          <div class="mb-6 rounded-xl bg-[#FFFCF9] p-4">
            <h3 class="mb-3 font-semibold">Customer details</h3>
            <p class="text-sm">
              <span class="text-[#856B67]">Name: </span>
              {{ customerName(order) }}
            </p>
            <p class="mt-1 text-sm">
              <span class="text-[#856B67]">Email: </span>
              {{ customerEmail(order) }}
            </p>
          </div>

          <!-- Items -->
          <h3 class="mb-3 font-semibold">Order items</h3>

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
            No item details available.
          </p>

          <!-- Update status -->
          <div class="mt-5 border-t border-[#F0E6DF] pt-5">
            <label
              :for="`status-${order.id}`"
              class="mb-2 block text-sm font-semibold"
            >
              Update order status
            </label>

            <div class="flex flex-col gap-3 sm:flex-row">
              <select
                :id="`status-${order.id}`"
                v-model="order.pendingStatus"
                class="min-w-0 flex-1 rounded-xl border border-[#E6D8D0] bg-[#FFFEFC] px-4 py-3 outline-none focus:border-[#9A5C51]"
                :disabled="updatingOrderId === order.id"
              >
                <option
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
                >
                  {{ status }}
                </option>
              </select>

              <button
                class="rounded-xl bg-[#49252C] px-5 py-3 font-semibold text-white hover:bg-[#63343D] disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="
                  updatingOrderId === order.id ||
                  order.pendingStatus === order.status
                "
                @click="updateOrderStatus(order)"
              >
                {{
                  updatingOrderId === order.id ? "Updating..." : "Save status"
                }}
              </button>
            </div>

            <p v-if="order.statusError" class="mt-3 text-sm text-red-700">
              {{ order.statusError }}
            </p>
            <p v-if="order.statusSuccess" class="mt-3 text-sm text-green-700">
              {{ order.statusSuccess }}
            </p>
          </div>
        </div>
      </article>
    </div>

    <!-- Registered users -->
    <div class="space-y-5">
      <div>
        <h2 class="text-2xl font-bold">Registered users</h2>
        <p class="mt-1 text-sm text-[#856B67]">
          {{ users.length }} users registered, {{ verifiedUsers }} verified,
          {{ users.length - verifiedUsers }} unverified.
        </p>
      </div>

      <div class="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table class="w-full min-w-[600px] text-left text-sm">
          <thead class="border-b border-[#F0E6DF] bg-[#FFFCF9]">
            <tr>
              <th class="px-5 py-4 font-semibold">ID</th>
              <th class="px-5 py-4 font-semibold">User</th>
              <th class="px-5 py-4 font-semibold">Email</th>
              <th class="px-5 py-4 font-semibold">Orders</th>
              <th class="px-5 py-4 font-semibold">Verification</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-[#F0E6DF]">
            <tr v-for="user in users" :key="user.id">
              <td class="px-5 py-4">{{ user.id }}</td>

              <td class="px-5 py-4 font-medium">
                {{ user.name || "Unnamed user" }}
              </td>

              <td class="px-5 py-4 text-[#856B67]">
                {{ user.email || "—" }}
              </td>

              <td class="px-5 py-4">{{ user.ordersCount }}</td>

              <td class="px-5 py-4">
                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="
                    user.emailVerified
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-800'
                  "
                >
                  {{ user.emailVerified ? "Verified" : "Unverified" }}
                </span>
              </td>
            </tr>

            <tr v-if="!loading && !users.length">
              <td colspan="5" class="px-5 py-8 text-center text-[#856B67]">
                No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
const users = ref([]);

const loading = ref(true);
const loggingOut = ref(false);
const updatingOrderId = ref(null);

const error = ref("");
const successMessage = ref("");
const search = ref("");
const statusFilter = ref("Preparing");
const expandedOrder = ref(null);

const statuses = ["Preparing", "Delivering", "Delivered", "Cancelled"];

const verifiedUsers = computed(
  () => users.value.filter((user) => user.emailVerified).length,
);

const activeOrders = computed(
  () =>
    orders.value.filter((order) =>
      ["Preparing", "Delivering"].includes(order.status),
    ).length,
);

const filteredOrders = computed(() => {
  const query = search.value.trim().toLowerCase();

  return orders.value.filter((order) => {
    const matchesStatus =
      !statusFilter.value ||
      order.status?.toLowerCase() === statusFilter.value.toLowerCase();

    const matchesSearch =
      !query ||
      String(order.id).includes(query) ||
      customerName(order).toLowerCase().includes(query) ||
      customerEmail(order).toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });
});

function customerName(order) {
  return (
    order.user?.name ||
    order.customer?.name ||
    order.userName ||
    order.customer_name ||
    "Customer"
  );
}

function customerEmail(order) {
  return (
    order.user?.email ||
    order.customer?.email ||
    order.userEmail ||
    order.customer_email ||
    "Not provided"
  );
}

function formatPrice(price) {
  return `$${(Number(price) || 0).toLocaleString("en-US", {
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
  if (order.total != null) return Number(order.total) || 0;
  if (order.totalAmount != null) return Number(order.totalAmount) || 0;

  return (order.items ?? []).reduce(
    (total, item) =>
      total + Number(item.price ?? 0) * Number(item.quantity ?? 1),
    0,
  );
}

function statusClass(status) {
  switch (status) {
    case "Preparing":
      return "bg-amber-50 text-amber-800";
    case "Delivering":
      return "bg-blue-50 text-blue-700";
    case "Delivered":
      return "bg-emerald-50 text-emerald-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-[#F1E8E0] text-[#76534E]";
  }
}

async function fetchDashboard() {
  loading.value = true;
  error.value = "";

  try {
    const { data } = await api.get("/admin/dashboard");

    orders.value = (data.orders ?? []).map((order) => ({
      ...order,
      pendingStatus: order.status ?? "Preparing",
      statusError: "",
      statusSuccess: "",
    }));

    users.value = (data.users ?? []).map((user) => ({
      ...user,
      ordersCount:
        user.ordersCount ??
        orders.value.filter(
          (order) =>
            String(
              order.user?.id ??
                order.customer?.id ??
                order.userId ??
                order.user_id ??
                order.customerId ??
                order.customer_id ??
                "",
            ) === String(user.id),
        ).length,
    }));
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Unable to load admin dashboard. Please try again.";
  } finally {
    loading.value = false;
  }
}

async function updateOrderStatus(order) {
  if (updatingOrderId.value !== null) return;
  if (order.pendingStatus === order.status) return;

  order.statusError = "";
  order.statusSuccess = "";
  updatingOrderId.value = order.id;

  try {
    const { data } = await api.post(`/orders/${order.id}/status`, {
      status: order.pendingStatus,
    });

    console.log(data);

    order.status = (data.order ?? data).status ?? order.pendingStatus;
    order.pendingStatus = order.status;
    order.statusSuccess = "Order status updated successfully.";
  } catch (err) {
    order.pendingStatus = order.status;
    order.statusError =
      err.response?.data?.message ||
      "Unable to update this order. Please try again.";
  } finally {
    updatingOrderId.value = null;
  }
}

async function logout() {
  if (loggingOut.value) return;

  loggingOut.value = true;

  try {
    await auth.logout();
    await router.push("/login");
  } catch {
    error.value = "Unable to log out. Please try again.";
  } finally {
    loggingOut.value = false;
  }
}

onMounted(fetchDashboard);
</script>
