from nltk.sentiment.vader import SentimentIntensityAnalyzer
import json
import nltk
nltk.download('vader_lexicon')

sid = SentimentIntensityAnalyzer()


def analyse_text(message_text):
    scores = sid.polarity_scores(message_text)
    return json.dumps(scores)


#print(analyse_text('hi how are you'))
