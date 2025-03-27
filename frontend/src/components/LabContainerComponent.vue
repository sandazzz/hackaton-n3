<script setup>
import CardComponent from './CardComponent.vue';

const props = defineProps({
    type: String
})

</script>

<template>
    <div class="w-fit mx-auto mt-6">
        <div class="flex text-white pb-2 border-b-2 border-gray-400 text-2xl">
            <h3>Labo de</h3>
            <p class="ml-2 bg-emerald-700 px-2 text-center rounded-full">{{props.type}}</p>
        </div>
        <div class="flex mt-3 space-x-8">
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
            <CardComponent/>
        </div>
    </div>
</template>