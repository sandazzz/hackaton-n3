<script setup>
import ProfileEditModal from './ProfileEditModal.vue'; 

const props = defineProps({
  user: Object,
  showModal: Boolean,
});

const emit = defineEmits(['update:showModal', 'updated']);

const fields = [
  { label: 'Nom', key: 'nom' },
  { label: 'Prénom', key: 'prenom' },
  { label: 'Email', key: 'email' },
  { label: 'Téléphone', key: 'tel' },
];
</script>

<template>
  <div
    class="bg-black bg-opacity-80 text-white rounded-2xl shadow-[0_0_25px_#00FFAE] p-10 w-full max-w-md border border-gray-700 space-y-6"
  >
    <div v-for="field in fields" :key="field.key">
      <h3 class="text-lg font-semibold">{{ field.label }}</h3>
      <p class="italic text-yellow-400">{{ user[field.key] }}</p>
      <hr class="border-yellow-500 my-2" />
    </div>

    <button
      @click="emit('update:showModal', true)"
      class="bg-white text-black font-semibold rounded px-6 py-2 hover:bg-yellow-400 transition duration-300 mx-auto mt-4"
    >
      Modifier
    </button>

    <ProfileEditModal
      :show="showModal"
      :userData="user"
      @close="emit('update:showModal', false)"
      @updated="(data) => emit('updated', data)"
    />
  </div>
</template>
