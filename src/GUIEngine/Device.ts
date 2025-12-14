// mobile / portrait detection
export class Device {
  static isPortrait(): boolean {
    return window.innerHeight > window.innerWidth;
  }

  static isMobile(): boolean {
    return window.innerWidth < 1024 && this.isPortrait();
  }
}
