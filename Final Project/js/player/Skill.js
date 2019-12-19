function Skill(){
    this.skillList = ['criticalMaster','poision','doubleArrow', 'rage', 'bloodLust', 'healthBoost', 'waterWalking', 'invisibility', 'douge', 'heal', 'attackBoost'];
    this.skillFlags = {criticalMaster:false, poision:false, doubleArrow: false, rage: false, bloodLust: false, healthBoost: false, waterWalking: false, invinsibility: false, douge: false};
    this.rageDamage = 0.1;
    this.healAmount = 0.20;
    this.poisionDamage = 30;
    this.criticalDamage = 0.03;
    this.healthBoost = 0.15;
    this.doubleArrowAmount = 1;
    this.bloodLustHealth = 0.02;
    this.poisionDamageIncrement = 5;
    this.invinsibilityCooldown = 1000;
    this.criticalDamageIncreament = 0.01;
    this.invinsibilityCurrentCooldown = 1000;

    this.resetSkills = function(){
        this.skillFlags = {criticalMaster:false, poision:false, doubleArrow: false, rage: false, bloodLust: false, healthBoost: false, waterWalking: false, invinsibility: false, douge: false};
        this.rageDamage = 0.1;
        this.healAmount = 0.20;
        this.poisionDamage = 30;
        this.criticalDamage = 0.03;
        this.healthBoost = 0.15;
        this.doubleArrowAmount = 1;
        this.bloodLustHealth = 0.02;
        this.poisionDamageIncrement = 5;
        this.invinsibilityCooldown = 1000;
        this.criticalDamageIncreament = 0.01;
        this.invinsibilityCurrentCooldown = 1000;
    }
}