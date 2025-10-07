import { PAGE_SCROLL_RESTORATION_KEY } from "@/constants.ts";
import type { EScrollRestorationPages } from "@/types.ts";

class ScrollRestorationAPI {
  private key: string;

  constructor() {
    this.key = PAGE_SCROLL_RESTORATION_KEY;
  }

  getRestorationValues() {
    return sessionStorage.getItem(this.key);
  }

  getRestorationValue(pageKey: EScrollRestorationPages) {
    const currentValues = JSON.parse(this.getRestorationValues() || "{}");
    return currentValues[pageKey];
  }

  setRestorationValue(pageKey: EScrollRestorationPages, value: number) {
    const currentValues = JSON.parse(this.getRestorationValues() || "{}");
    sessionStorage.setItem(this.key, JSON.stringify({ ...currentValues, [pageKey]: value }));
  }
}

const scrollRestorationAPI = new ScrollRestorationAPI();

export default scrollRestorationAPI;