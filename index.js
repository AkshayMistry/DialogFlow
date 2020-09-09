const dialogflow = require('dialogflow');
const uuid = require('uuid');

exports.bot = async (req, res) => {
    projectId = 'paste-your-projectId'
    const sessionId = uuid.v4();

    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "/path/config.json"
    });

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.input,
                languageCode: 'en-US',
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    
    if (result.intent) {
        console.log(`  Intent: ${result.intent.displayName}`);
        res.json({ status: 200, msg: 'Intent Matched', data : result.fulfillmentText });
    } else {
        console.log(`  No intent matched.`);
        res.json({ status: 412, msg: ' No intent matched.' });
    }

}
