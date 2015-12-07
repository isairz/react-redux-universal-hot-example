import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as authActions from 'redux/modules/auth';

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
      nickname: this.refs.nickname.value,
      password: this.refs.password.value
    };
    this.props.register(form);
  }

  render() {
    return (
      <div className={'container'}>
        <h1>회원가입</h1>
        <div>
          <form className="form" style={{maxWidth: 520}} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="아이디" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="비밀번호" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="text" ref="nickname" placeholder="이름" className="form-control"/>
              <span className="help-block">
                인쇄물을 찾을 때 이용됩니다.
              </span>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}>
              <i className="fa fa-sign-in"/>{' '}
              가입
            </button>
          </form>
        </div>
        {this.state && this.state.registerFailure &&
        <div className="alert alert-danger">
          회원가입 실패. 아이디가 중복되었거나 쿠폰번호가 잘못 됬습니다.
        </div>
        }
      </div>
    );
  }
}
