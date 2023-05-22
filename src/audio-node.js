class AudioNode {
    constructor(audioNode) {
        this.audioNode = audioNode;
    }

    applyEffect(effect) {
        this.audioNode.connect(effect.effect);
    }

    applyFilter(filter) {
        this.audioNode.connect(filter.filter);
    }

    connect(nextNode) {
        this.audioNode.connect(nextNode.audioNode);
    }

    disconnect(nextNode) {
        this.audioNode.disconnect(nextNode.audioNode);
    }
}

export default AudioNode;
