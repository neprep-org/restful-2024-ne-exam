import { Router } from "express";

import { addBook, getAllBooks } from "./books.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

// Authenticator middleware
router.use(authMiddleware);

// protected routes
router.post("/new", addBook);
router.get("/all", getAllBooks);

export default router;
