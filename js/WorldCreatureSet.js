// @ts-check

import { createCreature } from "./Creature.js";

class WorldCreatureSet {
    constructor (creatureNames, creatureDiv, world) {
        this.creatureList = [];
        this.creatureDiv = creatureDiv;

        for (const creatureName of creatureNames) {
            // TODO: consider whether it's a good idea to have both a list and a map of the same thing
            const creature = createCreature(creatureName, creatureDiv, world);
            this[creatureName] = creature;
            this.creatureList.push(creature);
        }
    }

    tick () {
        for (const creature of this.creatureList) {
            creature.tick();
        }
    }

    draw () {
        for (const creature of this.creatureList) {
            creature.draw();
        }
    }

    forEach (operation) {
        for (const creature of this.creatureList) {
            operation(creature);
        }
    }

    save () {
        let saveComponents = [];
        for (const creature of this.creatureList) {
            saveComponents.push(creature.save());
        }
        return saveComponents;
    }

    clear () {
        for (const creature of this.creatureList) {
            this[creature.name] = undefined;
        }
        this.creatureList = [];
        this.creatureDiv.innerHTML = "";
    }
}

function loadWorldCreatureSet (save, creatureDiv, world) {
    const set = new WorldCreatureSet([], creatureDiv, world);
    for (const creatureSave of save) {
        set.creatureList.push(loadCreature(creatureSave, creatureDiv, world));
    }
}

export { WorldCreatureSet };
