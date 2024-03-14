<template>
    <button @click="openEditor()" class="notePrev" :class="{ 
        yellow: color == 'yellow',
        aqua: color == 'aqua',
        pink: color == 'pink',
        green: color == 'green'
    }">

        <div class="prevTit" :style="{ fontSize: titleSize + 'px' }">{{ stateTitle }}</div>
        <div class="prevDesc">{{ stateDesc }}</div>
    </button>
</template>

<style scoped>
    @import url("./style.css");
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { remote } from 'electron'
import OpenedEditors from '@/utils/OpenedEditors'

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
    mounted() { this.handleFontSize() },
    watch: {
        title: function() { this.handleFontSize() },
        description: function() { this.handleFontSize() }
    },
    methods: {
        handleFontSize() {
            this.stateTitle = this.title
            this.stateDesc = this.description
            if(this.title.length > 25) this.stateTitle = this.title.slice(0, 22).trimEnd() + '...'
            if(this.description.length > 50) this.stateDesc = this.description.slice(0, 47) + '...'
            if(this.stateTitle.length > 7) this.titleSize = 50 - (this.stateTitle.length + 7) / 2
            if(this.stateTitle.length > 20) this.titleSize = 50 - (this.stateTitle.length + 10) / 2
            console.log(this.stateTitle)
        },
        openEditor() {
            if(OpenedEditors.includes(`${this.board}/${this.id}`)) return null
            const modalPath = process.env.NODE_ENV === 'development'
                ? `http://localhost:8080/#/edit/${this.board}/${this.id}`
                : `file://${__dirname}/index.html#/edit/${this.board}/${this.id}`
                let win2 = new remote.BrowserWindow({
                    width: 500,
                    height: 500,
                    frame: false,
                    minWidth: 500,
                    minHeight: 500,
                    icon: 'icon.png',
                    webPreferences: {
                        nodeIntegration: true,
                        contextIsolation: false,
                        enableRemoteModule: true
                    }
                })
                win2.loadURL(modalPath)
                OpenedEditors.push(`${this.board}/${this.id}`)
        }
    }
})
</script>
