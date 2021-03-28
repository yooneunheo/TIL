import React, { Component } from 'react';

class PhoneInfo extends Component {
  state = {
    editing: false,
    name: '',
    phone: ''
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return this.props.info !== nextProps.info;
  }

  handleRemove = () => {
    const { info, onRemove } = this.props;
    onRemove(info.id);
  };

  handleToggleEdit = () => {
    // true -> false : onUpdate
    // false -> true : state 에 info 값들 넣어주기
    const { info, onUpdate } = this.props;
    if (this.state.editing) {
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    } else {
      this.setState({
        name: info.name,
        phone: info.phone
      });
    }
    this.setState({
      editing: !this.state.editing
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { name, phone } = this.props.info;
    const { editing } = this.state;

    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    return (
      <div style={style}>
        {editing ? (
          <>
            <input
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />
            <input
              name='phone'
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </>
        ) : (
          <>
            <div>
              <b>{name}</b>
            </div>
            <div>{phone}</div>
          </>
        )}
        <button onClick={this.handleRemove}>삭제</button>
        <button onClick={this.handleToggleEdit}>
          {editing ? '적용' : '수정'}
        </button>
      </div>
    );
  }
}

export default PhoneInfo;
