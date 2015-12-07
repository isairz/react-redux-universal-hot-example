import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import { load as loadAuth } from 'redux/modules/auth';
import * as coponActions from 'redux/modules/copon';
import config from '../../config';

@connect(
  state => ({
    copon: state.copon,
  }),
  {loadAuth, ...coponActions})
export default class Copon extends Component {
  static propTypes = {
    copon: PropTypes.object,
    loadAuth: PropTypes.func,
    register: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.copon.registered && nextProps.copon.registered) {
      this.props.loadAuth();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const code = this.refs.code.value;
    this.props.register(code);
  }

  render() {
    const styles = require('./Copon.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title={config.app.title + ': 쿠폰 등록'}/>
        <h1>쿠폰 등록</h1>
        <div>
          <form className="form" style={{maxWidth: 520}} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="code" placeholder="쿠폰 번호" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}등록
            </button>
          </form>
        </div>
        {this.props.copon.registered &&
        <div className="alert alert-success">
          쿠폰 등록 성공!
        </div>
        }
        {this.props.copon.error &&
        <div className="alert alert-danger">
          쿠폰 등록 실패! 번호를 확인하세요.
        </div>
        }
      </div>
    );
  }
}
