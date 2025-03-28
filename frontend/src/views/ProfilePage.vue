<script setup>
import { reactive, ref, onMounted } from "vue";
import ProfileSidebarNavigation from "../componants/ProfileSidebarNavigation.vue";
import ProfileEditModal from "../componants/ProfileEditModal.vue";
import ProfileInfosSection from "../componants/ProfileInfosSection.vue";

import { useRouter } from "vue-router";

const router = useRouter();

const goToCreateLab = () => {
  router.push("createLab");
};

const currentSection = ref("profile");
const showModal = ref(false);
const isLoaded = ref(false);

const user = reactive({
  nom: "",
  prenom: "",
  email: "",
  tel: "",
});
const userLabs = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3000/user/profile", {
      credentials: "include",
    });

    if (!res.ok) throw new Error("Erreur de récupération du profil");

    const data = await res.json();

    console.log(data);

    user.nom = data.user.firstname ?? "";
    user.prenom = data.user.lastname ?? "";
    user.email = data.user.email ?? "";
    user.tel = data.user.phone_number ?? "";

    userLabs.value = data.user.labo ?? [];

    isLoaded.value = true;
  } catch (err) {
    console.error("Erreur chargement profil :", err);
  }
});

function handleUpdated(newData) {
  Object.assign(user, newData);
}
</script>

<template>
  <div
    class="absolute inset-0 flex min-h-screen bg-gradient-to-r from-black via-emerald-900 to-black text-white"
  >
    <!-- Sidebar -->
    <ProfileSidebarNavigation
      :currentSection="currentSection"
      @update:currentSection="(val) => (currentSection = val)"
    />

    <!-- Fiche utilisateur -->

    <section class="w-2/3 p-12 flex flex-col justify-center items-center">
      <div v-if="!isLoaded" class="text-white text-center">
        <p>Chargement du profil...</p>
      </div>

      <div v-else class="w-full justify-center flex">
        <!-- Section infos personnelles -->
        <ProfileInfosSection
          v-if="currentSection === 'profile'"
          :user="user"
          :showModal="showModal"
          @update:showModal="(val) => (showModal = val)"
          @updated="handleUpdated"
        />

        <!-- Historique des locations -->
        <div
          v-else-if="currentSection === 'history'"
          class="text-white text-center"
        >
          <h3 class="text-xl font-semibold mb-4">Historique de locations</h3>
          <p>À implémenter...</p>
        </div>

        <!-- Annonces -->
        <div
          v-else-if="currentSection === 'annonces'"
          class="text-white text-center"
        >
          <h3 class="text-xl font-semibold mb-4">Vos annonces</h3>
          <p>À implémenter...</p>
        </div>

        <!-- Laboratoires -->
        <div v-else-if="currentSection === 'labs'" class="text-white w-full">
          <!-- Header Section -->
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-semibold tracking-tight">
              Vos laboratoires
            </h3>
            <button
              @click="goToCreateLab"
              class="bg-gradient-to-br from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-semibold py-2 px-5 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              + Nouveau labo
            </button>
          </div>

          <!-- Liste des labs -->
          <div
            v-if="userLabs.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <div
              v-for="lab in userLabs"
              :key="lab._id"
              class="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-5 rounded-2xl shadow-xl hover:shadow-emerald-500/30 transition duration-200"
            >
              <h4 class="text-xl font-semibold text-yellow-400 mb-3">
                {{ lab.description }}
              </h4>

              <ul class="space-y-1 text-sm text-zinc-300">
                <li>
                  <span class="font-semibold text-white">📍 Localisation:</span>
                  {{ lab.location }}
                </li>
                <li>
                  <span class="font-semibold text-white">💰 Prix:</span>
                  {{ lab.price }} €
                </li>
                <li>
                  <span class="font-semibold text-white">🔧 Mobile:</span>
                  {{ lab.mobile ? "Oui" : "Non" }}
                </li>
                <li v-if="lab.type?.name">
                  <span class="font-semibold text-white">🧪 Type:</span>
                  {{ lab.type.name }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Aucun labo -->
          <div v-else class="text-center text-zinc-400 mt-12">
            <p>Vous n'avez encore créé aucun laboratoire.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
