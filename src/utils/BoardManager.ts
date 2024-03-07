import fs from 'fs'
import NoteManager from "./NoteManager"
import { remote } from 'electron'

export class BoardManager {
    public boards: Map<string, NoteManager> = new Map()
    public readonly basePath: string

    public loadBoards() {
        if(!fs.existsSync(this.basePath)) return fs.mkdirSync(this.basePath)
        const boardDirs = fs.readdirSync(this.basePath)
        for(const dir of boardDirs) 
            this.boards.set(dir, new NoteManager(`${this.basePath}\\${dir}`))
    }
    public createBoard(name: string) {
        if(fs.existsSync(`${this.basePath}\\${name}`)) return false
        else { 
            fs.mkdirSync(`${this.basePath}\\${name}`)
            this.boards.set(name, new NoteManager(`${this.basePath}\\${name}`))
            return true
        }
    }
    constructor() {
        this.basePath = remote.app.getPath('userData') + '\\notes'
        this.loadBoards()
        console.log(this.basePath)
    }
}

export default new BoardManager()