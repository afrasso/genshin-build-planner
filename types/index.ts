export interface Artifact {
  type: ArtifactType;
  setKey: string;
  mainStat: string;
  subStats: string[];
  rarity: number;
  level: number;
  iconUrl: string;
}

export interface ArtifactSet {
  id: string;
  name: string;
  rarities: number[];
  iconUrl: string;
}

export enum ArtifactType {
  FLOWER = "Flower",
  PLUME = "Plume",
  SANDS = "Sands",
  GOBLET = "Goblet",
  CIRCLET = "Circlet",
}

export interface Build {
  character: Character;
  weapon: Weapon | undefined;
  artifactSets: ArtifactSet[];
  artifacts: Artifact[];
  desiredStats: DesiredStat[];
  desiredMainStats: Record<ArtifactType, Stat>;
  desiredSubStats: string[];
}

export interface Character {
  id: string;
  name: string;
  element: Element;
  rarity: number;
  weaponType: WeaponType;
  iconUrl: string;
}

export interface DesiredStat {
  stat: Stat | undefined;
  value: number;
}

export enum Element {
  ANEMO = "ELEMENT_ANEMO",
  CRYO = "ELEMENT_CRYO",
  DENDRO = "ELEMENT_DENDRO",
  ELECTRO = "ELEMENT_ELECTRO",
  GEO = "ELEMENT_GEO",
  HYDRO = "ELEMENT_HYDRO",
  NONE = "ELEMENT_NONE",
  PYRO = "ELEMENT_PYRO",
}

export enum Stat {
  ATK_FLAT = "ATK",
  ATK_PERCENT = "ATK Percentage",
  CRIT_DMG = "CRIT DMG",
  CRIT_RATE = "CRIT Rate",
  DEF_FLAT = "DEF",
  DEF_PERCENT = "DEF Percentage",
  DMG_BONUS_ANEMO = "Anemo DMG Bonus",
  DMG_BONUS_CRYO = "Cryo DMG Bonus",
  DMG_BONUS_DENDRO = "Dendro DMG Bonus",
  DMG_BONUS_ELECTRO = "Electro DMG Bonus",
  DMG_BONUS_GEO = "Geo DMG Bonus",
  DMG_BONUS_HYDRO = "Hydro DMG Bonus",
  DMG_BONUS_PHYSICAL = "Physical DMG Bonus",
  DMG_BONUS_PYRO = "Pyro DMG Bonus",
  ELEMENTAL_MASTERY = "Elemental Mastery",
  ENERGY_RECHARGE = "Energy Recharge",
  HEALING_BONUS = "Healing Bonus",
  HP_FLAT = "HP",
  HP_PERCENT = "HP Percentage",
}

export interface Weapon {
  id: string;
  name: string;
  rarity: number;
  type: WeaponType;
  iconUrl: string;
}

export enum WeaponType {
  BOW = "WEAPON_BOW",
  CATALYST = "WEAPON_CATALYST",
  CLAYMORE = "WEAPON_CLAYMORE",
  POLEARM = "WEAPON_POLE",
  SWORD = "WEAPON_SWORD_ONE_HAND",
}
