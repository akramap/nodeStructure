import express from "express";
import controller from "./controller";
import c from "../../../utils/controlHandler";

const router = express.Router();

// add post (accessed at POST /api/user/addPost/)
router.route("/addRole").post(c(controller.create, ({ body }) => [body]));

router
  .route("/")
  // list all posts (accessed at GET /api/posts/)
  .get(c(controller.list, ({ query }) => [query]));

router
  .route("/:id([0-9]+)")
  // update users (accessed at PUT /api/posts/:id)
  .put(c(controller.update, ({ params, body }) => [params, body]))
  // remove users (accessed at DELETE /api/posts/:id)
  .delete(c(controller.remove, ({ params }) => [params]))
  // get users (accessed at GET /api/posts/:id)
  .get(c(controller.getById, ({ params }) => [params]));

export default router;
