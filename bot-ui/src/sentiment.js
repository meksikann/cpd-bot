//export GOOGLE_APPLICATION_CREDENTIALS="/home/serg/private/sentiment-8a70878c21a9.json"

async function startSentimentor(text) {
    // Imports the Google Cloud client library
    const language = require('@google-cloud/language');

    // Instantiates a client
    const client = new language.LanguageServiceClient();

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [result] = await client.analyzeSentiment({document: document});
    const sentiment = result.documentSentiment;
    const score = sentiment.score;
    const magn = sentiment.magnitude;

    console.log(`Text: ${text}`);
    console.log(`Sentiment score: ${sentiment.score}`);
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

    const rowResults =  `Text: ${text}.
    Sentiment score: ${sentiment.score} and Sentiment magnitude: ${sentiment.magnitude}`;

    return {text, score, magn}
}

export {startSentimentor}
