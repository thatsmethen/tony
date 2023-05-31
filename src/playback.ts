import * as Tone from 'tone';
import { Track } from './track';
import {MasteringConfig} from "./types";

export class Playback {
    private tracks: Map<string, Track>;

    constructor(tracks: Map<string, Track>) {
        this.tracks = tracks;
    }

    start = (time?: number): void => {
        Tone.Transport.start();
        this.tracks.forEach((track) => {
            track.start(time);
        });
    }

    stop = (): void => {
        Tone.Transport.stop();
        this.tracks.forEach((track) => {
            track.stop();
        });
    }

    setBpm = (bpm: number): void => {
        Tone.Transport.bpm.value = bpm;
    }

    getBpm = (): number => {
        return Tone.Transport.bpm.value;
    }

    setTimeSignature = (numerator: number, denominator: number): [number, number] => {
        Tone.Transport.timeSignature = [numerator, denominator];
        return Tone.Transport.timeSignature as [number, number];
    }

    getTimeSignature = (): [number, number] => {
        return Tone.Transport.timeSignature as [number, number];
    }
}
