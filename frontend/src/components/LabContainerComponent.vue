<script setup>
import { onMounted, ref } from 'vue';
import CardComponent from './CardComponent.vue';

const props = defineProps({
    type: String
})

const announce = ref([])
const lab = ref([])

onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3000/announces/'+props.type, {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Erreur de récupération de l\'annonce')
        announce.value = await res.json()

        for (let i=0; i<announce.value.length; i++){
            const fetchLab = await fetch('http://localhost:3000/labos/'+announce.value[i].labo, {credentials: 'include'})
            if (!fetchLab.ok) throw new Error('Erreur de récupération de laboratoires')
            lab.value = await fetchLab.json()
            announce.value[i].price = lab.value.price 
        }

    } catch (err) {
        console.error('Erreur chargement profil :', err)
    }
})

</script>

<template>
    <div class="w-fit mx-auto mb-6">
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