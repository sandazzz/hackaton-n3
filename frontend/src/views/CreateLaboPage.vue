<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const labForm = reactive({
  description: "",
  price: "",
  location: "",
  mobile: false,
  type: "",
});

const types = ref([]);
const messages = reactive({ error: "", success: "" });

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/lab/types", {
      credentials: "include",
    });
    const data = await res.json();
    types.value = data.types;
  } catch (err) {
    messages.error = "Erreur chargement types";
  }
});

const submitLab = async () => {
  messages.error = "";
  messages.success = "";

  if (
    !labForm.description ||
    !labForm.price ||
    !labForm.location ||
    !labForm.type
  ) {
    messages.error = "Tous les champs sont obligatoires.";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/lab/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(labForm),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Erreur création labo");

    messages.success = "Laboratoire créé avec succès !";
    router.push("/profile");
  } catch (err) {
    messages.error = err.message;
  }
};
</script>

<template>
  <div
    class="w-full min-h-screen absolute inset-0 bg-black flex justify-center items-center"
  >
    <form
      @submit.prevent="submitLab"
      class="space-y-4 text-white max-w-md w-full p-6 bg-zinc-900 rounded-lg border border-zinc-700 shadow-lg"
    >
      <h2 class="text-2xl font-semibold mb-4">Créer un laboratoire</h2>

      <div v-if="messages.error" class="text-red-400 text-sm">
        {{ messages.error }}
      </div>
      <div v-if="messages.success" class="text-green-400 text-sm">
        {{ messages.success }}
      </div>

      <div>
        <label>Description</label>
        <input
          v-model="labForm.description"
          class="w-full p-2 bg-zinc-800 rounded"
        />
      </div>

      <div>
        <label>Prix</label>
        <input
          v-model="labForm.price"
          type="number"
          class="w-full p-2 bg-zinc-800 rounded"
        />
      </div>

      <div>
        <label>Localisation</label>
        <input
          v-model="labForm.location"
          class="w-full p-2 bg-zinc-800 rounded"
        />
      </div>

      <div>
        <label>Mobile</label>
        <input type="checkbox" v-model="labForm.mobile" class="ml-2" />
      </div>

      <div>
        <label>Type de labo</label>
        <select v-model="labForm.type" class="w-full p-2 bg-zinc-800 rounded">
          <option disabled value="">Sélectionner un type</option>
          <option v-for="type in types" :key="type._id" :value="type._id">
            {{ type.name }}
          </option>
        </select>
      </div>

      <button
        type="submit"
        class="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-4 rounded"
      >
        Créer
      </button>
    </form>
  </div>
</template>
