import { ToneAudioNode, Filter, EQ3, AutoPanner, AutoWah, BitCrusher, Chebyshev, Chorus, Distortion, FeedbackDelay, Freeverb, JCReverb, Phaser, PingPongDelay, PitchShift, Reverb, Tremolo, Vibrato, AutoFilter } from 'tone';
import { EffectConfig } from "./types";
import { TonyNode } from "./node";

export class Effect extends TonyNode {
    identifier: string;
    effect: ToneAudioNode;

    constructor({ identifier, type, config }: EffectConfig) {
        super({ type: 'effect', ...config })
        this.identifier = identifier;
        this.effect = this.createEffect(type, config);
    }

    getAudioNode = (): ToneAudioNode => {
        return this.effect;
    }

    private createEffect = (type: string, config: any): ToneAudioNode => {
        const MODIFIER_CLASSES = {
            'Filter': Filter,
            'EQ3': EQ3,
            'AutoPanner': AutoPanner,
            'AutoWah': AutoWah,
            'BitCrusher': BitCrusher,
            'Chebyshev': Chebyshev,
            'Chorus': Chorus,
            'Distortion': Distortion,
            'FeedbackDelay': FeedbackDelay,
            'Freeverb': Freeverb,
            'JCReverb': JCReverb,
            'Phaser': Phaser,
            'PingPongDelay': PingPongDelay,
            'PitchShift': PitchShift,
            'Reverb': Reverb,
            'Tremolo': Tremolo,
            'Vibrato': Vibrato,
            'AutoFilter': AutoFilter
        };

        const effectClass = MODIFIER_CLASSES[type];

        if (!effectClass) {
            throw new Error(`Unsupported effect type: ${type}`);
        }

        const effect = new effectClass();
        effect.set(config);

        return effect;
    }
}
