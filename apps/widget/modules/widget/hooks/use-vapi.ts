import Vapi from "@vapi-ai/web"
import { useEffect, useState } from "react"

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string
}

export const useVapi = () => {
  const [vapi, setVapi] = useState<Vapi | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([])

  useEffect(() => {
    const vapiInstance = new Vapi("3b3df686-a654-41a5-9b25-1c54a609c86a")
    setVapi(vapiInstance)

    vapiInstance.on("call-start", () => {
      setIsConnected(true)
      setIsConnecting(false)
      setTranscript([])
    })

    vapiInstance.on("call-end", () => {
      setIsConnected(false)
      setIsConnecting(false)
      setIsSpeaking(false)
    })

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true)
    })

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false)
    })

    vapiInstance.on("error", (error) => {
      console.log("VAPI ERROR:", error)
      setIsConnecting(false)
    })

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev, 
          { 
            role: message.role === "user" ? "user" : "assistant" , 
            text: message.transcript
          }
        ])
      }
    })

    return () => {
      vapiInstance?.stop()
    }
  }, [])

  const startCall = () => {
    setIsConnecting(true)
    
    if (vapi) {
      vapi.start("e31160b9-8b0b-4494-b316-76b0975ee206")
    }
  }

  const endCall = () => {
    if (vapi) {
      vapi.stop()
    }
  }
  
  return {
    isSpeaking,
    isConnecting,
    isConnected,
    transcript,
    startCall,
    endCall,
  }
}