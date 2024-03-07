<template>
    <router-link :to="{ name: 'Editor', params: { board: board, id: id } }" class="notePrev" :class="{ 
        yellow: color == 'yellow',
        aqua: color == 'aqua',
        pink: color == 'pink',
        green: color == 'green'
    }">

        <div class="prevTit" :style="{ fontSize: titleSize + 'px' }">{{ stateTitle }}</div>
        <div class="prevDesc">{{ stateDesc }}</div>
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
            required: true,
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
        },
        board: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            stateTitle: '',
            stateDesc: '',
            titleSize: 50
        }
    },
    mounted() {
        this.stateTitle = this.title
        this.stateDesc = this.description
        if(this.title.length > 25) this.stateTitle = this.title.slice(0, 22).trimEnd() + '...'
        if(this.description.length > 50) this.stateDesc = this.description.slice(0, 47) + '...'
        if(this.stateTitle.length > 7) this.titleSize = 50 - (this.stateTitle.length + 7) / 2
        if(this.stateTitle.length > 20) this.titleSize = 50 - (this.stateTitle.length + 10) / 2
    },
    methods: {
        openMenu(id: string, e: MouseEvent) {
            console.log(id)
            console.log(e.clientX, e.clientY)
        }
    }
})
</script>
