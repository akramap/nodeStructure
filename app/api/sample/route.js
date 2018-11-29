import express from "express";
import c from "../../../utils/controlHandler";
import controller from "./controller";

const router = express.Router();

router
  .route("/")
  // create new sample (accessed at POST /api/sample)
  .post(c(controller.create, ({ body }) => [body]))
  // list all samples (accessed at GET /api/sample)
  .get(c(controller.list, ({ query }) => [query]));

router
  .route("/:id([0-9a-fA-F]{24})")
  // update sample (accessed at PUT /api/sample/:id)
  .put(c(controller.update, ({ params, body }) => [params, body]))
  // remove sample (accessed at DELETE /api/sample/:id)
  .delete(c(controller.remove, ({ params }) => [params]))
  // get sample (accessed at GET /api/sample/:id)
  .get(c(controller.get, ({ params }) => [params]));

export default router;
