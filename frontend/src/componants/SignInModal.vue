<script setup>
import { reactive, ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({ show: Boolean });
const emit = defineEmits(["close"]);

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
});

const messages = reactive({
  error: "",
  success: "",
});

const showSuccessMessage = ref(false);

const loginUser = async () => {
  messages.error = "";
  messages.success = "";
  showSuccessMessage.value = false;

  if (!form.email || !form.password) {
    messages.error = "Tous les champs sont obligatoires.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // pour inclure les cookies (ex: JWT)
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      messages.error = data.message || "Erreur lors de la connexion.";
      return;
    }

    messages.success = data.message;
    showSuccessMessage.value = true;

    setTimeout(() => {
      emit("close");
      router.push("/");
    }, 1500);
  } catch (error) {
    console.error("Erreur réseau :", error);
    messages.error = "Erreur de connexion au serveur.";
  }
};

const handleEscape = (e) => {
  if (e.key === "Escape") {
    emit("close");
  }
};

onMounted(() => window.addEventListener("keydown", handleEscape));
onUnmounted(() => window.removeEventListener("keydown", handleEscape));

watch(
  () => props.show,
  (val) => {
    if (!val) {
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
      @submit.prevent="loginUser"
      class="w-full max-w-md bg-zink-950 backdrop-blur-lg p-6 rounded-lg border border-zinc-600 shadow-xl relative animate-fade-in"
    >
      <button
        @click="emit('close')"
        type="button"
        class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
      >
        &times;
      </button>

      <h2 class="text-xl font-semibold text-white mb-4 text-center">
        Connexion
      </h2>

      <div v-if="messages.error" class="mb-4 text-red-400 text-sm text-center">
        {{ messages.error }}
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-300 text-sm font-medium mb-1"
          >Email</label
        >
        <input
          v-model="form.email"
          type="email"
          id="email"
          class="w-full px-4 py-2 bg-gray-700 text-white border border-zink-600 rounded-md focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none"
        />
      </div>

      <div class="mb-5">
        <label
          for="password"
          class="block text-gray-300 text-sm font-medium mb-1"
          >Mot de passe</label
        >
        <input
          v-model="form.password"
          type="password"
          id="password"
          class="w-full px-4 py-2 bg-gray-700 text-white border border-zink-600 rounded-md focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-white text-zinc-600 font-medium py-2 rounded-md hover:bg-green-400 hover:text-white transition-all duration-200 cursor-pointer"
      >
        Se connecter
      </button>

      <div
        v-if="showSuccessMessage"
        class="mt-3 text-center text-green-400 font-medium"
      >
        Connexion réussie !
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
