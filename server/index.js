const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/argument-gpt", (req, res) => {
    const prompt = req.body.prompt;
    const opponent = req.body.opponent;
    let argument = "Argument: " + prompt + ". " + opponent + " response: ";
    let response_data = {
        argument: "",
        argument_technique_name: "",
        argument_technique_explanation: "",
    };

    async function argumentCreation(prompt) {
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 256,
                temperature: 0.7,
                n: 1,
                stream: false,
            });

            return completion;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    argumentCreation(argument)
        .then((argumentCompletion) => {
            const argumentResponse = argumentCompletion.data.choices[0].text.trim();

            response_data.argument = argumentResponse;

            const explanationPrompt = "Argument: " + argumentResponse + ". Argument technique explanation: ";

            return argumentCreation(explanationPrompt);
        })
        .then((explanationCompletion) => {
            const explanationResponse = explanationCompletion.data.choices[0].text.trim();

            response_data.argument_technique_explanation = explanationResponse;

            const namePrompt = "Argument: " + explanationResponse + ". Argument technique name: ";

            return argumentCreation(namePrompt);
        })
        .then((nameCompletion) => {
            const nameResponse = nameCompletion.data.choices[0].text.trim();

            response_data.argument_technique_name = nameResponse;

            res.json(response_data);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

app.post("/argument-user", (req, res) => {
    let argument = req.body.prompt;

    let response_data = {
        argument: argument,
        argument_technique_name: "",
        argument_technique_explanation: "",
    };

    async function argumentCreation(prompt) {
        try {
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 256,
                temperature: 0.7,
                n: 1,
                stream: false,
            });

            return completion;
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error.message });
        }
    }

    argument = "Argument: " + argument + ". Argument technique explanation: ";

    argumentCreation(argument)
        .then((data) => {
            const gpt_response = data.data.choices[0].text.trim();

            response_data.argument_technique_explanation = gpt_response;

            const technique_name_prompt = "Argument: " + gpt_response + ". Argument technique name: ";

            argumentCreation(technique_name_prompt)
                .then((data) => {
                    const gpt_response = data.data.choices[0].text.trim();

                    response_data.argument_technique_name = gpt_response;

                    res.json(response_data);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({ error: error.message });
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: error.message });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
