<template>
    <div id="editor">
        <nav id="toolBar">
            <input id="noteTitle" type="text" placeholder="New Note" v-model="title"/>
            <div id="colors">
                <input type="radio" v-model="color" value="yellow" class="colorChoice" datatype="yellow">
                <input type="radio" v-model="color" value="aqua" class="colorChoice" datatype="aqua">
                <input type="radio" v-model="color" value="pink" class="colorChoice" datatype="pink">
                <input type="radio" v-model="color" value="green" class="colorChoice" datatype="green">
            </div>
        </nav>
        <textarea id="text" v-model="content"/>
        <span id="autocomplete">{{ recommendation }}</span>
    </div>
</template>

<style scoped>
    @import url("./style.css");
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import MarkovChain from '../../utils/Markov'
import * as fs from 'fs'
import boardManager from '@/utils/BoardManager'

export default defineComponent({
    name: 'EditorPage',
    data() {
        return {
            id: '',
            title: '',
            content: '',
            markov: new MarkovChain(),
            recommendation: '',
            color: '' as 'yellow' | 'aqua' | 'pink' | 'green',
            saveTimeout: null as null | ReturnType<typeof setTimeout>
        }
    },
    methods: {
        autocomplete() {
            const generated = this.markov.generate(this.content)
            this.recommendation = this.content + ' ' + generated
            if(![" ", '.'].includes(this.content[this.content.length - 1])) return 
            this.markov.train(this.content)
        },
        saveNote() {
            try {
                const note = boardManager.boards.get(this.$route.params.board as string)?.notes.get(this.$route.params.id as string)
                note!.title = this.title
                note!.content = this.content
                note!.color = this.color as 'yellow' | 'aqua' | 'pink' | 'green'
                note!.save()
            }
            catch { console.log('TImed out') }
        },
        autoSave() {
            if(this.saveTimeout != null) clearTimeout(this.saveTimeout)
            this.saveTimeout = setTimeout(this.saveNote, 1000)
        }
    },
    watch: {
        content: function() {
            this.autocomplete()
            this.autoSave()
        },
        title: function() { this.autoSave() },
        color: function() { this.autoSave() }
    },
    mounted() {
        const noteData = boardManager.boards.get(this.$route.params.board as string)?.notes.get(this.$route.params.id as string)
        this.title = noteData?.title as string
        this.color = noteData?.color as 'yellow' | 'aqua' | 'pink' | 'green'
        this.content = noteData?.content as string
        this.id = noteData?.id as string
    }
})
</script>
