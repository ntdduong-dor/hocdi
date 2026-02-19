import { useState, useEffect, useCallback } from 'react'
import { loadVoice, speak, stopSpeaking, isTTSSupported } from '../lib/tts'

export function useTTS() {
  const [supported, setSupported] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    if (!isTTSSupported()) return
    loadVoice().then(setSupported)
  }, [])

  const speakText = useCallback((text: string) => {
    if (!supported || !text) return
    setSpeaking(true)
    speak(text)
    // Listen for end
    const check = setInterval(() => {
      if (!speechSynthesis.speaking) {
        setSpeaking(false)
        clearInterval(check)
      }
    }, 100)
  }, [supported])

  const stop = useCallback(() => {
    stopSpeaking()
    setSpeaking(false)
  }, [])

  return { supported, speaking, speak: speakText, stop }
}
