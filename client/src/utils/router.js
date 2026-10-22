import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./pinia.js";

import Home from "../pages/Home.vue";
import Products from "../pages/product/all.vue";
import Show from "../pages/product/show.vue";
import Form from "../pages/product/form.vue";

import Dashboard from "../pages/dashboard/index.vue";
import Login from "../pages/auth/login.vue";
import Register from "../pages/auth/register.vue";

import NotFound from "../pages/NotFound.vue";
import Token from "../pages/Token.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },

    { path: "/products", component: Products },
    { path: "/products/:id", component: Show },
    {
      path: "/products/create",
      name: "product-create",
      component: Form,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: "/products/:id/edit",
      name: "product-edit",
      component: Form,
      meta: { requiresAuth: true, requiresAdmin: true },
    },

    { path: "/token/:token", component: Token },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      component: Login,
      meta: { guestOnly: true },
    },
    {
      path: "/register",
      component: Register,
      meta: { guestOnly: true },
    },
    { path: "/:catchAll(.*)", component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }

    return { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (!auth.initialized) await auth.checkSession();

  if (to.meta.requiresAuth && !auth.isAuthenticated) return { path: "/login" };
  if (to.meta.guestOnly && auth.isAuthenticated) return { path: "/dashboard" };
  if (to.meta.requiresAdmin && auth.user?.role !== "ADMIN")
    return { path: "/dashboard" };

  return true;
});

export default router;
