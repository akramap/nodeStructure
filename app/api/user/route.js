import express from "express";
import c from "../../../utils/controlHandler";
import controller from "./controller";
import regex from "../../helpers/validators/regex";

const router = express.Router();

// user login(accessed at POST /api/user/login)
router.route("/login").post(c(controller.login, ({ body }) => [body]));

// user signup (accesssed at POST /api/user/signup)
router.route("/signup").post(c(controller.create, ({ body }) => [body]));

router
  .route("/")
  // list all users (accessed at GET /api/user/)
  .get(c(controller.list, ({ query }) => [query]));

router
  .route("/:id([0-9]+)")
  // update users (accessed at PUT /api/user/:id)
  .put(c(controller.update, ({ params, body }) => [params, body]))
  // remove users (accessed at DELETE /api/user/:id)
  .delete(c(controller.remove, ({ params }) => [params]))
  // get users (accessed at GET /api/user/:id)
  .get(c(controller.get, ({ params }) => [params]));

export default router;
