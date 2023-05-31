import { InstrumentConfig, SampleConfig, EffectConfig, TrackConfig, RecordingConfig, MasteringConfig, ArrangementConfig } from "./types";
import { Instrument } from "./instrument";
import { Sample } from "./sample";
import { Effect } from "./effect";
import { Track } from "./track";
import { TonyNode } from './node'
import {Mastering} from "./mastering";
import {Playback} from "./playback";

export default class Tony {
    audioNodes: Map<string, TonyNode> = new Map();
    arrangement: Map<string, Track> = new Map();
    effects: Map<string, Set<string>> = new Map();
    connections: Map<string, Set<string>> = new Map();
    master: Mastering = new Mastering();
    playback: Playback = new Playback(this.arrangement);
    constructor(config: Array<InstrumentConfig | SampleConfig | EffectConfig | RecordingConfig | TrackConfig>) {
        config.forEach((item) => {
            this.createNode(item);
        })
    }

    createNode(config: InstrumentConfig | SampleConfig | EffectConfig | TrackConfig | RecordingConfig): void {
        switch (config.type) {
            case "instrument":
                this.createInstrument(config.identifier, config as InstrumentConfig);
                break;
            case "sample":
                this.createSample(config.identifier, config as SampleConfig);
                break;
            case "effect":
                this.createEffect(config.identifier, config as EffectConfig);
                break;
            case "track":
                this.createTrack(config.identifier, config as TrackConfig);
                break;
        }
    }

    getMaster(): Mastering {
        return this.master;
    }

    getPlayback(): Playback {
        return this.playback;
    }

    createInstrument = (identifier: string, config: InstrumentConfig): InstrumentConfig => {
        const instrument = new Instrument(config);
        this.audioNodes.set(identifier, instrument);
        return instrument.getConfig();
    }

    updateInstrument = async(identifier: string, config: InstrumentConfig): Promise<InstrumentConfig> => {
        const instrument = this.audioNodes.get(identifier) as TonyNode
        await instrument.update(config)
        return instrument.getConfig();
    }

    deleteInstrument = async(identifier: string): Promise<any> => {
        this.audioNodes.get(identifier).dispose()
    }

    createSample = (identifier: string, config: SampleConfig): SampleConfig => {
        const sample = new Sample(config);
        this.audioNodes.set(identifier, sample);
        return sample.getConfig();
    }

    updateSample = async(identifier: string, config: SampleConfig): Promise<SampleConfig> => {
        const sample = this.audioNodes.get(identifier) as TonyNode
        await sample.update(config)
        return sample.getConfig();
    }

    deleteSample = async(identifier: string): Promise<any> => {
        await this.deleteNode(identifier)
    }

    createEffect = (identifier: string, config: EffectConfig): EffectConfig => {
        const effect = new Effect(config);
        this.audioNodes.set(identifier, effect);
        return effect.getConfig();
    }

    updateEffect = async(identifier: string, config: EffectConfig): Promise<EffectConfig> => {
        const effect = this.audioNodes.get(identifier) as TonyNode
        await effect.update(config)
        return effect.getConfig();
    }

    deleteEffect = async(identifier: string): Promise<any> => {
        await this.deleteNode(identifier)
    }

    createTrack = (identifier: string, config: TrackConfig): TrackConfig => {
        const track = new Track(config);
        this.arrangement.set(identifier, track);
        return track.getConfig();
    }

    updateTrack = async(identifier: string, config: TrackConfig): Promise<TrackConfig> => {
        const track = this.arrangement.get(identifier) as TonyNode
        await track.update(config)
        return track.getConfig();
    }

    deleteTrack = async(identifier: string): Promise<any> => {
        await this.deleteNode(identifier)
    }

    getNode = (identifier: string): TonyNode | undefined => {
        return this.audioNodes.get(identifier);
    }

    getTrack = (identifier: string): Track | undefined => {
        return this.arrangement.get(identifier);
    }

    getEffect = (identifier: string): Effect => {
        return this.audioNodes.get(identifier) as Effect
    }

    getSample = (identifier: string): Sample => {
        return this.audioNodes.get(identifier) as Sample
    }

    getInstrument = (identifier: string): Instrument => {
        return this.audioNodes.get(identifier) as Instrument
    }

    getAllEffects = (): EffectConfig[] => {
        return Array.from(this.audioNodes).filter(([_, node]) => node.type === 'effect').map(([_, node]) => node.getConfig())
    }

    getAllSamples = (): SampleConfig[] => {
        return Array.from(this.audioNodes).filter(([_, node]) => node.type === 'sample').map(([_, node]) => node.getConfig())
    }

    getAllInstruments = (): InstrumentConfig[] => {
        return Array.from(this.audioNodes).filter(([_, node]) => node.type === 'instrument').map(([_, node]) => node.getConfig())
    }

    getAllTracks = (identifier: string): Map<string, Track> | undefined => {
        return this.arrangement;
    }

    deleteNode = async(identifier: string): Promise<any> => {
        const node = this.audioNodes.get(identifier)
        await node.dispose()
        return;
    }

    resetArrangement = (identifier: string): boolean => {
        this.arrangement = new Map();
        return true
    }

    updateConnection = (source: TonyNode, destination: TonyNode | Effect): void => {
        const sourceIdentifier = this.getIdentifierByNode(source);
        const destinationIdentifier = this.getIdentifierByNode(destination);

        if (sourceIdentifier && destinationIdentifier) {
            const connectionMap = destination instanceof Effect ? this.effects : this.connections;

            if (!connectionMap.has(sourceIdentifier)) {
                connectionMap.set(sourceIdentifier, new Set());
            }
            connectionMap.get(sourceIdentifier)?.add(destinationIdentifier);
        }
    }

    removeConnection = (source: TonyNode, destination: TonyNode | Effect): void => {
        const sourceIdentifier = this.getIdentifierByNode(source);
        const destinationIdentifier = this.getIdentifierByNode(destination);

        if (sourceIdentifier && destinationIdentifier) {
            const connectionMap = destination instanceof Effect ? this.effects : this.connections;
            connectionMap.get(sourceIdentifier)?.delete(destinationIdentifier);
        }
    }
    getIdentifierByNode = (node: TonyNode | Effect): string | undefined => {
        // @ts-ignore
        for (const [identifier, audioNode] of this.audioNodes.entries()) {
            if (audioNode === node) {
                return identifier;
            }
        }
        return undefined;
    }
}

export { InstrumentConfig, SampleConfig, EffectConfig, TrackConfig, RecordingConfig, ArrangementConfig, MasteringConfig }
