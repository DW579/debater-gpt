const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const positive_configuration = new Configuration({
    apiKey: process.env.POSITIVE_OPENAI_API_KEY,
});
const negative_configuration = new Configuration({
    apiKey: process.env.NEGATIVE_OPENAI_API_KEY,
});
const user_configuration = new Configuration({
    apiKey: process.env.USER_OPENAI_API_KEY,
});

const positive_openai = new OpenAIApi(positive_configuration);
const negative_openai = new OpenAIApi(negative_configuration);
const user_openai = new OpenAIApi(user_configuration);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/argument-positive", (req, res) => {
    const prompt = req.body.prompt;

    console.log("Prompt: ", prompt);

    setTimeout(() => {
        res.json({
            argument:
                "Positive: Seattle, WA should make public transit free because it would increase ridership and reduce traffic congestion, as well as make transportation more accessible to low-income individuals.",
            debate_technique: "Utilitarianism",
            debate_technique_explanation:
                "Utilitarianism is a philosophical approach that argues that the best action is the one that maximizes overall happiness or well-being. In this case, making public transit free would increase the happiness and well-being of Seattle residents by reducing traffic congestion and making transportation more accessible to low-income individuals, which would lead to a more efficient and equitable society overall.",
        });
    }, 5000);
});

app.post("/argument-negative", (req, res) => {
    const prompt = req.body.prompt;

    console.log("Prompt: ", prompt);

    setTimeout(() => {
        res.json({
            argument:
                "Negative: Seattle, WA should make public transit free because it would increase ridership and reduce traffic congestion, as well as make transportation more accessible to low-income individuals.",
            debate_technique: "Utilitarianism",
            debate_technique_explanation:
                "Utilitarianism is a philosophical approach that argues that the best action is the one that maximizes overall happiness or well-being. In this case, making public transit free would increase the happiness and well-being of Seattle residents by reducing traffic congestion and making transportation more accessible to low-income individuals, which would lead to a more efficient and equitable society overall.",
        });
    }, 5000);
});

app.post("/argument-user", (req, res) => {
    const prompt = req.body.prompt;

    console.log("Prompt: ", prompt);

    setTimeout(() => {
        res.json({
            argument:
                "User: Seattle, WA should make public transit free because it would increase ridership and reduce traffic congestion, as well as make transportation more accessible to low-income individuals.",
            debate_technique: "Utilitarianism",
            debate_technique_explanation:
                "Utilitarianism is a philosophical approach that argues that the best action is the one that maximizes overall happiness or well-being. In this case, making public transit free would increase the happiness and well-being of Seattle residents by reducing traffic congestion and making transportation more accessible to low-income individuals, which would lead to a more efficient and equitable society overall.",
        });
    }, 5000);
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
