import React, { Component } from "react";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default class AbuseChart extends Component {

  render() {
    return (
      <div className="box" style={{ textAlign: 'center' }}>
        <Paper elevation={5} style={{ padding: 10 }}>
          <Typography variant="display1" style={{ marginBottom: 20 }}>
            Abusiveness confidence
          </Typography>
          { 
            this.props.abusiveness.confidence_score ?
            Number(this.props.abusiveness.confidence_score * 100).toFixed(2) + '%' :
            '_____'
          }
        </Paper>
      </div>
    )
  }

}