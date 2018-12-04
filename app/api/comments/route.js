import express from "express";
import controller from "./controller";
import c from "../../../utils/controlHandler";

const router = express.Router();

// add comment (accessed at POST /api/comment/addPost/)
router.route("/addComment").post(c(controller.create, ({ body }) => [body]));

router
  .route("/")
  // list all comments (accessed at GET /api/comment/)
  .get(c(controller.list, ({ query }) => [query]));

router
  .route("/:id([0-9]+)")
  // update comments (accessed at PUT /api/comment/:id)
  .put(c(controller.update, ({ params, body }) => [params, body]))
  // remove comments (accessed at DELETE /api/comment/:id)
  .delete(c(controller.remove, ({ params }) => [params]))
  // get comments (accessed at GET /api/comment/:id)
  .get(c(controller.getById, ({ params }) => [params]));

export default router;
