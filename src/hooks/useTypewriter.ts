/** useTypewriter — cycles through an array of strings with character-by-character typing effect */

import { useState, useEffect, useRef } from 'react'

interface UseTypewriterOptions {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
}

export function useTypewriter({
  words,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const wordIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const isDeletingRef = useRef(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const tick = () => {
      const currentWord = words[wordIndexRef.current]
      const isDeleting = isDeletingRef.current

      if (!isDeleting) {
        // Typing forward
        if (charIndexRef.current < currentWord.length) {
          charIndexRef.current++
          setDisplayText(currentWord.slice(0, charIndexRef.current))
          setIsTyping(true)
          timeout = setTimeout(tick, typeSpeed)
        } else {
          // Pause then start deleting
          setIsTyping(false)
          timeout = setTimeout(() => {
            isDeletingRef.current = true
            tick()
          }, pauseDuration)
        }
      } else {
        // Deleting
        if (charIndexRef.current > 0) {
          charIndexRef.current--
          setDisplayText(currentWord.slice(0, charIndexRef.current))
          setIsTyping(true)
          timeout = setTimeout(tick, deleteSpeed)
        } else {
          // Move to next word
          isDeletingRef.current = false
          wordIndexRef.current = (wordIndexRef.current + 1) % words.length
          timeout = setTimeout(tick, 200)
        }
      }
    }

    timeout = setTimeout(tick, typeSpeed)
    return () => clearTimeout(timeout)
  }, [words, typeSpeed, deleteSpeed, pauseDuration])

  return { displayText, isTyping }
}
