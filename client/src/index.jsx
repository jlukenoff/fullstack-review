import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      repoNames: []
    }
  }

  componentDidMount() {
    $.get('/repos', (resp) => {
      let results = JSON.parse(resp);
      let newReps = this.state.repos;
      let newNames = this.state.repoNames;
      results.forEach(repo => newNames.push(repo.name));
      newReps.push(...results);
      this.setState({repos: [...newReps]});
    });
  }
  
  search (term) {
    $.post('/repos', {
      term: term
    }, (resp) => {
      let newReps = this.state.repos;
      /* TODO: filter duplicate names and sort
                ..maybe abstract to helper func? */
      let results = JSON.parse(resp).filter(repo => this.state.repoNames.indexOf(repo.name) !== 0);
      console.log(results);
      newReps.push(...results);
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