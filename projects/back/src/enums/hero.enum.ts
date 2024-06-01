export const HeroSecretIdentityStatuses = ["public", "secret"] as const;

export type HeroSecretIdentityStatus = (typeof HeroSecretIdentityStatuses)[number];

export const HeroSuperpowers = ["flight", "super-strength", "invisibility", "telekinesis", "teleportation"] as const;

export type HeroSuperpower = (typeof HeroSuperpowers)[number];

export const HeroTeamAffiliations = ["avengers", "justice-league", "x-men", "fantastic-four"] as const;

export type HeroTeamAffiliation = (typeof HeroTeamAffiliations)[number];