<template>
  <section class="min-h-screen bg-[#faf9f6] px-5 py-12 md:px-10">
    <div class="mx-auto max-w-4xl">
      <RouterLink
        to="/products"
        class="mb-8 inline-flex items-center text-sm text-stone-500 transition hover:text-[#a56c52]"
      >
        <i class="pi pi-arrow-left mr-2"></i>
        Back to products
      </RouterLink>

      <header class="mb-8">
        <p class="mb-3 text-xs uppercase tracking-[0.25em] text-[#a56c52]">
          Product management
        </p>
        <h1 class="text-4xl font-light tracking-tight text-stone-900">
          {{ isEditMode ? "Edit product" : "Create product" }}
        </h1>
        <p class="mt-3 text-sm text-stone-500">
          {{
            isEditMode
              ? "Make changes to your product information."
              : "Add a new product to your collection."
          }}
        </p>
      </header>

      <form
        @submit.prevent="submitProduct"
        class="space-y-8 rounded-sm border border-stone-200 bg-white p-6 md:p-10"
      >
        <!-- Basic information -->
        <section>
          <h2 class="mb-5 text-lg font-medium">Basic information</h2>

          <div class="grid gap-5 md:grid-cols-2">
            <div>
              <label class="field-label">Product name *</label>
              <input
                v-model.trim="form.name"
                required
                minlength="2"
                maxlength="100"
                class="field"
                placeholder="e.g. Botanical Body Oil"
              />
            </div>

            <div>
              <label class="field-label">Category *</label>
              <select v-model="form.category" required class="field">
                <option disabled value="">Select category</option>
                <option value="BODY_CARE">Body Care</option>
                <option value="FACE_BEAUTY">Face Beauty</option>
                <option value="HAIR_STRENGTH">Hair Strength</option>
                <option value="HOME">Home</option>
              </select>
            </div>

            <div>
              <label class="field-label">Price (€) *</label>
              <input
                v-model.number="form.price"
                type="number"
                min="0"
                step="1"
                required
                class="field"
              />
            </div>

            <div>
              <label class="field-label">Old price (€)</label>
              <input
                v-model.number="form.oldPrice"
                type="number"
                min="0"
                step="1"
                class="field"
              />
            </div>

            <div>
              <label class="field-label">Size *</label>
              <input
                v-model.trim="form.size"
                required
                class="field"
                placeholder="e.g. 200 ml"
              />
            </div>

            <div>
              <label class="field-label">Skin type</label>
              <input
                v-model.trim="form.skinType"
                class="field"
                placeholder="e.g. All skin types"
              />
            </div>
          </div>

          <div class="mt-5">
            <label class="field-label">Image URL *</label>
            <input
              v-model.trim="form.image"
              type="url"
              required
              class="field"
              placeholder="https://example.com/product.jpg"
            />
          </div>

          <div class="mt-5">
            <label class="field-label">Description *</label>
            <textarea
              v-model.trim="form.description"
              required
              rows="4"
              class="field resize-y"
              placeholder="Describe your product..."
            ></textarea>
          </div>
        </section>

        <div class="border-t border-stone-200"></div>

        <!-- Product details -->
        <section>
          <h2 class="mb-2 text-lg font-medium">Product details</h2>
          <p class="mb-5 text-sm text-stone-500">
            Separate individual items with commas.
          </p>

          <div class="space-y-5">
            <div>
              <label class="field-label">Ingredients *</label>
              <textarea
                v-model="form.ingredientsText"
                required
                rows="3"
                class="field resize-y"
                placeholder="Aloe vera, coconut oil, vitamin E"
              ></textarea>
            </div>

            <div>
              <label class="field-label">Benefits *</label>
              <textarea
                v-model="form.benefitsText"
                required
                rows="3"
                class="field resize-y"
                placeholder="Hydrates skin, improves softness"
              ></textarea>
            </div>

            <div>
              <label class="field-label">Product details *</label>
              <textarea
                v-model="form.detailsText"
                required
                rows="3"
                class="field resize-y"
                placeholder="Suitable for daily use, cruelty-free"
              ></textarea>
            </div>

            <div>
              <label class="field-label">How to use *</label>
              <textarea
                v-model.trim="form.howToUse"
                required
                rows="3"
                class="field resize-y"
                placeholder="Explain how to use this product..."
              ></textarea>
            </div>
          </div>
        </section>

        <p
          v-if="errorMessage"
          class="border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {{ errorMessage }}
        </p>

        <div
          class="flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end"
        >
          <RouterLink
            to="/products"
            class="border border-stone-300 px-7 py-3 text-center text-xs tracking-[0.15em] transition hover:border-stone-900"
          >
            CANCEL
          </RouterLink>

          <button
            type="submit"
            :disabled="loading"
            class="bg-stone-900 px-7 py-3 text-xs tracking-[0.15em] text-white transition hover:bg-[#a56c52] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {{
              loading
                ? "SAVING..."
                : isEditMode
                  ? "UPDATE PRODUCT"
                  : "CREATE PRODUCT"
            }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../utils/axios";

const route = useRoute();
const router = useRouter();

const isEditMode = computed(() => Boolean(route.params.id));
const loading = ref(false);
const errorMessage = ref("");

const form = reactive({
  name: "",
  category: "",
  price: 0,
  oldPrice: null,
  size: "",
  skinType: "",
  image: "",
  description: "",
  ingredientsText: "",
  benefitsText: "",
  detailsText: "",
  howToUse: "",
});

const toList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const fromList = (value) => (Array.isArray(value) ? value.join(", ") : "");

onMounted(async () => {
  if (!isEditMode.value) return;

  loading.value = true;
  errorMessage.value = "";

  try {
    const { data } = await api.get(`/products/${route.params.id}`);
    const product = data.product;

    Object.assign(form, {
      name: product.name,
      category: product.category,
      price: product.price,
      oldPrice: product.oldPrice ?? null,
      size: product.size,
      skinType: product.skinType ?? "",
      image: product.image,
      description: product.description,
      ingredientsText: fromList(product.ingredients),
      benefitsText: fromList(product.benefits),
      detailsText: fromList(product.details),
      howToUse: product.howToUse,
    });
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ?? "Could not load the product.";
  } finally {
    loading.value = false;
  }
});

async function submitProduct() {
  errorMessage.value = "";

  const payload = {
    name: form.name,
    category: form.category,
    price: form.price,
    oldPrice: form.oldPrice === "" ? null : form.oldPrice,
    size: form.size,
    skinType: form.skinType || null,
    image: form.image,
    description: form.description,
    ingredients: toList(form.ingredientsText),
    benefits: toList(form.benefitsText),
    details: toList(form.detailsText),
    howToUse: form.howToUse,
  };

  loading.value = true;

  try {
    if (isEditMode.value) {
      await api.put(`/products/${route.params.id}`, payload);
    } else {
      await api.post("/products", payload);
    }

    await router.push("/products");
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ?? "Could not save the product.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.field-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #57534e;
}

.field {
  width: 100%;
  border: 1px solid #d6d3d1;
  border-radius: 2px;
  background: white;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #292524;
  outline: none;
  transition: border-color 150ms ease;
}

.field:focus {
  border-color: #a56c52;
}

.field::placeholder {
  color: #a8a29e;
}
</style>
