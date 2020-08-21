import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import 'flexboxgrid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

import RecordVoice from './RecordVoice';
import KeywordsCard from './KeywordsCard';
import Camera from './Camera';
import EmotionGraph from './EmotionGraph';
import SentimentGraph from './SentimentGraph';
import AbuseChart from './AbuseChart';
import OverallReport from './OverallReport';

class App extends Component {
  state = {
    emotionData: [],
    sentimentData: [{ name: '', positive: 0, negative: 0, neutral: 0 }],
    keywords: [],
    abusive: {},
    overallSentimentData: {
      positive: 0,
      negative: 0,
      neutral: 0,
      totalDataPoints: 0
    },
    running: false,
    showOverallReport: false
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        emotionData: [
          { value: Math.random(), name: 'sad' },
          { value: Math.random(), name: 'excited' },
          { value: Math.random(), name: 'sarcasm' },
          { value: Math.random(), name: 'fear' },
          { value: Math.random(), name: 'happy' },
          { value: Math.random(), name: 'bored' },
          { value: Math.random(), name: 'angry' }
        ],
        sentimentData: [
          this.state.sentimentData[this.state.sentimentData.length - 3],
          this.state.sentimentData[this.state.sentimentData.length - 2],
          this.state.sentimentData[this.state.sentimentData.length - 1],
          {
            name: '',
            positive: Math.random(),
            negative: Math.random(),
            neutral: Math.random()
          }
        ]
      });
    }, 1500);
  }

  toggleRunning = running => {
    this.setState({ running });
  };

  updateEmotion = emotions => {
    const emotionData = [];
    for (let [key, value] of Object.entries(emotions)) {
      emotionData.push({ name: key, value });
    }
    this.setState({
      emotionData: emotionData
    });
  };

  onSpeech = text => {
    fetch('http://localhost:5000/api/analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);

        const sentimentData = res.sentiments.probabilities;
        const totalSentimentData = {
          positive:
            this.state.overallSentimentData.positive + sentimentData.positive,
          negative:
            this.state.overallSentimentData.negative + sentimentData.negative,
          neutral:
            this.state.overallSentimentData.neutral + sentimentData.neutral,
          totalDataPoints: this.state.overallSentimentData.totalDataPoints + 1
        };

        this.setState({
          keywords: res.keywords.keywords,
          sentimentData: [
            this.state.sentimentData[this.state.sentimentData.length - 3],
            this.state.sentimentData[this.state.sentimentData.length - 2],
            this.state.sentimentData[this.state.sentimentData.length - 1],
            res.sentiments.probabilities
          ],
          abusive: res.abuse,
          overallSentimentData: totalSentimentData
        });
      });
  };

  showOverallReport = () => {
    this.setState({ showOverallReport: true });
  };

  render() {
    return (
      <div>
        <div className="row around-sm">
          <div className="col-sm-4" style={{ marginTop: 30 }}>
            <RecordVoice
              onSpeech={this.onSpeech}
              toggleRunning={this.toggleRunning}
            />
          </div>
          <div className="col-sm-3" style={{ marginTop: 30 }}>
            <div className="row">
              <div className="col-sm-12">
                <div className="box">
                  <KeywordsCard list={this.state.keywords} />
                </div>
              </div>
            </div>
            <div className="row center-sm">
              <div className="col-sm-12">
                <div className="box">
                  {this.state.showOverallReport ? (
                    <Modal
                      open={this.state.showOverallReport}
                      onClose={() =>
                        this.setState({ showOverallReport: false })
                      }
                      showCloseIcon={false}
                    >
                      <OverallReport
                        totalSentiments={this.state.overallSentimentData}
                      />
                    </Modal>
                  ) : (
                    <Button
                      style={{ marginTop: 30 }}
                      variant="raised"
                      onClick={this.showOverallReport}
                    >
                      Show Overall Report
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4" style={{ marginTop: 30 }}>
            {
              <Camera
                updateEmotion={this.updateEmotion}
                running={this.state.running}
              />
            }
          </div>
        </div>
        <div className="row around-sm" style={{ height: 300 }}>
          <div className="col-sm-6" style={{ marginTop: 25 }}>
            <EmotionGraph emotionData={this.state.emotionData} />
          </div>
          <div className="col-sm-6" style={{ marginTop: 25 }}>
            <SentimentGraph sentimentData={this.state.sentimentData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
