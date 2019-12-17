function Skill(){
    this.attackingFlags = {critical:false, poision:false, doubleArrow: false, rage: false, bloodLust: false, health: false};
    this.poisionDamage = 30;
    this.criticalDamage = 0.1;
    this.poisionDamageIncrement = 3;
    this.criticalDamageIncreament = 0.025;
}