import fs from 'fs'
import NoteManager from "./NoteManager"

export class BoardManager {
    public boards: Map<string, NoteManager> = new Map()
    public loadBoards() {
        if(!fs.existsSync('./notes')) return fs.mkdirSync('./notes')
        const boardDirs = fs.readdirSync('./notes')
        for(const dir of boardDirs) 
            this.boards.set(dir, new NoteManager(`./notes/${dir}`))
    }
    public createBoard(name: string) {
        if(fs.existsSync(`./notes/${name}`)) return false
        else { 
            fs.mkdirSync(`./notes/${name}`)
            this.boards.set(name, new NoteManager(`./notes/${name}`))
            return true
        }
    }
    constructor() {
        this.loadBoards()
    }
}

export default new BoardManager()