import * as Tone from 'tone';
import AudioNode from './audio-node';

class Instrument extends AudioNode {
  constructor(options) {
    const synth = new Tone.PolySynth(Tone.Synth, options).toDestination();
    super(synth);
    this.synth = synth;
  }

  playNote(note, duration) {
    this.synth.triggerAttackRelease(note, duration);
  }

  setVolume(volume) {
    this.synth.volume.value = volume;
  }

  getVolume() {
    return this.synth.volume.value;
  }

  setPan(pan) {
    this.synth.pan.value = pan;
  }

  getPan() {
    return this.synth.pan.value;
  }

  mute() {
    this.synth.mute = true;
  }

  unmute() {
    this.synth.mute = false;
  }
}

export default Instrument;
