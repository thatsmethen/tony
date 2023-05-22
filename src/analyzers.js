import * as Tone from 'tone';

class Analyzer {
    constructor(options) {
        this.analyzer = new Tone.Analyser(options);
    }
}

export default Analyzer;
