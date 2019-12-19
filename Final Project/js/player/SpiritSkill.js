function SpiritSkill(){
    this.recoveryAmount = 15;
    this.recoveryIncrement = 5;
    this.attackBoostAmount = 0.05;
    this.attackBoostIncrement = 0.01;
    this.skillFlags = {recovery: false, attackBoost: false};


    this.resetSkills = function(){
        this.recoveryAmount = 15;
        this.attackBoostAmount = 0.05;
        this.skillFlags = {recovery: false, attackBoost: false};
    }
}