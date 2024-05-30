export const HeroSuperpowers = ["flight", "super strength", "invisibility", "telekinesis", "teleportation"] as const;

export type HeroSuperpower = (typeof HeroSuperpowers)[number];

export const HeroTeamAffiliations = ["Avengers", "Justice League", "X-Men", "Fantastic Four"] as const;

export type HeroTeamAffiliation = (typeof HeroTeamAffiliations)[number];