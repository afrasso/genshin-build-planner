export interface Artifact {
  iconUrl: string;
  level: number;
  mainStat: Stat;
  rarity: number;
  set: ArtifactSet;
  subStats: StatValue<Stat>[];
  type: ArtifactType;
}

export enum ArtifactSetBonusType {
  FOUR_PIECE = "FOUR_PIECE",
  TWO_PIECE = "TWO_PIECE",
}

export interface ArtifactSetBonus {
  artifactSet: ArtifactSet;
  bonusType: ArtifactSetBonusType;
}

export interface ArtifactSet {
  hasArtifactTypes: Record<ArtifactType, boolean>;
  iconUrl: string;
  iconUrls: Record<ArtifactType, string>;
  id: string;
  name: string;
  rarities: number[];
}

export enum ArtifactType {
  CIRCLET = "CIRCLET",
  FLOWER = "FLOWER",
  GOBLET = "GOBLET",
  PLUME = "PLUME",
  SANDS = "SANDS",
}

export interface Build {
  artifacts: BuildArtifacts;
  character: Character;
  desiredArtifactMainStats: DesiredArtifactMainStats;
  desiredArtifactSetBonuses: ArtifactSetBonus[];
  desiredStats: StatValue<OverallStat>[];
  weapon: undefined | Weapon;
}

export type BuildArtifacts = Partial<Record<ArtifactType, Artifact>>;

export interface Character {
  element: Element;
  iconUrl: string;
  id: string;
  name: string;
  rarity: number;
  weaponType: WeaponType;
}

export type DesiredArtifactMainStats = Partial<Record<ArtifactType, Stat>>;

export enum OverallStat {
  ATK = "ATK",
  CRIT_DMG = "CRIT_DMG",
  CRIT_RATE = "CRIT_RATE",
  DEF = "DEF",
  DMG_BONUS_ANEMO = "DMG_BONUS_ANEMO",
  DMG_BONUS_CRYO = "DMG_BONUS_CRYO",
  DMG_BONUS_DENDRO = "DMG_BONUS_DENDRO",
  DMG_BONUS_ELECTRO = "DMG_BONUS_ELECTRO",
  DMG_BONUS_GEO = "DMG_BONUS_GEO",
  DMG_BONUS_HYDRO = "DMG_BONUS_HYDRO",
  DMG_BONUS_PHYSICAL = "DMG_BONUS_PHYSICAL",
  DMG_BONUS_PYRO = "DMG_BONUS_PYRO",
  ELEMENTAL_MASTERY = "ELEMENTAL_MASTERY",
  ENERGY_RECHARGE = "ENERGY_RECHARGE",
  HEALING_BONUS = "HEALING_BONUS",
  MAX_HP = "MAX_HP",
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
  ATK_PERCENT = "ATK_PERCENT",
  CRIT_DMG = "CRIT_DMG",
  CRIT_RATE = "CRIT_RATE",
  DEF_FLAT = "DEF_FLAT",
  DEF_PERCENT = "DEF_PERCENT",
  DMG_BONUS_ANEMO = "DMG_BONUS_ANEMO",
  DMG_BONUS_CRYO = "DMG_BONUS_CRYO",
  DMG_BONUS_DENDRO = "DMG_BONUS_DENDRO",
  DMG_BONUS_ELECTRO = "DMG_BONUS_ELECTRO",
  DMG_BONUS_GEO = "DMG_BONUS_GEO",
  DMG_BONUS_HYDRO = "DMG_BONUS_HYDRO",
  DMG_BONUS_PHYSICAL = "DMG_BONUS_PHYSICAL",
  DMG_BONUS_PYRO = "DMG_BONUS_PYRO",
  ELEMENTAL_MASTERY = "ELEMENTAL_MASTERY",
  ENERGY_RECHARGE = "ENERGY_RECHARGE",
  HEALING_BONUS = "HEALING_BONUS",
  HP_FLAT = "HP_FLAT",
  HP_PERCENT = "HP_PERCENT",
}

export interface StatValue<T extends OverallStat | Stat> {
  stat: T;
  value: number;
}

export interface Plan {
  builds: Build[];
  id: string;
  userId: string;
}

export interface Weapon {
  iconUrl: string;
  id: string;
  name: string;
  rarity: number;
  type: WeaponType;
}

export enum WeaponType {
  BOW = "WEAPON_BOW",
  CATALYST = "WEAPON_CATALYST",
  CLAYMORE = "WEAPON_CLAYMORE",
  POLEARM = "WEAPON_POLE",
  SWORD = "WEAPON_SWORD_ONE_HAND",
}

export interface User {
  email: string;
  id: string;
}
