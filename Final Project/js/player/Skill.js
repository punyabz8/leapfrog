function Skill(){
    this.skillFlags = {critical:false, poision:false, doubleArrow: false, rage: false, bloodLust: false, health: false, waterWalking: false, invinsibility: false};
    this.poisionDamage = 30;
    this.criticalDamage = 0.1;
    this.poisionDamageIncrement = 5;
    this.criticalDamageIncreament = 0.05;
    this.skillActivated = [];

    this.updateSkill = function(){

    }
}