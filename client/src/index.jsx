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
      repoNames: [],
      repoCount: 0
    }
  }

  componentDidMount() {
    $.get('/repos', (resp) => {
      let response = JSON.parse(resp);
      console.log(response);
      let newReps = this.state.repos;
      let newNames = this.state.repoNames;
      response.results.forEach(repo => newNames.push(repo.name));
      newReps.push(...response.results);
      this.setState({
        repos: response.results,
        repoCount: response.count,
        repoNames: newNames
      });
    });
  }
  
  search (term) {
    $.post('/repos', {
      term: term
    }, (resp) => {
      resp = JSON.parse(resp);
      this.setState({repos: resp, repoCount: resp.length});
    });
  }

  render () {
    console.log(this.state.repos);
    return (<div>
      <h1>Github fetcher</h1>
      <RepoList repos={this.state.repos} count={this.state.repoCount}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));