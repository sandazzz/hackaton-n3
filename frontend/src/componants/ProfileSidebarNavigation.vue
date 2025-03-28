<script setup>
import logo from "../assets/logo.svg"; 

const props = defineProps({
  currentSection: String,
});

const emit = defineEmits(["update:currentSection"]);

const navItems = [
  { label: "Informations Personnelles", key: "profile" },
  { label: "Historique de locations", key: "history" },
  { label: "Vos annonces", key: "annonces" },
  { label: "Vos laboratoires", key: "labs" },
];
</script>

<template>
  <nav
    class="w-1/3 p-8 space-y-6 border-r border-yellow-500 bg-black bg-opacity-40 backdrop-blur-sm"
  >
    <img :src="logo" alt="Logo" class="w-16 mx-auto mb-6" />
    <h2 class="text-2xl font-semibold mb-6 text-center">Ton Profil</h2>

    <ul class="space-y-4 text-lg list-disc list-inside">
      <li v-for="item in navItems" :key="item.key">
        <button
          @click="emit('update:currentSection', item.key)"
          class="underline decoration-yellow-500 hover:text-yellow-400"
          :class="{
            'text-yellow-400 font-semibold': currentSection === item.key,
          }"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>
