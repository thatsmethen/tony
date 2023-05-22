import * as Tone from 'tone';
import AudioNode from './audio-node';

class Sample extends AudioNode {
    constructor(options) {
        const sampler = new Tone.Sampler(options).toDestination();
        super(sampler);
        this.sampler = sampler;
    }

    playNote(note, duration) {
        this.sampler.triggerAttackRelease(note, duration);
    }
}

export default Sample;
