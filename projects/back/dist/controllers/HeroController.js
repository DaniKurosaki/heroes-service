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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HeroService_1 = require("../services/HeroService");
class HeroController {
    constructor() {
        this.heroService = HeroService_1.HeroService.getInstance();
        this.createHero = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.heroService.createHero(req.body);
                res.status(201).json(data);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.heroService.getAll();
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.getOneById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.heroService.getOneById(req.params.id);
                if (!data)
                    return res.status(404).json({ message: "Hero not found" });
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.heroService.update(req.params.id, req.body);
                if (!data)
                    return res.status(404).json({ message: "Hero not found" });
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.heroService.delete(req.params.id);
                if (!data)
                    return res.status(404).json({ message: "Hero not found" });
                res.status(200).json(data);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/create", this.createHero);
        this.router.get("/", this.getAll);
        this.router.get("/:id", this.getOneById);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
        // other routes...
    }
}
exports.default = new HeroController().router;
