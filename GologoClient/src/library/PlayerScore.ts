export default class PlayerScore {
  name!: string;
  enemiesKilled!: number;
  shotsFired!: number;

  constructor(name: string = "", hits: number = 0, shotsFired: number = 0) {
    this.name = name
    this.enemiesKilled = hits
    this.shotsFired = shotsFired
  }

  accuracy() {
    if (this.shotsFired === 0) return 0
    return this.enemiesKilled / this.shotsFired
  }
}
