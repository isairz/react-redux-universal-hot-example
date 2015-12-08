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
    /* data.file = Array.from(data.file).map(file => file.name).join(', ') || 'No Files Selected'; */
    this.props.upload(data);
    // this.props.initialize('upload', {});
  }

  render() {
    const {user, print} = this.props;
    return (
      <div className="container">
        <h1> </h1>
        <DocumentMeta title={config.app.title + ': Upload'}/>

        <dl>
          <dt>사용법</dt>
          <dd>
            <ol>
              <li>Upload에서 출력하고 싶은 파일을 첨부</li>
              <li>출력 요구사항을 남깁니다. (ex: 내일 10시반에 찾으러 갈께요)</li>
              <li>요청이 완료된 것을 확인한 뒤 인쇄소에서 쿨하게 찾아가면 끝-</li>
            </ol>
          </dd>
          <dt>주의사항</dt>
          <dd>
            <ul>
              <li>요청 취소가 안되요ㅜㅜ 요청할 때 확인하고 올려주세요</li>
              <li>1페이지씩 단면인쇄만 지원해요</li>
              <li>한장에 50원입니다</li>
            </ul>
          </dd>
        </dl>

        <UploadForm onSubmit={this.handleSubmit}/>
        {print.error && <div className="alert alert-danger">{print.error}</div>}

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
