import * as Tone from 'tone';
import { MasteringConfig } from './types';

export class Mastering {
    volume: Tone.Volume;
    pan: Tone.Panner;
    swing: number;

    constructor(config?: MasteringConfig) {
        if (config) {
            this.swing = config.swing;
            this.volume = new Tone.Volume(config.volume);
            this.pan = new Tone.Panner(config.pan);
        } else {
            this.swing = 0;
            this.volume = new Tone.Volume(100);
            this.pan = new Tone.Panner(0);
        }
        Tone.Transport.swing = this.swing;
        this.volume.toDestination();
        this.pan.connect(this.volume);
    }

    setSwing = (swing: number): void => {
        this.swing = swing;
        Tone.Transport.swing = swing;
    }

    setVolume = (volume: number): void => {
        this.volume.volume.value = volume;
    }

    setPan = (pan: number): void => {
        this.pan.pan.value = pan;
    }

    exportConfig = (): MasteringConfig => {
        return {
            type: 'mastering',
            swing: this.swing,
            volume: this.volume.volume.value,
            pan: this.pan.pan.value,
        };
    }
}
