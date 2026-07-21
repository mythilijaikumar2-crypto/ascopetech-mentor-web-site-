import { useState, useCallback, useRef } from "react";
import { aiService } from "../services/api/aiService";

export function useAiMentor() {
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<boolean>(false);

  const streamResponse = useCallback(async (query: string, onToken: (token: string) => void) => {
    setIsStreaming(true);
    setError(null);
    abortControllerRef.current = false;

    try {
      await aiService.streamChatResponse(query, (token) => {
        if (!abortControllerRef.current) {
          onToken(token);
        }
      });
    } catch (err: any) {
      setError(err?.message || "AI service streaming interrupted.");
    } finally {
      setIsStreaming(false);
    }
  }, []);

  const stopStream = useCallback(() => {
    abortControllerRef.current = true;
    setIsStreaming(false);
  }, []);

  return {
    isStreaming,
    error,
    streamResponse,
    stopStream
  };
}
