function Skill(){
    this.rageDamage = 0.15;
    this.healAmount = 0.20;
    this.healthBoost = 0.20;
    this.poisonDamage = 30;
    this.criticalDamage = 0.1;
    this.doubleArrowAmount = 1;
    this.bloodLustHealth = 0.05;
    this.attackBoostAmount = 10;
    this.attackSpeedBoostAmount = 1;
    this.poisonDamageIncrement = 5;
    this.attackSpeedBoostIncrement = 1;
    this.criticalDamageIncreament = 0.03;
    this.skillFlags = {criticalMaster:false, poison:false, doubleArrow: false, rage: false, bloodLust: false, waterWalking: false, douge: false, speedBoost: false};
    this.skillList = ['criticalMaster','poison','doubleArrow', 'rage', 'bloodLust', 'healthBoost', 'waterWalking', 'douge', 'heal', 'attackBoost', 'criticalBoost', 'poisonBoost', 'attackSpeedBoost'];

    this.resetSkills = function(){
        this.rageDamage = 0.15;
        this.healAmount = 0.20;
        this.healthBoost = 0.20;
        this.poisonDamage = 30;
        this.criticalDamage = 0.1;
        this.doubleArrowAmount = 1;
        this.bloodLustHealth = 0.05;
        this.attackBoostAmount = 10;
        this.poisonDamageIncrement = 5;
        this.invinsibilityCooldown = 1000;
        this.criticalDamageIncreament = 0.03;
        this.skillFlags = {criticalMaster:false, poison:false, doubleArrow: false, rage: false, bloodLust: false, healthBoost: false, waterWalking: false, invinsibility: false, douge: false};
    }
}