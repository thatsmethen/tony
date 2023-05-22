import * as Tone from 'tone';

class Sequencer {
    constructor(sequence, instruments, timeSignature = '16n') {
        this.sequence = new Tone.Sequence(
            (time, note) => {
                const { instrumentId, noteValue, duration } = note;
                if (instruments[instrumentId]) {
                    instruments[instrumentId].playNote(noteValue, duration);
                }
            },
            sequence,
            timeSignature
        );
    }

    scheduleEvents() {
        this.sequence.start(0);
        Tone.Transport.start();
    }

    pause() {
        Tone.Transport.pause();
    }

    restart() {
        Tone.Transport.start();
    }

    stop() {
        Tone.Transport.stop();
    }

    navigateToTime(time) {
        Tone.Transport.seconds = time;
    }

    setTimeSignature(timeSignature) {
        this.sequence.subdivision = timeSignature;
    }
}

export default Sequencer;
