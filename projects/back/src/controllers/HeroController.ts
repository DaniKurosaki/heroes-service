import express, { Request, Response, Router } from "express";
import { HeroService } from "../services/HeroService";

class HeroController {
	public router: Router;
	private heroService: HeroService = HeroService.getInstance();

	constructor() {
		this.router = express.Router();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post("/create", this.createHero);
		this.router.get("/", this.getAll);
		this.router.get("/:id", this.getOneById);
		this.router.put("/:id", this.update);
		this.router.delete("/:id", this.delete);
		// other routes...
	}

	private createHero = async (req: Request, res: Response) => {
		try {
			const data = await this.heroService.createHero(req.body);
			res.status(201).json(data);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	};

	private getAll = async (_req: Request, res: Response) => {
		try {
			const data = await this.heroService.getAll();
			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	};

	private getOneById = async (req: Request, res: Response) => {
		try {
			const data = await this.heroService.getOneById(req.params.id);

			if (!data) return res.status(404).json({ message: "Hero not found" });

			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	};

	private update = async (req: Request, res: Response) => {
		try {
			const data = await this.heroService.update(req.params.id, req.body);

			if (!data) return res.status(404).json({ message: "Hero not found" });

			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	};

	private delete = async (req: Request, res: Response) => {
		try {
			const data = await this.heroService.delete(req.params.id);

			if (!data) return res.status(404).json({ message: "Hero not found" });

			res.status(200).json(data);
		} catch (error: any) {
			res.status(500).json({ message: error.message });
		}
	};
}

export default new HeroController().router;
