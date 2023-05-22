import * as Tone from 'tone';

class Filter {
    constructor(options) {
        this.filter = new Tone.Filter(options).toDestination();
    }
}

export default Filter;
