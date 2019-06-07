# react-cron-generator

Simple react component to generate cron expression

## Getting Started

Package allows to build linux scheduler cron expression.

```
data = '* * * * * * *'
```
```
npm install react-cron-generator

```

```
import React, { Component } from 'react'
import Cron from 'react-cron-generator'

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
       
      };
  }

  render() {
    return (<div>
      <Cron
        onChange={(e)=> {this.setState({value:e}); console.log(e)}}
        value={this.state.value}
        showResultText={true}
        showResultCron={true}
        />
                            
    </div>)
  }
}

export default App;

```
## props

| Prop | Description | Default
| --- | --- | -- |
| value | cron expression  |  |
| onChange |  |  |
| showResultText | show in readable text format | false |
| showResultCron | show cron expression | false | 
## Acknowledgments

*viswanath lakshmanan