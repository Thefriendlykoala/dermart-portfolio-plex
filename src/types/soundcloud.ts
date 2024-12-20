export interface SoundCloudWidget {
  bind: (event: string, callback: (e?: any) => void) => void;
  unbind: (event: string) => void;
  load: (url: string, options?: any) => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seekTo: (milliseconds: number) => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  getDuration: (callback: (duration: number) => void) => void;
  getCurrentSound: (callback: (sound: any) => void) => void;
  next: () => void;
  prev: () => void;
}

declare global {
  interface Window {
    SC: {
      Widget: (iframe: HTMLIFrameElement | string) => SoundCloudWidget;
    };
  }
}