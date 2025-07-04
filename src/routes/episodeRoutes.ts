import { Router } from "express";
import { EpisodeController } from "../controllers/EpisodeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/", EpisodeController.create);
router.get("/", EpisodeController.findAll);
router.get("/:id", EpisodeController.findOne);
router.put("/:id", EpisodeController.update);
router.delete("/:id", EpisodeController.delete);

export default router;