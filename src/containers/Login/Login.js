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
export default class Login extends Component {
  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.loggingIn && !nextProps.user) {
      // Login failure
      this.setState({
        loginFailure: true,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    this.props.login(username, password);
  }

  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title={config.app.title + ': Login'}/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" style={{maxWidth: 520}} onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="아이디" className="form-control"/>
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="비밀번호" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
        </div>
        }
        {this.state && this.state.loginFailure &&
        <div className="alert alert-danger">
          로그인 실패. 아이디와 비밀번호를 확인해주세요.
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
