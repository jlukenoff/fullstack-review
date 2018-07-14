import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
    
    if (e.which === 13) {
      this.search();
    }
  }

  search() {
    let term = this.state.term;
    this.props.onSearch(term);
    document.getElementById('search-input').value = '';
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input id="search-input" value={this.state.terms} onKeyUp={(e) => this.onChange(e)}/>       
      <button onClick={() => this.search()}> Add Repos </button>
    </div>) 
  }
}

export default Search;