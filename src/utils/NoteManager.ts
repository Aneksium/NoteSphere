import fs from 'fs'
import Note from './Note'
import Encryptor from './Encryptor'

export default class NoteManager {
    public readonly path: string
    public notes: Map<string, Note> = new Map()
    public loadNotes() {
        const noteFiles = fs.readdirSync(this.path).sort((x, y) => parseInt(x.split('.')[0]) - parseInt(y.split('.')[0]))
        for(const file of noteFiles)
            this.notes.set(file.split('.')[0], new Note(this.path, file.split('.')[0]))
        return this.notes
    }
    public createNote() {
        const ids = Array.from(this.notes).map(x =>  parseInt(x[0])).sort((x, y) => x - y)
        const nextId = ids[ids.length - 1] + 1 || 1
        const data = `${Encryptor.encrypt('New Note')}:|:0:|:`
        fs.writeFileSync(`${this.path}\\${nextId}.ns`, data, 'utf-8')
        return this.loadNotes()
    }
    public deleteNote(id: string) {
        this.notes.delete(id)
        fs.unlinkSync(`${this.path}\\${id}.ns`)
        return this.loadNotes()
    }
    constructor(path: string) {
        this.path = path
        this.loadNotes()
    }
}