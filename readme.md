# Tony: a `tone.js` interface which don't suck so bad

Tony is a comprehensive audio framework built on top of `tone.js` that provides a powerful and easy-to-use interface for creating and managing audio components. It manages instances of various audio components, like instruments, samples, recordings, and mastering, allowing users to apply audio effects, update configurations, and more.

## Features

- Manage instances of audio components with identifiers
- Create and configure instruments, samples, and effects using Tone.js classes
- Connect and disconnect components to create complex and intricate audio chains
- Keep track of connections and configuration for easy updates and navigation
- Utilize atomic design and human interaction principles

## Installation

Install Tony via npm:

```bash
npm install --save @thatsmethen/tony
```
OR
```bash
yarn add @thatsmethen/tony
```

## Quick Start

First, create an instance of Tony:

```javascript
import { Tony } from "@thatsmethen/tony";

const tony = new Tony();
```

You can then use Tony to create an instrument and play a note:

```javascript
// Create an instrument
tony.createInstrument("myGuitar", { synthType: "PluckSynth" }); 

// Play a note (every 'instrument' is polyphonic, so it expects an array
tony.play("myGuitar", { time: 1, note: ["C4", "G4", "E4"], duration: "4n" });
```

## Classes

### Tony

`Tony` is the main class for managing instances of audio components across the entire package with identifiers. It provides access to create, update or delete audio components such as instruments, samples, recordings, and mastering.

### Instrument

An `Instrument` represents an audio instrument, such as an FMSynth instrument or a Piano. The `Instrument` class provides methods for playing and stopping notes, and creating instruments with configuration.

### Sample

`Sample` represents an audio sample that can be created from a URL. It provides methods for playing, stopping, and managing loops.

### Effect

An `Effect` is an audio effect that can be applied to instruments or samples. Available effect types include Filter, EQ3, AutoPanner, AutoWah, BitCrusher, Chebyshev, Chorus, Distortion, FeedbackDelay, Freeverb, JCReverb, Phaser, PingPongDelay, PitchShift, Reverb, Tremolo, Vibrato, and AutoFilter.

## Advanced Use Case: Creating an FMSynth Instrument with Configuration

To create an instrument with configuration from `tone.js`, use the `FMSynth` type and configure it accordingly. Here's an example:

```javascript
// Create an FMSynth instrument with configuration
const synthIdentifier = "synth";
const synthConfig = {
  synthType: "FMSynth",
  options: {
    harmonicity: 3,
    modulationIndex: 10,
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.01, sustain: 1, release: 0.5 },
    modulation: { type: "sine" },
    modulationEnvelope: { attack: 0.5, decay: 0, sustain: 1, release: 0.5 }
  }
};
tony.createInstrument(synthIdentifier, synthConfig);
```

## Connecting Nodes and Chaining Effects

`TonyNode` contains methods to connect and disconnect nodes, allowing users to create complex and unique audio chains.

Here's an example of connecting an instrument node to a reverb effect node:

```javascript
const sourceNode = tony.getNode(synthIdentifier);
const effectNode = tony.getNode(reverbIdentifier);

if (sourceNode && effectNode) {
  sourceNode.connect(effectNode);
}
```

## License

This software is a proprietary product of **Yakka**. Unauthorized distribution, copying, or use is strictly prohibited without the prior consent of **Yakka**. All rights reserved 2023.

For more information about using this software within the organization, please contact the legal department or refer to your organization's internal guidelines on software usage and licensing.
