import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {initialize} from 'redux-form';
import {UploadForm} from 'components';
import config from '../../config';

@connect(
  () => ({}),
  {initialize})
export default class Upload extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  handleSubmit = (data) => {
    fetch('/users', {
      method: 'post',
      body: new FormData(data),
    });
    this.props.initialize('upload', {});
  }

  handleInitialize = () => {
    this.props.initialize('upload', {
      name: '태크노경영학',
      memo: '1부 인쇄해 주세요',
      file: '',
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Upload</h1>
        <DocumentMeta title={config.app.title + ': Upload'}/>

        <p>
          출력하고 싶은 파일을 업로드 하고 메시지를 남기세요.
        </p>

        <div style={{textAlign: 'center', margin: 15}}>
          <button className="btn btn-primary" onClick={this.handleInitialize}>
            <i className="fa fa-pencil"/> Initialize Form
          </button>
        </div>

        <UploadForm onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}
