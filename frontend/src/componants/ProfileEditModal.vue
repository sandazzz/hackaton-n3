<script setup>
import { reactive, ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  show: Boolean,
  userData: Object,
});
const emit = defineEmits(["close", "updated"]);

const form = reactive({
  nom: "",
  prenom: "",
  email: "",
  tel: "",
});

const messages = reactive({
  error: "",
  success: "",
});

const showSuccessMessage = ref(false);

// Remplir les champs avec les données reçues
watch(
  () => props.userData,
  (val) => {
    if (val) {
      form.nom = val.nom || "";
      form.prenom = val.prenom || "";
      form.email = val.email || "";
      form.tel = val.tel || "";
    }
  },
  { immediate: true }
);

const updateProfile = async () => {
  messages.error = "";
  messages.success = "";
  showSuccessMessage.value = false;

  try {
    const response = await fetch("http://localhost:3000/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        firstname: form.nom,
        lastname: form.prenom,
        email: form.email,
        phone_number: form.tel,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      messages.error = data.message || "Erreur lors de la mise à jour.";
      return;
    }

    messages.success = "Profil mis à jour avec succès !";
    showSuccessMessage.value = true;

    setTimeout(() => {
      emit("updated", form);
      emit("close");
    }, 1500);
  } catch (error) {
    console.error("Erreur réseau :", error);
    messages.error = "Erreur de connexion au serveur.";
  }
};

const handleEscape = (e) => {
  if (e.key === "Escape") emit("close");
};

onMounted(() => window.addEventListener("keydown", handleEscape));
onUnmounted(() => window.removeEventListener("keydown", handleEscape));
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
  >
    <form
      @submit.prevent="updateProfile"
      class="w-full max-w-md bg-zinc-950 p-6 rounded-lg border border-zinc-600 shadow-xl relative animate-fade-in"
    >
      <button
        @click="emit('close')"
        type="button"
        class="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
      >
        &times;
      </button>

      <h2 class="text-xl font-semibold text-white mb-4 text-center">
        Modifier le profil
      </h2>

      <div v-if="messages.error" class="mb-4 text-red-400 text-sm text-center">
        {{ messages.error }}
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm text-white mb-1">Nom</label>
          <input
            v-model="form.nom"
            type="text"
            class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm text-white mb-1">Prénom</label>
          <input
            v-model="form.prenom"
            type="text"
            class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm text-white mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm text-white mb-1">Téléphone</label>
          <input
            v-model="form.tel"
            type="text"
            class="w-full px-4 py-2 bg-gray-700 text-white border border-zinc-600 rounded-md focus:border-green-400 focus:ring-1 focus:ring-green-400 outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full mt-6 bg-white text-black font-semibold py-2 rounded-md hover:bg-green-400 hover:text-white transition duration-300"
      >
        Sauvegarder
      </button>

      <div
        v-if="showSuccessMessage"
        class="mt-4 text-center text-green-400 font-medium"
      >
        Profil mis à jour !
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
