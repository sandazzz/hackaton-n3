<script setup lang="js">
const props = defineProps({
    title: String,
    owner: String,
    price: Number
})
</script>

<template>
    <div class="text-white max-w-56 overflow-hidden">
        <div class="size-56 bg-white border-4 border-emerald-900 rounded-3xl hover:border-gray-400"></div>
        <p class="font-bold">{{ title }}</p>
        <p class="text-gray-400">Propriétaire: {{ owner }}</p>
        <p class="text-gray-400">6-12 mai</p>
        <p class="font-bold italic">{{ price }}€</p>
    </div>
</template>