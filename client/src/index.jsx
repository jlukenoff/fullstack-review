import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount() {
    $.get('http://localhost:1128/repos', (resp) => {
      let results = JSON.parse(resp);
      let newReps = this.state.repos;
      newReps.push(results);
      this.setState({repos: results});
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.post('http://localhost:1128/repos', {
      term: term
    }, (resp) => {
      let results = JSON.parse(resp);
      let newReps = this.state.repos;
      newReps.push(results);
      this.setState({repos: newReps});
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));