import * as Tone from 'tone';

export interface TonyNodeConfig {
    identifier?: string;
    type?: string;
    options?: any;
}

export interface InstrumentConfig extends TonyNodeConfig {
    synthType: 'Synth' | 'FMSynth' | 'AMSynth' | 'DuoSynth' | 'MembraneSynth' | 'MetalSynth' | 'PluckSynth' | 'MonoSynth' | 'NoiseSynth';
    options: Tone.SynthOptions | Tone.MonoSynthOptions | Tone.DuoSynthOptions | Tone.FMSynthOptions | Tone.AMSynthOptions | Tone.MembraneSynthOptions | Tone.MetalSynthOptions | Tone.NoiseSynthOptions;
}

export interface SampleConfig extends TonyNodeConfig {
    url: string;
    granular?: boolean;
    loop?: boolean;
    options?: Tone.SamplerOptions
}

export interface RecordingConfig extends TonyNodeConfig {
    format?: 'wav' | 'mp3' | 'ogg';
    bitRate?: number;
    sampleRate?: number;
}

export interface MasteringConfig extends TonyNodeConfig {
    limiterThreshold?: number;
    compressorThreshold?: number;
    compressorRatio?: number;
    compressorAttack?: number;
    compressorRelease?: number;
    equalizerSettings?: {
        low: number;
        mid: number;
        high: number;
    };
    volume?: number;
    pan?: number;
    swing?: number;
}

export interface Note {
    pitch?: string;
    time: number;
    duration?: number;
    velocity?: number;
    nodeId: string;
}

export interface SequenceItem {
    time: number;
    note: Note;
}

export interface TrackConfig extends TonyNodeConfig {
    sequencer?: Tone.Part;
    sequence?: SequenceItem[];
    options?: Tone.ToneAudioNodeOptions
}

export interface ArrangementConfig extends TonyNodeConfig {
    tracks: TrackConfig[];
}

export interface EffectConfig extends TonyNodeConfig {
    identifier: string;
    type: string;
    config: any;
    options?: Tone.FilterOptions | Tone.AutoPannerOptions | Tone.AutoWahOptions | Tone.BitCrusherOptions | Tone.ChebyshevOptions | Tone.ChorusOptions | Tone.DistortionOptions | Tone.FreeverbOptions | Tone.JCReverbOptions | Tone.PhaserOptions | Tone.PingPongDelayOptions | Tone.PitchShiftOptions | Tone.TremoloOptions | Tone.VibratoOptions | Tone.AutoFilterOptions
}
