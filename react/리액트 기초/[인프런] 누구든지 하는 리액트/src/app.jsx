import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class app extends Component {
  id = 0;

  state = {
    information: [],
    keyword: ''
  };

  handleChange = (e) => {
    this.setState({
      keyword: e.target.value
    });
  };

  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ ...data, id: this.id++ })
    });
  };

  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter((info) => info.id !== id)
    });
  };

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map((info) => {
        if (info.id === id) {
          return {
            id,
            ...data
          };
        }
        return info;
      })
    });
  };

  render() {
    return (
      <>
        <PhoneForm onCreate={this.handleCreate} />
        <input
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder='검색'
        />
        <PhoneInfoList
          data={this.state.information.filter(
            (info) => info.name.indexOf(this.state.keyword) > -1
          )}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </>
    );
  }
}

export default app;
