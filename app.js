const port = 9000;
const axios = require('axios');
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('../backend/models/user')
const DepositModel = require('../backend/models/deposit')
const ChipsModel = require('../backend/models/chips')
const RouletteModel = require('../backend/models/roulette')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:3000', 'https://markxtools.netlify.app'];
const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
  app.use(cors(corsOptions));

mongoose.connect("mongodb+srv://anantk15:root@cluster0.972saxu.mongodb.net/wallet?retryWrites=true&w=majority").then(() => {
    console.log("success mon")
})
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

//get 

app.get('/user', async (req, res) => {
    try {
        const { email } = req.query; // Extract email from query parameters

        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user); // Send user data as response
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
app.get('/deposits', (req, res) => {
    DepositModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
app.get('/chips', (req, res) => {
    ChipsModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})
app.get('/roulette', (req, res) => {
    RouletteModel.find()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})


//signup 

app.post('/signup', async (req, res) => {
    const { name, email, password, contact } = req.body

    const data = {
        email: email,
        password: password,
        name: name,
        contact: contact,
    }

    try {
        const check = await UserModel.findOne({ email: email })
        if (check) {
            res.json("exist")
        } else {
            res.json("notexist")
            await UserModel.insertMany([data])
        }
    } catch (error) {
        console.log(error);
        res.json("invalid")
    }

})

// login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            // Check if the password matches
            if (user.password == password) {

                // Respond with JSON data containing user's information
                res.json({ auth: true, user: user });
            } else {
                // If the password doesn't match, respond with JSON indicating incorrect password
                res.json("incorrect");
            }
        } else {
            // If no user found with the provided email, respond with JSON indicating user does not exist
            res.json("notexist");
        }
    } catch (error) {
        // If an error occurs, respond with JSON indicating server error
        console.error(error);
        res.status(500).json("server error");
    }
});

//put 
app.put('/addAmount', async (req, res) => {
    try {
        const { amount, email } = req.body;

        // Update user balance
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            { $inc: { balance: amount } },
            { new: true }
        );

        // Create deposit entry
        const deposit = new DepositModel({
            amount: amount,
            email: email
        });
        const savedDeposit = await deposit.save();

        // Check if user was not found
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if deposit was not saved
        if (!savedDeposit) {
            return res.status(500).json({ error: 'Error adding deposit' });
        }

        res.status(200).json("updated");
    } catch (error) {
        console.error('Error updating user balance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//roulette
app.put('/updateChipsRoulette', async (req, res) => {
    try {
        const { amount, email } = req.body;

        const updatedUser = await UserModel.findOneAndUpdate(
            { email }, // Filter to find the user
            { $inc: { chipsBalance: amount } },
            { new: true } // Return the updated document
        );

        const roulette = new RouletteModel({
            amount: amount,
            email: email
        });
        const chipsDeposit = await roulette.save();

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!chipsDeposit) {
            return res.status(500).json({ error: 'Error adding deposit' });
        }
        // console.log('Updated user:', updatedUser);

        res.status(200).json("updated");
    } catch (error) {
        console.error('Error updating user balance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.put('/addChips', async (req, res) => {
    try {
        const { cashAmount, email } = req.body;

        const updatedUser = await UserModel.findOneAndUpdate(
            { email }, // Filter to find the user
            {
                $inc: {
                    chipsBalance: cashAmount, // Increment chipsBalance
                    balance: -cashAmount * 1.20 // Decrement balance
                }
            },
            { new: true } // Return the updated document
        );

        const chips = new ChipsModel({
            chipsAmount: cashAmount,
            email: email
        });
        const chipsDeposit = await chips.save();

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!chipsDeposit) {
            return res.status(500).json({ error: 'Error adding deposit' });
        }

        // console.log('Updated user:', updatedUser);

        res.status(200).json("updated");
    } catch (error) {
        console.error('Error updating user balance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.put('/addCash', async (req, res) => {
    try {
        const { chipsAmount, email } = req.body;

        const updatedUser = await UserModel.findOneAndUpdate(
            { email }, // Filter to find the user
            {
                $inc: {
                    chipsBalance: -chipsAmount,
                    balance: chipsAmount
                }
            },
            { new: true } // Return the updated document
        );
        const chips = new ChipsModel({
            chipsAmount: -chipsAmount,
            email: email
        });
        const chipsDeposit = await chips.save();
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!chipsDeposit) {
            return res.status(500).json({ error: 'Error adding deposit' });
        }
        // console.log('Updated user:', updatedUser);

        res.status(200).json("updated");
    } catch (error) {
        console.error('Error updating user balance:', error);
        res.status(500).json({ error: 'Internal server error' });
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