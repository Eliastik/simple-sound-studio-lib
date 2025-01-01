import AbstractAudioNode from "./AbstractAudioNode";


export default abstract class AbstractAudioRenderer extends AbstractAudioNode {

    /** Render an AudioBuffer based on another input AudioBuffer */
    abstract renderAudio(context: BaseAudioContext, buffer: AudioBuffer): Promise<AudioBuffer>;
}
