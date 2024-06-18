import { Router } from "express";

import { addBook } from "./books.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

// Authenticator middleware
router.use(authMiddleware);

// protected routes
router.post("/new", addBook);

export default router;
