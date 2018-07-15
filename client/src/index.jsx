import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import UserSelect from './components/UserSelect.jsx';
import _ from 'lodash';
import './style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      users: [],
      repoCount: 0,
      newReps: 0,
      selectedUser: false,
      friends: []
    }
  }

  componentDidMount() {
    $.get('/repos', (resp) => {
      let response = JSON.parse(resp);
      let newReps = this.state.repos;
      let users = this.state.users;
      response.results.forEach(repo => users.push(repo.owner));
      newReps.push(...response.results);
      this.setState({
        repos: response.results,
        repoCount: response.count,
        users: _.uniq(users)
      });
    });
  }

  handleUserChange(user) {
    if (user !== 'All users') {
      //make request to server for contributors
      $.get('/friends', {name: user}, (resp) => {
        let friends = JSON.parse(resp);
        this.setState({ selectedUser: user, friends: friends });
      })
        //on success setState
    } else {
      this.setState({ selectedUser: false, friends: [] });
    }
  }
  
  search (term) {
    $.post('/repos', {
      term: term
    }, (resp) => {
      if (resp === 'non-existent') {
        return;
      }
      resp = JSON.parse(resp);
      let users = this.state.users;
      users.push(term);

      this.setState({repos: resp.repos, repoCount: resp.repos.length, newReps: resp.newReps, users: users});
    });
  }

  render () {
    return (
    <div className='app'>
      <h1>Github Fetcher</h1>
      <UserSelect users={this.state.users} change={this.handleUserChange.bind(this)}/>
      <RepoList repos={this.state.repos} count={this.state.repoCount} new={this.state.newReps} user={this.state.selectedUser} friends={this.state.friends}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));