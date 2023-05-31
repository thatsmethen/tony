import * as Tone from "tone";
import Tony from "./index";
import { InstrumentConfig, EffectConfig, SampleConfig, TonyNodeConfig, TrackConfig } from "./types";

export abstract class TonyNode {
    private audioNode: Tone.ToneAudioNode;
    private settings: Tone.ToneAudioNodeOptions;

    private connectedEffects: Set<any> = new Set();
    private tony: Tony;
    identifier: string;
    type: string;

    protected constructor({ options, type, identifier }: TonyNodeConfig) {
        if (!options || options.length === 0) {
            console.error('Error: Cannot initialise class without a valid options object.')
            return;
        }
        this.settings = options;
        this.type = type;
        this.identifier = identifier
    }

    protected setAudioNode = (node: Tone.ToneAudioNode): void => {
        this.audioNode = node;
    }

    update = async(config: InstrumentConfig | SampleConfig | EffectConfig | TrackConfig): Promise<boolean> => {
        try {
            this.settings = config.options;
            this.audioNode.set(config.options)
            return true
        } catch (err) {
            console.error(err)
        }
    }

    getAudioNode = (): Tone.ToneAudioNode => {
        return this.audioNode;
    }

    getConfig = (): any => {
        return { identifier: this.identifier, type: this.type, options: this.settings };
    }

    connect = (destination: TonyNode): void => {
        this.audioNode.connect(destination.getAudioNode() as Tone.InputNode);
        if (destination.type === 'effect') {
            this.connectedEffects.add(destination);
        }
        this.tony.updateConnection(this, destination);
    }

    disconnect = (destination: TonyNode): void => {
        this.audioNode.disconnect(destination.getAudioNode() as Tone.InputNode);
        if (destination.type === 'effect') {
            this.connectedEffects.delete(destination);
        }
        this.tony.removeConnection(this, destination);
    }

    getConnectedEffects = (): Set<any> => {
        return this.connectedEffects;
    }

    dispose = (): void => {
        this.audioNode.dispose();
        if (this.type === 'effect') {
            this.tony.effects.delete(this.identifier)
        } else {
            this.tony.audioNodes.delete(this.identifier)
        }
    }

    // Default play method
    play = (options): void => {
        console.warn('This class does not have a play() method implemented.')
    }

    // Default stop method
    stop = (options): void => {
        console.warn('This class does not have a stop() method implemented.')
    }

    getSnapshot = (): any => {
        return { identifier: this.identifier, type: this.type, options: this.audioNode.get() };
    }
}
