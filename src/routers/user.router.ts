import { Router } from "express";
import { userController } from "../controller/user/index";
import { authMiddleware } from "../middlewares/auth.middleware";

const contactRouter = Router();

// user api crud operations
contactRouter.post("/", userController.createUser);
contactRouter.post("/login", userController.loginUser);
contactRouter.get("/:id", authMiddleware, userController.getUser);
contactRouter.patch("/:id", authMiddleware, userController.updateUser);
contactRouter.delete("/:id", authMiddleware, userController.deleteUser);

export default contactRouter;