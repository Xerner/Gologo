export default class PlayerScore {
    name: string = ""
    hits: number = 0
    shotsFired: number = 0

    accuracy() {
        if (this.shotsFired === 0) return 0
        return this.hits / this.shotsFired
    }
}
