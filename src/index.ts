import express from "express";
import serverless from "serverless-http";

const app = express();

app.use(express.json());

app.get("/health", async (_req, res) => {
  res.status(200).json("OK");
});

app.use((_req, res, _) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
