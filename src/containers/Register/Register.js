import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';
import config from '../../config';

@connect(
  state => ({
    auth: state.auth,
    user: state.auth.user
  }),
  authActions)
export default class Register extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
    register: PropTypes.func,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.registering && !nextProps.user) {
      // Register failure
      this.setState({
        registerFailure: true,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const form = {
      username: this.refs.username.value,
      password: this.refs.password.value
    };
    console.log(form);
    this.props.register(form);
  }

  render() {
    const {user} = this.props;
    const styles = require('./Register.scss');
    return (
      <div className={styles.registerPage + ' container'}>
        <DocumentMeta title={config.app.title + ': 회원가입'}/>
        <h1>회원가입</h1>
        {!user &&
        <div>
          <form className="form form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="col-sm-1 control-label">아이디</label>
              <div className="col-sm-2">
                <input type="text" ref="username" placeholder="ID" className="form-control"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="col-sm-1 control-label">비밀번호</label>
              <div className="col-sm-2">
                <input type="password" ref="password" placeholder="Password" className="form-control"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="username" className="col-sm-1 control-label">이름</label>
              <div className="col-sm-2">
                <input type="text" ref="nicname" placeholder="Name" className="form-control"/>
              </div>
              <span className="help-block">
                인쇄물을 찾을 때 이용됩니다.
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="copon" className="col-sm-1 control-label">쿠폰번호</label>
              <div className="col-sm-2">
                <input type="text" ref="copon" placeholder="Copon" className="form-control"/>
              </div>
              <span className="help-block">
                프로모션 쿠폰을 소지하고 계신 경우 입력해주세요. 없을 경우 비워두시면 됩니다.
              </span>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}>
              <i className="fa fa-sign-in"/>{' '}
              가입
            </button>
          </form>
        </div>
        }
        {this.state && this.state.registerFailure &&
        <div className="alert alert-danger">
          회원가입 실패. 아이디가 중복되었거나 쿠폰번호가 잘못 됬습니다.
        </div>
        }
      </div>
    );
  }
}
