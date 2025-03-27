<script setup>
import { onMounted, ref } from 'vue';
import CardComponent from './CardComponent.vue';

const props = defineProps({
    type: String
})

const user = ref(null)

onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3000/announces', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Erreur de récupération du profil')
        user.value = await res.json()
        console.log(user.value)
    } catch (err) {
        console.error('Erreur chargement profil :', err)
    }
})

</script>

<template>
    <div class="w-fit mx-auto mt-6">
        <div class="flex text-white pb-2 border-b-2 border-gray-400 text-2xl">
            <h3>Labo de</h3>
            <p class="ml-2 bg-emerald-700 px-2 text-center rounded-full">{{props.type}}</p>
        </div>
        <div class="flex mt-3 space-x-8">
            <CardComponent region="Nouvelle Aquitaine France" owner="Jean" price="50"/>
        </div>
    </div>
</template>