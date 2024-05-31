"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroRepository = void 0;
const Hero_1 = require("../models/Hero");
class HeroRepository {
    constructor() { }
    static getInstance() {
        if (!HeroRepository.instance) {
            HeroRepository.instance = new HeroRepository();
        }
        return HeroRepository.instance;
    }
    create(heroData) {
        return __awaiter(this, void 0, void 0, function* () {
            const hero = new Hero_1.Hero(heroData);
            return yield hero.save();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Hero_1.Hero.find().exec();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Hero_1.Hero.findById(id).exec();
        });
    }
    update(id, heroData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Hero_1.Hero.findByIdAndUpdate(id, heroData, { new: true }).exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Hero_1.Hero.findByIdAndDelete(id).exec();
        });
    }
}
exports.HeroRepository = HeroRepository;
