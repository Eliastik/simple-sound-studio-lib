/**
 * @jest-environment jsdom
 */
import { describe, expect, test } from "@jest/globals";
import "reflect-metadata";
import { MockAudioContext } from "./AudioContextMock";
import SoundStudioFactory from "../lib/utils/SoundStudioFactory";

(AudioContext as any) = MockAudioContext;

describe("SoundStudioFactory", () => {
    test("should work properly", () => {
        const audioEditor = SoundStudioFactory.createAudioEditor();
        const audioEditor2 = SoundStudioFactory.createAudioEditor();

        const instance = SoundStudioFactory.createNewInstance();
        const instance2 = SoundStudioFactory.createNewInstance();

        // Should be a Singleton
        expect(audioEditor).toEqual(audioEditor2);

        // Souldn't be a Singleton
        expect(instance.audioEditor).not.toEqual(audioEditor);
        expect(instance.audioEditor).not.toEqual(audioEditor2);
        expect(instance.audioEditor).not.toEqual(instance2.audioEditor);
    });
});
