<template>
  <div class="flex min-h-screen bg-gradient-to-r from-black via-emerald-900 to-black text-white">
    <!-- Sidebar -->
    <nav class="w-1/3 p-8 space-y-6 border-r border-yellow-500 bg-black bg-opacity-40 backdrop-blur-sm">
      <img :src="logo" alt="Logo" class="w-16 mx-auto mb-6" />
      <h2 class="text-2xl font-semibold mb-6 text-center">Ton Profil &gt; Compte</h2>
      <ul class="space-y-4 text-lg list-disc list-inside">
        <li>
          <RouterLink to="/infos" class="underline decoration-yellow-500 hover:text-yellow-400">
            Informations Personnelles
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/locations" class="underline decoration-yellow-500 hover:text-yellow-400">
            Historique de locations
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/new" class="underline decoration-yellow-500 hover:text-yellow-400">
            Mettre en location
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/annonces" class="underline decoration-yellow-500 hover:text-yellow-400">
            Vos annonces
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/labs" class="underline decoration-yellow-500 hover:text-yellow-400">
            Vos laboratoires
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Fiche utilisateur -->
    <section class="w-2/3 p-12 flex flex-col justify-center items-center">
      <div
        v-if="user"
        class="bg-black bg-opacity-80 text-white rounded-2xl shadow-[0_0_25px_#00FFAE] p-10 w-full max-w-md border border-gray-700 space-y-6"
      >
        <div>
          <h3 class="text-lg font-semibold">Nom</h3>
          <p class="italic text-yellow-400">{{ user.nom }}</p>
          <hr class="border-yellow-500 my-2" />
        </div>
        <div>
          <h3 class="text-lg font-semibold">Prénom</h3>
          <p class="italic text-yellow-400">{{ user.prenom }}</p>
          <hr class="border-yellow-500 my-2" />
        </div>
        <div>
          <h3 class="text-lg font-semibold">Email</h3>
          <p class="italic text-yellow-400">{{ user.email }}</p>
          <hr class="border-yellow-500 my-2" />
        </div>
        <div>
          <h3 class="text-lg font-semibold">Téléphone</h3>
          <p class="italic text-yellow-400">{{ user.tel }}</p>
          <hr class="border-yellow-500 my-2" />
        </div>

        <button
          class="bg-white text-black font-semibold rounded px-6 py-2 hover:bg-yellow-400 transition duration-300 mx-auto mt-4"
        >
          Modifier
        </button>
      </div>

      <div v-else class="text-white text-center">
        <p>Chargement du profil...</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import logo from '../assets/logo.svg'

const user = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/profile', {
      credentials: 'include', // important pour que les cookies soient envoyés
    })
    if (!res.ok) throw new Error('Erreur de récupération du profil')
    user.value = await res.json()
    console.log(user.value)
  } catch (err) {
    console.error('Erreur chargement profil :', err)
  }
})
</script>

<style scoped>
/* Tu peux ajouter une police ou ajuster plus tard */
</style>
