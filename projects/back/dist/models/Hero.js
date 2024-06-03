"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hero = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hero_enum_1 = require("../enums/hero.enum");
const common_enum_1 = require("../enums/common.enum");
const HeroSchema = new mongoose_1.default.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    hero_name: { type: String, required: true },
    birth_date: { type: String, required: true },
    secret_identity: { type: String, enum: Object.values(hero_enum_1.HeroSecretIdentityStatuses), required: true },
    gender: { type: String, enum: Object.values(common_enum_1.Genders), required: true },
    superpower: { type: String, enum: Object.values(hero_enum_1.HeroSuperpowers), required: true },
    team_affiliation: { type: String, enum: Object.values(hero_enum_1.HeroTeamAffiliations), required: true },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    toJSON: {
        virtuals: true,
        transform: function (_, ret) {
            // doc, ret
            delete ret._id;
            delete ret.__v;
        },
    },
    versionKey: false,
});
exports.Hero = mongoose_1.default.model("Hero", HeroSchema, "Heroes");
