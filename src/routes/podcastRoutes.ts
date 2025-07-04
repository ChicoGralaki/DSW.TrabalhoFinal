import { Router } from "express";
import { PodcastController } from "../controllers/PodcastController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use(authMiddleware);

router.post("/", PodcastController.create);
router.get("/", PodcastController.findAll);
router.get("/:id", PodcastController.findOne);
router.put("/:id", PodcastController.update);
router.delete("/:id", PodcastController.delete);

export default router;