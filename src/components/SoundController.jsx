import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Short, crisp "Tech Blip" for hover
const hoverSfx = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==";
// Note: Real base64 audio would be longer. I will generate a functional synthesized sound using Web Audio API instead to avoid huge strings.

const SoundController = () => {
    const [enabled, setEnabled] = useState(false);
    const audioContextRef = useRef(null);

    // Initialize Audio Context on first interaction
    useEffect(() => {
        const initAudio = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
                setEnabled(true);
            }
            if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume();
            }
        };

        window.addEventListener('click', initAudio, { once: true });
        return () => window.removeEventListener('click', initAudio);
    }, []);

    const playHoverSound = () => {
        if (!enabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // High-tech, short blip sound synthesis
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.02, ctx.currentTime); // Very subtle volume
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.05);
    };

    const playClickSound = () => {
        if (!enabled || !audioContextRef.current) return;

        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Thud/Click sound
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
    };

    useEffect(() => {
        const handleInteraction = (e) => {
            const target = e.target.closest('button, a, .cursor-pointer');
            if (target) {
                if (e.type === 'mouseenter') playHoverSound();
                if (e.type === 'mousedown') playClickSound();
            }
        };

        window.addEventListener('mouseenter', handleInteraction, true); // Capture phase to catch all
        window.addEventListener('mousedown', handleInteraction, true);

        return () => {
            window.removeEventListener('mouseenter', handleInteraction, true);
            window.removeEventListener('mousedown', handleInteraction, true);
        };
    }, [enabled]);

    return (
        <div className="fixed bottom-8 left-8 z-[100] hidden">
            {/* Hidden controller, sound is automatic */}
        </div>
    );
};

export default SoundController;
