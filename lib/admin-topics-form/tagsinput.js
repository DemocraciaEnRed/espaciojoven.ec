import React, { Component } from 'react';
import ReactTagsInput from 'react-tagsinput';
import t from 't-component';

export default class TagsInput extends Component {

  constructor() {
    super();
    this.state = { tags: [] };
  }

  componentDidMount() {
    this.setState({tags: this.props.tags});
  }

  handleChange(tags) {
    this.setState({tags});
    if (this.props.handleChanged) {
      this.props.handleChanged.call(this, tags);
    }
  }

  renderInput(props) {
    let {onChange, value, ...other} = props
    return (
      <input placeholder={t('admin-topics-form.placeholder.keywords')} type='text' onChange={onChange} value={value} {...other} />
    )
  }

  render() {
    const addKeys = [188] // comma separated keywords
    return <ReactTagsInput renderInput={this.renderInput} value={this.state.tags} onChange={this.handleChange.bind(this)} addKeys={addKeys} />
  }

}