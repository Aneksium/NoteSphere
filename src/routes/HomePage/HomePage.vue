<template>
    <div id="homeContextOverlay" :style="`pointer-events: ${contextMenu.visible ? 'all' : 'none'}`">
        <div 
            id="notePrevMenu"
            :style="`
                top: ${contextMenu.notePreview.top}px;
                left: ${contextMenu.notePreview.left}px;
                display: ${contextMenu.notePreview.visible ? 'flex' : 'none'};
            `"
            @blur="toggleContextOverlay('notePreview', false)"
        >
        <button class="npmBtn" datatype="delete" @click="deleteNote()">Delete</button>
    </div>
    </div>
    <div id="overlayMenuDisplay" :style="`display: ${overlayMenu.visible ? 'flex' : 'none'}`">
        <div id="createBoardMenu" :style="`display: ${overlayMenu.boardCreate.visible ? 'flex' : 'none'}`">
            <span class="genTitle">Board Name:</span>
            <input id="nameInput" type="text" placeholder="New Board" v-model="overlayMenu.boardCreate.name"/>
            <div id="boardCreateMenBtns">
                <button class="boardCreateMenBtn" @click="cancelBoardCreate()">Cancel</button>
                <button class="boardCreateMenBtn" datatype="create" @click="createBoard()">Create</button>
            </div>
        </div>
    </div>
    <div id="navSpace"></div>
    <div id="homeCont">
        <div id="boardMenu">
            <div id="boardMenHead">
                <span class="genSubTitle">My Boards</span>
                <button id="newBoardBtn" @click="showOverlay('boardCreate', true)">New</button>
            </div>
            <div id="boardMenBtnCont">
                <button 
                    class="boardMenBtn"
                    v-for="(board, i) in loadedBoards"
                    :key="i"
                    @click="currentBoard = board[0]"
                    :style="currentBoard == board[0] ? 'background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.15); padding-left: 15px' : ''">
                    {{ board[0] }}
                </button>
            </div>
        </div>
        <div id="homeText" :style="`display: ${currentBoard == null ? 'flex' : 'none'}`">{{ currentBoard == null ? loadedBoards.size == 0 ? 'No boards created.\nCreate your first board to begin' : 'No board loaded.\nLoad a board and your notes will appear here' : '' }}</div>
        <div id="home" :style="`gap: ${homeContainer.gap}px; display: ${currentBoard != null ? 'flex' : 'none'}`">
            <NotePreviewVue
                v-for="(note, i) in loadedNotes"
                :key="i"
                :title="note.title"
                :description="note.content"
                :color="note.color"
                :id="note.id"
                :board="currentBoard || ''"
                @contextmenu="toggleContextOverlay('notePreview', true, $event, note.id)"
            />
            <div id="newCont">
                <button id="newBtn" @click="createNote()" :style="`display: ${currentBoard == null ? 'none' : 'inherit'}`">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 500 500">
                        <path fill-rule="evenodd" fill="rgb(45, 45, 45)" id="col1" d="M138,0H300c29.266,0,63.36-3.025,87,4,34.395,10.221,64.1,29.185,83,55,14.363,19.616,22.614,42.029,29,70,3.588,15.717,1,36.6,1,54V292c0,39.771,2.6,82.627-9,111-12.482,30.536-33.546,57.373-60,74-41.961,26.373-91.163,23-159,23H188c-25.881,0-54.3,2.148-75-4C57.487,479.51,20.4,442.587,4,387c-5.126-17.371-4-39.156-4-61V236c0-42.87-5.051-96.182,6-130C20.368,62.03,51.248,28.6,92,11c9.493-4.1,20.615-6.406,31-9C127.871,0.783,134.26,2.32,138,0Z"/>
                        <path fill-rule="evenodd" fill="rgb(255, 255, 255)" id="col2" d="M277,134c0.692,2.6,1.571,3.251,3,5h1v2l2,1v2l2,1v3l2,1v4h1q0.5,10,1,20v38h57v1h2v1l6,1v1l3,1,1,2h2v1c1.758,1.437,2.408,2.277,5,3a7.551,7.551,0,0,0,2,4h1v2l2,1v2l2,1v3c0.666,1.595,4.381,7.63,2,9h2c0.163,8.4-.574,14.149-3,20h-1v3l-2,1-1,4h-1c-1.432,1.791-2.254,2.394-3,5-3.311.873-4.672,3.117-7,5v1h-2c-4.7,2.708-7.433,4.742-15,5v2H289v52h-1q-0.5,4.5-1,9l-2,1v3l-2,1v2l-2,1v2h-1c-1.438,1.759-2.275,2.408-3,5a8.19,8.19,0,0,0-4,2v1h-2l-1,2-5,1-1,2c-1.814.91-16.619,2.973-20,2-20.186-5.808-28.072-14-34-34V316c0-8.069-1.328-19.683,1-26H158c-2.785-3.79-4.828-1.342-9-3v-1h-2v-1h-3l-1-2h-2l-1-2h-2l-3-4-4-3v-2l-2-1-1-3h-1v-3h-1v-2h-1q-0.5-7.5-1-15,0.5-6,1-12h1q1-3,2-6h1v-2l4-3v-2h1q0.5-1,1-2c2.319-1.826,1.749,1.054,3-3l3-1v-1h3q0.5-1,1-2h2v-1l6-1v-1h57c-0.27-19.027-2.493-53.843,4-66l2-1v-2l10-11,4-1q0.5-1,1-2h3v-1l4-1v-1h6v-1l17,1v1h3l1,2,5,1,1,2h2v1A8.224,8.224,0,0,0,277,134Z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    @import url("./style.css");
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import NotePreviewVue from '@/components/NotePreview/NotePreview.vue'
import boardManager from '@/utils/BoardManager'
import Note from '@/utils/Note'

export default defineComponent({
    components: {
        NotePreviewVue,
    },
    data() {
        return {
            loadedBoards: new Map(),
            currentBoard: null as null | string,
            loadedNotes: [] as Note[],
            homeContainer: {
                gap: 0
            },
            overlayMenu: {
                visible: false,
                boardCreate: {
                    visible: false,
                    name: ''
                }
            },
            contextMenu: {
                visible: false,
                notePreview: {
                    visible: false,
                    id: '',
                    top: 0,
                    left: 0
                }
            }
        }
    },
    watch: {
        currentBoard: function() {
            if(this.currentBoard == null) return
            this.loadedNotes = []
            this.loadedNotes = Array.from(boardManager.boards.get(this.currentBoard)!.notes).map(x => x[1])
            console.log(boardManager.boards.get(this.currentBoard)!.notes)
        }
    },
    methods: {
        createBoard() {
            if(this.overlayMenu.boardCreate.name == '') return // make error showing thingy
            const res = boardManager.createBoard(this.overlayMenu.boardCreate.name)
            if(!res) return // make error showing thingy x2

            this.loadedBoards = boardManager.boards
            this.showOverlay('boardCreate', false)
            this.currentBoard = this.overlayMenu.boardCreate.name
            this.overlayMenu.boardCreate.name = ''
        },
        cancelBoardCreate() {
            this.showOverlay('boardCreate', false)
            this.overlayMenu.boardCreate.name = ''
        },
        createNote() {
            const board = boardManager.boards.get(this.currentBoard!)
            const notes = board?.createNote()
            this.loadedNotes = Array.from(notes!).map(x => x[1])
        },
        showOverlay(overlay: string, visible: boolean) {
            this.overlayMenu.visible = visible;
            (this.overlayMenu[overlay as keyof typeof this.overlayMenu] as { visible: boolean }).visible = visible
        },
        toggleContextOverlay(overlay: string, visible: boolean, ...args: unknown[]) {
            this.contextMenu.visible = visible;
            if(overlay == 'notePreview') {
                this.contextMenu.notePreview.visible = visible
                if(visible) {
                    const e = args[0] as MouseEvent
                    this.contextMenu.notePreview.id = args[1] as string
                    this.contextMenu.notePreview.top = e.clientY
                    this.contextMenu.notePreview.left = e.clientX
                }
            }
        },
        deleteNote() {
            const res = boardManager.boards.get(this.currentBoard!)?.deleteNote(this.contextMenu.notePreview.id)
            this.loadedNotes = Array.from(res!).map(x => x[1])
            this.toggleContextOverlay('notePreview', false)
        },

        resizeNoteDisplay() {
            // currently fixing
            // const winWidth = remote.getCurrentWindow().getBounds().width
            // const menuWidth = 16*16
            // const noteWidth = 13*16 
            // const contWidth = winWidth - menuWidth - 6*16
            // const noteCount = Math.floor(contWidth / noteWidth)
            // this.homeContainer.gap = (contWidth - noteCount*noteWidth) / (noteCount - 1) - 3
        }
    },
    mounted() {
        this.loadedBoards = boardManager.boards
        this.currentBoard = null
        this.resizeNoteDisplay()
        window.addEventListener('resize', this.resizeNoteDisplay)
    }
})
</script>
