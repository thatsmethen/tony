// useTruTone.js
import { ref } from 'vue';
import * as Tone from 'tone';
import TruTone from './TruTone';

export default function useTruTone() {
    const truTone = ref(new TruTone());
    const synths = ref({});
    const samples = ref({});
    const effects = ref({});
    const filters = ref({});

    const createSynth = (identifier, options) => {
        const instrument = new truTone.value.Instrument(options);
        synths.value[identifier] = instrument;
    };

    const createSample = (identifier, options) => {
        const sample = new truTone.value.Sample(options);
        samples.value[identifier] = sample;
    };

    const createEffect = (identifier, effectType, options) => {
        const effect = new effectType(options);
        effects.value[identifier] = effect;
    };

    const createFilter = (identifier, filterType, options) => {
        const filter = new filterType(options);
        filters.value[identifier] = filter;
    };

    const applyEffect = (instrumentId, effectId) => {
        const instrument = synths.value[instrumentId] || samples.value[instrumentId];
        const effect = effects.value[effectId];
        instrument.applyEffect(effect);
    };

    const applyFilter = (instrumentId, filterId) => {
        const instrument = synths.value[instrumentId] || samples.value[instrumentId];
        const filter = filters.value[filterId];
        instrument.applyFilter(filter);
    };

    return {
        truTone,
        synths,
        samples,
        effects,
        filters,
        createSynth,
        createSample,
        createEffect,
        createFilter,
        applyEffect,
        applyFilter,
    };
}
