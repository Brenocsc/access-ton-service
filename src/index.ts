import express from 'express';
import serverless from 'serverless-http';

const app = express();

app.use(express.json());

app.get("/health", async function (req, res) {
  res.status(200).json("OK");
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
