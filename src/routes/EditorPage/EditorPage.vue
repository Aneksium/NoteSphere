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
            try { fs.writeFileSync(`./notes/${this.id}.ns`, `${this.title}\n${this.color}\n${this.content}`, 'utf-8') }
            catch { console.log('Error occured.') }
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
        const data = fs.readFileSync(`./notes/${this.$route.params.id}`, 'utf-8')
        const formatted = data.split('\n')
        const title = formatted[0]
        const color = formatted[1] as 'yellow' | 'aqua' | 'pink' | 'green'
        const content = formatted.slice(2, formatted.length).join('\n')
        
        this.title = title
        this.color = color
        this.content = content
        this.id = this.$route.params.id as string
    }
})
</script>
