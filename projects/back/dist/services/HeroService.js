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
exports.HeroService = void 0;
const HeroRepository_1 = require("../repositories/HeroRepository");
class HeroService {
    constructor() {
        this.heroRepository = HeroRepository_1.HeroRepository.getInstance();
    }
    static getInstance() {
        if (!HeroService.instance) {
            HeroService.instance = new HeroService();
        }
        return HeroService.instance;
    }
    createHero(heroData) {
        return this.heroRepository.create(heroData);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.heroRepository.findAll();
        });
    }
    getOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.heroRepository.findById(id);
        });
    }
    update(id, heroData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.heroRepository.update(id, heroData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.heroRepository.delete(id);
        });
    }
}
exports.HeroService = HeroService;
