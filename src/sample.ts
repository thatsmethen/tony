import * as Tone from 'tone';
import { SampleConfig } from './types';
import { TonyNode } from './node';

export class Sample extends TonyNode {
    private sample: Tone.Player | Tone.GrainPlayer;
    private loop: boolean;

    constructor(config: SampleConfig) {
        super({ type: 'sample', ...config })
        this.sample = this.createSample(config);
        this.loop = config.loop || false;
        this.sample.toDestination();
    }

    createSample = (config: SampleConfig): Tone.Player | Tone.GrainPlayer => {
        let sample;
        if (config.granular) {
            sample = new Tone.GrainPlayer(config.url);
        } else {
            sample = new Tone.Player(config.url);
        }
        sample.loop = this.loop;
        return sample;
    }

    play = ({ time }: { time: number }): void => {
        this.sample.start(time);
    }

    stop = ({ time }: { time: number }): void => {
        this.sample.stop(time);
    }

    setLoop = (loop: boolean): void => {
        this.loop = loop;
        this.sample.loop = loop;
    }

    getLoop = (): boolean => {
        return this.loop;
    }
}
