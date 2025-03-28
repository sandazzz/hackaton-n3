<script setup>
import { reactive, ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["close"]);

const router = useRouter();

const form = reactive({
  firstname: "",
  lastname: "",
  phone_number: "",
  email: "",
  password: "",
});

const messages = reactive({
  error: "",
  success: "",
});

const showSuccessMessage = ref(false);

const signupUser = async () => {
  messages.error = "";
  messages.success = "";
  showSuccessMessage.value = false;

  if (
    !form.firstname ||
    !form.lastname ||
    !form.phone_number ||
    !form.email ||
    !form.password
  ) {
    messages.error = "Tous les champs sont obligatoires.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      messages.error = data.message || "Erreur lors de l'inscription.";
      return;
    }

    messages.success = data.message;
    showSuccessMessage.value = true;

    setTimeout(() => {
      emit("close");
      router.push("/");
    }, 1500);
  } catch (error) {
    console.error("Erreur :", error);
    messages.error = "Erreur de communication avec le serveur.";
  }
};

const handleEscape = (e) => {
  if (e.key === "Escape") emit("close");
};

onMounted(() => window.addEventListener("keydown", handleEscape));
onUnmounted(() => window.removeEventListener("keydown", handleEscape));

watch(
  () => props.show,
  (val) => {
    if (!val) {
      form.firstname = "";
      form.lastname = "";
      form.phone_number = "";
      form.email = "";
      form.password = "";
      messages.error = "";
      messages.success = "";
      showSuccessMessage.value = false;
    }
  }
);
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
  >
    <form
      @submit.prevent="signupUser"
      class="w-full max-w-md bg-zinc-950 backdrop-blur-lg p-6 rounded-lg border border-zinc-600 shadow-xl relative animate-fade-in"
    >
      <button
        @click="emit('close')"
        type="button"
        class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
      >
        &times;
      </button>

      <h2 class="text-xl font-semibold text-white mb-4 text-center">
        Créer un compte
      </h2>

      <div v-if="messages.error" class="mb-4 text-red-400 text-sm text-center">
        {{ messages.error }}
      </div>

      <div class="mb-3">
        <label class="block text-gray-300 text-sm mb-1">Prénom</label>
        <input
          v-model="form.firstname"
          type="text"
          class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:ring-green-400 focus:border-green-400 outline-none"
        />
      </div>

      <div class="mb-3">
        <label class="block text-gray-300 text-sm mb-1">Nom</label>
        <input
          v-model="form.lastname"
          type="text"
          class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:ring-green-400 focus:border-green-400 outline-none"
        />
      </div>

      <div class="mb-3">
        <label class="block text-gray-300 text-sm mb-1">Téléphone</label>
        <input
          v-model="form.phone_number"
          type="tel"
          class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:ring-green-400 focus:border-green-400 outline-none"
        />
      </div>

      <div class="mb-3">
        <label class="block text-gray-300 text-sm mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:ring-green-400 focus:border-green-400 outline-none"
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-300 text-sm mb-1">Mot de passe</label>
        <input
          v-model="form.password"
          type="password"
          class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:ring-green-400 focus:border-green-400 outline-none"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-white text-zinc-600 font-medium py-2 rounded-md hover:bg-green-400 hover:text-white transition-all duration-200 cursor-pointer"
      >
        S'inscrire
      </button>

      <div
        v-if="showSuccessMessage"
        class="mt-3 text-center text-green-400 font-medium"
      >
        Compte créé avec succès !
      </div>
    </form>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
