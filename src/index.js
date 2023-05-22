import * as Tone from 'tone';
import Instrument from './instrument';
import Sample from './sample';
import Sequencer from './sequencer';
import Effect from './effects';
import Filter from './filters';
import Analyzer from './analyzers';
import useTruTone from './vue/useTruTone'

class TruTone {
    constructor() {
        this.synths = {};
        this.samples = {};
        this.sequencers = {};
        this.analyzers = {};
        this.effects = {};
        this.filters = {};
    }

    loadComposition(config) {
        this.settings = config;

        this.initializeInstruments();
        this.initializeSequencers();
    }

    saveComposition() {
        const composition = {
            tracks: this.settings.tracks,
            instruments: this.settings.instruments,
        };

        return composition;
    }

    initializeInstruments() {
        this.settings.instruments.forEach((instrumentConfig) => {
            if (instrumentConfig.type === 'synth') {
                this.createSynth(instrumentConfig.id, instrumentConfig.options);
            } else if (instrumentConfig.type === 'preconfiguredSynth') {
                this.createSample(instrumentConfig.id, instrumentConfig.options);
            }
        });
    }

    initializeSequencers() {
        this.settings.tracks.forEach((trackConfig) => {
            this.createSequencer(trackConfig.id, trackConfig.sequence);
        });
    }

    createSynth(identifier, synthOptions) {
        this.synths[identifier] = new Instrument(synthOptions);
    }

    createSample(identifier, sampleOptions) {
        this.samples[identifier] = new Sample(sampleOptions);
    }

    createSequencer(identifier, sequence) {
        this.sequencers[identifier] = new Sequencer(sequence);
    }

    applyEffect(identifier, effectOptions) {
        const effect = new Effect(effectOptions);
        this.effects[identifier] = effect;
        // Logic to apply the effect to the specified instrument(s) or master output
    }

    applyFilter(identifier, filterOptions) {
        const filter = new Filter(filterOptions);
        this.filters[identifier] = filter;
        // Logic to apply the filter to the specified instrument(s) or master output
    }

    createAnalyser(identifier, analyserOptions) {
        this.analyzers[identifier] = new Analyzer(analyserOptions);
    }

    setTempo(bpm) {
        Tone.Transport.bpm.value = bpm;
    }

    getTempo() {
        return Tone.Transport.bpm.value;
    }
}

export { TruTone, useTruTone };
