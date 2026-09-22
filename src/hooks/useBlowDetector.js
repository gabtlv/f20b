import { useEffect, useRef } from "react";

const VOLUME_THRESHOLD = 30;
const COOLDOWN_MS = 200;

export function useBlowDetector(onBlow, isActive) {
    const armedRef = useRef(true);

    useEffect(() => {
        if (!isActive) return;

        let audioContext, analyser, dataArray, stream, rafId, cooldownTimeout;

        async function start() {
            stream = await navigator.mediaDevices.getUserMedia({ audio: true});
            audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 512;
            source.connect(analyser);
            dataArray = new Uint8Array(analyser.frequencyBinCount);

            const tick = () => {
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((sum,val) => sum + val, 0) / dataArray.length
                //console.log(average);

                if (average > VOLUME_THRESHOLD && armedRef.current) {
                    armedRef.current = false;
                    onBlow();
                    cooldownTimeout = setTimeout(() => { armedRef.current = true; }, COOLDOWN_MS)
                }

                rafId = requestAnimationFrame(tick);
            };
            tick();
        }

        start();

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(cooldownTimeout);
            if (stream) stream.getTracks().forEach(track => track.stop());
            if (audioContext) audioContext.close();
        };
    }, [isActive, onBlow]);
}