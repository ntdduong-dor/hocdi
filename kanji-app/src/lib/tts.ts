let jaVoice: SpeechSynthesisVoice | null = null
let voiceLoaded = false

// Prefer high-quality voices similar to Quizlet:
// Google > Microsoft > Apple, prefer female voices
function findJapaneseVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  const jaVoices = voices.filter((v) => /ja[-_]JP/i.test(v.lang))
  if (jaVoices.length === 0) return null

  // Priority: Google female > Google any > "Kyoko" (macOS) > "O-Ren" (macOS) > Microsoft > any
  const priority = [
    (v: SpeechSynthesisVoice) => /google/i.test(v.name) && /female/i.test(v.name),
    (v: SpeechSynthesisVoice) => /google/i.test(v.name),
    (v: SpeechSynthesisVoice) => /kyoko/i.test(v.name),
    (v: SpeechSynthesisVoice) => /o-ren/i.test(v.name),
    (v: SpeechSynthesisVoice) => /haruka/i.test(v.name),
    (v: SpeechSynthesisVoice) => /microsoft.*nanami/i.test(v.name),
    (v: SpeechSynthesisVoice) => /microsoft/i.test(v.name),
  ]

  for (const test of priority) {
    const match = jaVoices.find(test)
    if (match) return match
  }

  return jaVoices[0]
}

export function loadVoice(): Promise<boolean> {
  return new Promise((resolve) => {
    if (voiceLoaded) {
      resolve(jaVoice !== null)
      return
    }

    const found = findJapaneseVoice()
    if (found) {
      jaVoice = found
      voiceLoaded = true
      resolve(true)
      return
    }

    speechSynthesis.onvoiceschanged = () => {
      jaVoice = findJapaneseVoice()
      voiceLoaded = true
      resolve(jaVoice !== null)
    }

    // Timeout fallback
    setTimeout(() => {
      if (!voiceLoaded) {
        jaVoice = findJapaneseVoice()
        voiceLoaded = true
        resolve(jaVoice !== null)
      }
    }, 1000)
  })
}

export function speak(text: string, rate = 0.85): void {
  if (!('speechSynthesis' in window)) return
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'ja-JP'
  utterance.rate = rate
  utterance.pitch = 1.05
  if (jaVoice) utterance.voice = jaVoice
  speechSynthesis.speak(utterance)
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
  }
}

export function isTTSSupported(): boolean {
  return 'speechSynthesis' in window
}
