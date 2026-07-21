import { ENV } from "../../config/env";

export type WsEventListener = (data: any) => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Map<string, Set<WsEventListener>> = new Map();
  private isConnecting: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private pingInterval: number | null = null;

  constructor() {
    if (ENV.USE_MOCK_DATA) {
      this.initMockEmitter();
    }
  }

  public connect(url: string = ENV.WS_BASE_URL) {
    if (this.socket || this.isConnecting || ENV.USE_MOCK_DATA) return;

    this.isConnecting = true;
    try {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        this.emit("connection_status", { status: "connected" });
      };

      this.socket.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.event && parsed.payload) {
            this.emit(parsed.event, parsed.payload);
          }
        } catch (e) {
          // Plain message
          this.emit("message", event.data);
        }
      };

      this.socket.onclose = () => {
        this.isConnecting = false;
        this.stopHeartbeat();
        this.emit("connection_status", { status: "disconnected" });
        this.handleReconnect(url);
      };

      this.socket.onerror = () => {
        this.isConnecting = false;
      };
    } catch (e) {
      this.isConnecting = false;
    }
  }

  public subscribe(event: string, callback: WsEventListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  public send(event: string, payload: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ event, payload }));
    }
  }

  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((fn) => fn(data));
    }
  }

  private handleReconnect(url: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.pow(2, this.reconnectAttempts) * 1000;
      setTimeout(() => this.connect(url), delay);
    }
  }

  private startHeartbeat() {
    this.pingInterval = window.setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ event: "ping" }));
      }
    }, 30000);
  }

  private stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  private initMockEmitter() {
    // Periodically emit mock real-time updates for live dashboard activity feeds
    setInterval(() => {
      this.emit("live_activity", {
        id: `act-${Date.now()}`,
        type: "candidate_progress",
        message: "A candidate completed a React Assessment Quiz!",
        timestamp: new Date().toLocaleTimeString(),
      });
    }, 20000);
  }

  public disconnect() {
    this.stopHeartbeat();
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export const webSocketService = new WebSocketService();
