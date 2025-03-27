<script setup>
import { onMounted, ref } from 'vue';
import CardComponent from './CardComponent.vue';
import { Lab } from '../../../backend/models/lab';

const props = defineProps({
    type: String
})

const announce = ref([])
const lab = ref([])

onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3000/announces', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Erreur de récupération de l\'annonce')
        announce.value = await res.json()

        const fetchLab = await fetch('http://localhost:3000/labos/'+announce.value[0].labo, {
            credentials: 'include'
        }) // A changer !!!
        if (!fetchLab.ok) throw new Error('Erreur de récupération de laboratoires')
        lab.value = await fetchLab.json()

        announce.value[0].price = lab.value.price //CECI EST UN TEST, MERCI DE NE PAS PANIQUER
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
            <CardComponent
                v-for="(item, index) in announce"
                :key="index"
                :title="item.title"
                :owner="item.owner"
                :price="item.price"
            />
        </div>
    </div>
</template>