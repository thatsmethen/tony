import * as Tone from 'tone';
import { TrackConfig, Note, SequenceItem } from './types';
import { TonyNode } from './node';
import { Playback } from './playback';

export class Track extends TonyNode {
    identifier: string;
    private readonly sequencer: Tone.Part;
    private nodes: Map<string, TonyNode>;

    constructor(config: TrackConfig, nodes?: Map<string, TonyNode>, playback?: Playback) {
        super(config)
        this.identifier = config.identifier;
        this.nodes = nodes;
        const sequence = config.sequence.map((seqItem: SequenceItem) => {
            const note: Note = seqItem.note;
            return { ...seqItem, note: { ...note, nodeId: note.nodeId } };
        });
        this.sequencer = new Tone.Part((time, { note }) => this.playNode({ time, note }), sequence);
        this.sequencer.playbackRate = playback.getTimeSignature()[0] / 4;
    }

    private playNode = ({ time, note }: { time: number, note: Note }) => {
        const node = this.nodes.get(note.nodeId);
        if (node) {
            node.play({ time, note });
        }
    }

    getId = (): string => {
        return this.identifier;
    }

    addNote = (note: Note): void => {
        this.sequencer.add(note.time, note);
    }

    removeNote = (time: number): void => {
        this.sequencer.remove(time);
    }

    start = (time?: number): void => {
        this.sequencer.start(undefined, time);
    }

    stop = (): void => {
        this.sequencer.stop();
    }

    exportConfig = (): TrackConfig => {
        return {
            identifier: this.identifier,
            type: 'track',
            sequencer: this.sequencer,
        };
    }
}
