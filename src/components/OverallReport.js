import React, { Component } from "react";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class OverallReport extends Component {
  render() {
    const item = this.props.totalSentiments;
    return (
      <div style={{ textAlign: 'center', margin: -150 }}>
        <Paper elevation={5} style={{ padding: 10 }}>
          <Typography variant="display1" style={{ marginBottom: 20 }}>
            Overall Call Report
          </Typography>
          {
            item.positive > item.negative && item.positive > item.neutral ?
            <img
              alt="final-feedback"
              src="https://www.paralleldots.com/static/images/positive.png"
            /> : (item.negative > item.positive && item.negative > item.neutral ?
              <img
                alt="final-feedback"
                src="https://www.paralleldots.com/static/images/negative.png"
              /> :
              <img
                alt="final-feedback"
                src="https://www.paralleldots.com/static/images/neutral.png"
              />
            )
          }
          <Typography variant="headline" style={{ marginBottom: 4 }}>
            Positive: {item.positive ? (Number((item.positive * 100) / item.totalDataPoints).toFixed(2) + '%') : '---'}
          </Typography>
          <Typography variant="headline" style={{ marginBottom: 4 }}>
            Negative: {item.negative ? (Number((item.negative * 100) / item.totalDataPoints).toFixed(2) + '%') : '---'}
          </Typography>
          <Typography variant="headline" style={{ marginBottom: 4 }}>
            Neutral: {item.neutral ? (Number((item.neutral * 100) / item.totalDataPoints).toFixed(2) + '%') : '---'}
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default OverallReport;
