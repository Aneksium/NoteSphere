export default class MarkovChain {
    private model: Record<string, string[]> = {}
    train(text: string) {
        if(text.endsWith(" ")) text = text.split("").slice(0, text.length - 2).join("")
        this.model = {}
        const words = text.toLowerCase().split(/[\s\n]+/)
        for(let i = 2; i < words.length; i++) {
            const startingWords = words.slice(i - 2, i).join(' ')
            const nextWord = words[i]

            if(!this.model[startingWords]) this.model[startingWords] = [nextWord]
            else if(!this.model[startingWords].includes(nextWord)) this.model[startingWords].push(nextWord)
        }
    }
    generate(text: string) {
        const wordArr = text.split(/[\s\n]+/)
        if(wordArr[wordArr.length - 1] == '') wordArr.pop()
        const seed = wordArr.slice(wordArr.length - 2, wordArr.length).join(' ')
        if(seed.endsWith(" ")) seed.split("").slice(0, text.length - 2).join("")
        if(!this.model[seed]) return ''
        else {
            if (this.model[seed].length > 1) return '' 
            let recommendation = this.model[seed][0]
            if(['!', '.', '?'].includes(seed[seed.length - 1])) recommendation = recommendation.charAt(0).toUpperCase() + recommendation.slice(1)
            return recommendation
        }
    }
}