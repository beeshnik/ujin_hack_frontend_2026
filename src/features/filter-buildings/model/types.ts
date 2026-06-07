import type { Complex, House } from "@/shared/api/generated/model";

export type settingsType = {
  houses: House[];
  complexes: Complex[];
  // groups: Group;
};