import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {initialize} from 'redux-form';
import {UploadForm} from 'components';
import config from '../../config';
import { load as loadAuth } from 'redux/modules/auth';
import * as printActions from 'redux/modules/print';
import TimeAgo from 'react-timeago';

@connect(
  state => ({
    print: state.print,
    user: state.auth.user,
  }),
  {initialize, loadAuth, ...printActions})
export default class Upload extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    loadAuth: PropTypes.func,
    upload: PropTypes.func,
    print: PropTypes.object,
    user: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.print.uploading && !nextProps.print.uploading) {
      this.props.loadAuth();
    }
  }

  handleSubmit = (data) => {
    console.log(data);
    /* data.file = Array.from(data.file).map(file => file.name).join(', ') || 'No Files Selected'; */
    this.props.upload(data);
    // this.props.initialize('upload', {});
  }

  render() {
    const {user} = this.props;
    return (
      <div className="container">
        <h1>Upload</h1>
        <DocumentMeta title={config.app.title + ': Upload'}/>

        <p>
          출력하고 싶은 파일을 업로드 하고 메시지를 남기세요.
        </p>

        <UploadForm onSubmit={this.handleSubmit}/>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>요청시간</th>
              <th>인쇄소</th>
              <th>파일명</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {user && user.requested.map(request => (<tr>
              <td><TimeAgo date={request.date}/></td>
              <td>{{'hanpl': '한양프라자', 'ilgong': '제1공학관'}[request.press]}</td>
              <td>{request.filename}</td>
              <td>{request.state}</td>
            </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}
