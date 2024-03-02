<template>
    <router-link :to="{ name: 'Editor', params: { id: id } }" class="notePrev" :class="{ 
        yellow: color == 'yellow',
        aqua: color == 'aqua',
        pink: color == 'pink',
        green: color == 'green'
    }">

        <div class="prevTit" :style="{ fontSize: titleSize + 'px' }">{{ title }}</div>
        <div class="prevDesc">{{ description }}</div>
    </router-link>
</template>

<style scoped>
    @import url("./style.css");
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "NotePreview",
    props: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            titleSize: 50
        }
    },
    mounted() {
        if(this.title.length > 7) this.titleSize = 50 - (this.title.length + 7) / 2
        if(this.title.length > 20) this.titleSize = 50 - (this.title.length + 20) / 2
    },
    methods: {
        openMenu(id: string, e: MouseEvent) {
            console.log(id)
            console.log(e.clientX, e.clientY)
        }
    }
})
</script>
