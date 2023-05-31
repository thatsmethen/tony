import * as Tone from 'tone';
import { InstrumentConfig } from './types';
import { TonyNode } from './node';

export class Instrument extends TonyNode {
    private instrument: Tone.PolySynth<any>;
    private pressedKeys: string[] = [];
    numKeys: number = 25

    constructor(config: InstrumentConfig) {
        super({ type: 'instrument', ...config })
        this.instrument = this.createInstrument(config);
        this.instrument.toDestination();
    }

    public createInstrument = (config: InstrumentConfig): Tone.PolySynth<any> => {
        const instrument = new Tone.PolySynth(Tone[config.synthType as string], config.options).toDestination();
        instrument.set(config.options);
        return instrument;
    }

    public play = ({ time, notes, duration }: { time: number, notes: string[], duration: string }): void => {
        if (duration) {
            if (time) {
                this.instrument.triggerAttackRelease(notes, duration, time);
            } else {
                this.instrument.triggerAttackRelease(notes, time);
            }
        } else {
            this.instrument.triggerAttack(notes);
        }
        this.updatePressedKeys(notes);
    }

    private updatePressedKeys = (newKeys: string[]): void => {
        const previousKeys = [...this.pressedKeys];
        newKeys.forEach(newKey => {
            if (!this.pressedKeys.includes(newKey)) {
                this.pressedKeys.push(newKey);
            }
        });
        previousKeys.forEach((key) => {
            if (!newKeys.includes(key)) {
                this.instrument.triggerRelease(key);
            }
        });
    }

    setConfig = (options: Record<string, string>) => {
        this.instrument.set(options)
        return this.getConfig();
    }

    getConfig = (): any => {
        return { identifier: this.identifier, type: this.type, options: this.instrument.get(), keys: this.numKeys };
    }

    setKeySize = (number: number): void => {
        this.numKeys = number;
    }

    getKeySize = (): number => {
        return this.numKeys;
    }

    public stop = (notes?: string[]): void => {
        if (!notes) {
            this.instrument.releaseAll()
        } else {
            this.instrument.triggerRelease(notes)
        }
    }
}
