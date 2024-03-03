import fs from 'fs'
import Encryptor from './Encryptor';

export default class Note {
    public readonly parentPath: string
    public readonly id: string
    
    public title = ''
    public content = ''
    public color: 'yellow' | 'aqua' | 'pink' | 'green' = 'yellow'

    public load() {
        const fileData = fs.readFileSync(`${this.parentPath}/${this.id}.ns`, 'utf-8')
        const noteData = fileData.split(':|:')

        this.title = Encryptor.decrypt(noteData[0])
        this.color = ['yellow', 'aqua', 'pink', 'green'][parseInt(noteData[1])] as 'yellow' | 'aqua' | 'pink' | 'green'
        this.content = Encryptor.decrypt(noteData[2])
    }
    public save() {
        const title64 = Encryptor.encrypt(this.title)
        const cont64 = Encryptor.encrypt(this.content)
        const colorIndex = ['yellow', 'aqua', 'pink', 'green'].indexOf(this.color)

        const data = `${title64}:|:${colorIndex}:|:${cont64}`
        fs.writeFileSync(`${this.parentPath}/${this.id}.ns`, data, 'utf-8')
    }
    constructor(parentPath: string, id: string) {
        this.parentPath = parentPath
        this.id = id
        this.load()
    }
}