function Skill(){
    // this.skillList = ['criticalMaster','poision','doubleArrow', 'rage', 'bloodLust', 'healthBoost', 'waterWalking', 'invinsibility', 'douge', 'heal', 'attackBoost', 'criticalBoost', 'poisionBoost'];
    this.skillList = ['criticalMaster','poision','doubleArrow', 'rage', 'bloodLust', 'waterWalking', 'invinsibility', 'douge'];
    this.skillFlags = {criticalMaster:false, poision:false, doubleArrow: false, rage: false, bloodLust: false, waterWalking: false, invinsibility: false, douge: false};
    this.rageDamage = 0.15;
    this.healAmount = 0.20;
    this.healthBoost = 0.20;
    this.poisionDamage = 30;
    this.doubleArrowAmount = 1;
    this.criticalDamage = 0.1;
    this.bloodLustHealth = 0.02;
    this.attackBoostAmount = 10;
    this.poisionDamageIncrement = 5;
    this.invinsibilityCooldown = 1000;
    this.criticalDamageIncreament = 0.03;
    this.invinsibilityCurrentCooldown = 1000;

    this.resetSkills = function(){
        this.rageDamage = 0.1;
        this.healAmount = 0.20;
        this.poisionDamage = 30;
        this.healthBoost = 0.15;
        this.criticalDamage = 0.03;
        this.doubleArrowAmount = 1;
        this.bloodLustHealth = 0.02;
        this.poisionDamageIncrement = 5;
        this.invinsibilityCooldown = 1000;
        this.criticalDamageIncreament = 0.01;
        this.invinsibilityCurrentCooldown = 1000;
        this.skillFlags = {criticalMaster:false, poision:false, doubleArrow: false, rage: false, bloodLust: false, healthBoost: false, waterWalking: false, invinsibility: false, douge: false};
        this.skillList = ['criticalMaster','poision','doubleArrow', 'rage', 'bloodLust', 'healthBoost', 'waterWalking', 'invisibility', 'douge', 'heal', 'attackBoost'];
    }
}