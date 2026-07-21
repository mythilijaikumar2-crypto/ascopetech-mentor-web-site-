import { ENV } from "../../config/env";

export class SseService {
  /**
   * Connect to an SSE stream endpoint or fallback to simulated stream generator
   */
  public static connectStream(
    endpoint: string,
    onMessage: (data: string) => void,
    onError?: (err: any) => void
  ): () => void {
    if (!ENV.USE_MOCK_DATA && typeof EventSource !== "undefined") {
      const eventSource = new EventSource(`${ENV.API_BASE_URL}${endpoint}`);

      eventSource.onmessage = (event) => {
        onMessage(event.data);
      };

      eventSource.onerror = (err) => {
        if (onError) onError(err);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    } else {
      // Mock stream simulator
      let isCancelled = false;
      const chunks = [
        "Analyzing target requirements...",
        "Evaluating candidate profile strengths...",
        "Identifying ATS keyword coverage...",
        "Generating personalized career roadmap milestones...",
        "Analysis complete!"
      ];

      let idx = 0;
      const timer = setInterval(() => {
        if (isCancelled || idx >= chunks.length) {
          clearInterval(timer);
          return;
        }
        onMessage(chunks[idx]);
        idx++;
      }, 800);

      return () => {
        isCancelled = true;
        clearInterval(timer);
      };
    }
  }
}
