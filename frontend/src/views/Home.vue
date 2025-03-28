<script setup lang="js">
import { onMounted, ref } from 'vue';
import LabContainerComponent from '../components/LabContainerComponent.vue';

const types = ref([])

onMounted(async () => {
    try {
        const res = await fetch('http://localhost:3000/types', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Erreur de récupération de l\'annonce')
        types.value = await res.json()

    } catch (err) {
        console.error('Erreur chargement profil :', err)
    }
})

</script>

<template>
    <main class="min-h-screen max-h-full bg-black">
        <LabContainerComponent 
            v-for="(item, index) in types" 
            :key="index"
            :type="item.name"
        />
    </main>
</template>