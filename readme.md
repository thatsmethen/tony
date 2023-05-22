> # Trutone
>
> TruTone is a web-based Digital Audio Workstation (DAW) plugin built using the `tone.js` library. The plugin provides a modular and extensible architecture for creating, editing, and processing audio in a browser-based environment. The TruTone plugin is designed to be used in music production applications and offers a comprehensive set of features, including instruments, sequencers, effects, filters, and analyzers.
>
> ## Overview
>
> The TruTone plugin consists of the following modules:
>
> 1. TruTone: The main class that manages the overall state and configuration of the plugin. It is responsible for initializing instruments, sequencers, and other components based on a user-provided configuration.
>
> 2. Instrument: A base class for creating polyphonic synthesizer instruments using the `tone.js` library. It provides methods for playing notes with varying durations and controlling instrument parameters such as volume and pan.
>
> 3. Sample: A subclass of TruToneInstrument that allows for loading and playing back audio samples.
>
> 4. Sequencer: A class that manages the playback of note sequences in different time signatures. It provides methods for scheduling events, pausing, restarting, stopping, and navigating to a specific time in the sequence.
>
> 5. Effects: A class for creating and managing audio effects using the `tone.js` library. It provides methods for enabling/disabling (bypassing) the effect and controlling its parameters.
>
> 6. Filters: A class for creating and managing audio filters using the `tone.js` library. It provides methods for enabling/disabling (bypassing) the filter and controlling its parameters.
>
> 7. Analyzers: A class for creating and managing audio analyzers using the `tone.js` library. It provides methods for enabling/disabling (bypassing) the analyzer and accessing its analysis data.
>
> ## Features
>
> The TruTone plugin offers the following features:
>
> 1. Configurable instruments: Users can create and configure polyphonic synthesizers and sample-based instruments using the Instrument and Sample classes.
>
> 2. Configurable sequencers: Users can create and configure sequencers with different time signatures using the Sequencer class. The sequencers can control the playback of notes in the instruments.
>
> 3. Tempo control: The TruTone class provides methods for setting and getting the global tempo (BPM) of the transport, which affects the playback speed of all sequences.
>
> 4. Audio effects and filters: Users can create and configure audio effects and filters using the Effects and Filters classes. These components can be applied to individual instruments or the master output.
>
> 5. Audio analyzers: Users can create and configure audio analyzers using the Analyzers class. These components can be used to visualize and analyze audio data in real-time.
>
> 6. Parameter control: The TruTone plugin provides methods for controlling various parameters of the instruments, effects, filters, and analyzers, such as volume, pan, and bypass status.
>
> ## Usage
>
> To use the TruTone plugin, users must first create an instance of the TruTone class and provide a configuration object that defines the instruments, sequencers, and other components. The plugin then initializes the components and manages their state during the application's lifetime.
>
> Users can interact with the TruTone plugin through its API, which provides methods for controlling the playback of sequences, adjusting instrument parameters, applying effects and filters, and accessing analyzer data.
>
> The TruTone plugin is designed to be easily integrated into web-based DAW applications and can be used alongside other audio processing libraries and tools.
> 
> [it's a yakka]
