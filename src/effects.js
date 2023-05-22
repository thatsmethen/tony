import * as Tone from 'tone';

class Effect {
    constructor(options) {
        this.effect = new Tone.Effect(options).toDestination();
    }
}

export default Effect;
