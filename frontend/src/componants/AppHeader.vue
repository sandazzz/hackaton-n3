<script setup lang="ts">
import { ref } from "vue";
import SignInModal from "./SignInModal.vue";
import SignUpModal from "./SignUpModal.vue";

const showSignInModal = ref(false);
const showSignUpModal = ref(false);
</script>

<template>
  <header
    class="sticky top-0 z-10 w-full bg-gray-900 px-4 py-2 flex flex-wrap items-center justify-between border-b border-gray-700"
  >
    <!-- Navigation -->
    <nav class="flex flex-wrap items-center gap-3 sm:gap-5">
      <button
        @click="showSignInModal = true"
        class="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white border border-gray-600 rounded-md hover:bg-gray-800 transition-all duration-200"
      >
        Connexion
      </button>

      <button
        @click="showSignUpModal = true"
        class="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white border border-gray-600 rounded-md hover:bg-gray-800 transition-all duration-200"
      >
        Inscription
      </button>
    </nav>
  </header>

  <!-- Modals -->
  <SignInModal :show="showSignInModal" @close="showSignInModal = false" />
  <SignUpModal :show="showSignUpModal" @close="showSignUpModal = false" />
</template>
