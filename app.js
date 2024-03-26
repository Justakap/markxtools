const port = 9000;
const axios = require('axios');
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    // origin: ["http://localhost:3000"],
    origin: ["https://markxtools.netlify.app"],
    credentials: true,
}));

// All GET Request's

app.get('/', (req, res) => {
    res.send("Api Tester");
});

// Famous Api Tester 
// cricket info api 

app.get('/cric', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
        headers: {
            'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
            'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Sending the data back to the client
    } catch (error) {
        console.error('Error fetching cricket data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ai based image api 

app.post('/aiImageGenerator', async (req, res) => {
    const { query } = req.body;

    const axios = require('axios');

    // Function to try different options sequentially
    const tryOptions = async (options) => {
        try {
            const response = await axios.request(options);
            return response.data; // Return data if request succeeds
        } catch (error) {
            console.error('Error:', error.message);
            return null; // Return null if request fails
        }
    };

    // Options for OpenAI
    const openAIOptions = {
        method: 'POST',
        url: 'https://open-ai21.p.rapidapi.com/texttoimage2',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
            'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        },
        data: { text: query }
    };

    // Options for GPT-4
    const gpt4Options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: { text: query }
    };

    // Try OpenAI first, then GPT-4 if OpenAI fails
    const responseData = await tryOptions(gpt4Options) || await tryOptions(openAIOptions);

    if (responseData) {
        res.json(responseData); // Send the data back to the client
    } else {
        console.error('Both requests failed');
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// AI CHATBOT

app.post('/aiChatBot', async (req, res) => {
    const { query } = req.body;
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: query
                }
            ],
            system_prompt: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

});
// INSTAGRAM PROFILE HD

app.post('/instaProfileInfo', async (req, res) => {
    const { query } = req.body;

    const options = {
        method: 'POST',
        url: 'https://rocketapi-for-instagram.p.rapidapi.com/instagram/user/get_info',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
          'X-RapidAPI-Host': 'rocketapi-for-instagram.p.rapidapi.com'
        },
        data: {
          username: query
        }
      };
    
    try {
        const response = await axios.request(options);
        res.json(response.data)
    } catch (error) {
        console.error(error);
    }

});
// Transalator

app.post('/translate', async (req, res) => {
    const { query, from, to } = req.body;
    const axios = require('axios');

    const options = {
        method: 'POST',
        url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
            'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
        },
        data: {
            q: query,
            source: from,
            target: to
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});



// api that can be used
// language detection
// const axios = require('axios');
// const options = {
//   method: 'GET',
//   url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
//   headers: {
//     'X-RapidAPI-Key': 'de102aab60mshcfc1e64ee1fa548p1c1ee8jsn6ca8295c4119',
//     'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
//   }
// };
// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }