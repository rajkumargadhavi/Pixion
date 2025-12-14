// mobile / portrait detection
export class Device {
  static isPortrait(): boolean {
    return window.innerHeight > window.innerWidth;
  }
}

