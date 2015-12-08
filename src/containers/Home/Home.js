import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import config from '../../config';
import { Register } from 'containers';

@connect(
  state => ({
    user: state.auth.user,
  }),
  {})
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
  };
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const {user} = this.props;
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>
          </div>
        </div>

        <div className="container">
          <h3>어디에 쓰는 것인가요?</h3>

          <dl>
            <dt>인쇄소 예약 시스템</dt>
            <dd>
              회원가입과 함께 선불 포인트만 충전 해 놓으면 언제나 쉽게 프린트 예약을 할 수 있어요.<br/>
              여러분들이 하실 일은 직접 인쇄소를 들려 찾아가는 것 뿐!!<br/>
              더 이상 인쇄를 기다리느라 줄을 설 필요도, 수업 직전에 다급할 필요도 없습니다~<br/>
            </dd>
          </dl>

          <h3>어떻게 사용하나요?</h3>
          <dl>
            <dt>사용법</dt>
            <dd>
              <ol>
                <li>회원 가입을하고 <LinkContainer to="copon">쿠폰번호</LinkContainer>를 입력해요.</li>
                <li>출력할 PDF를 준비한다. 다른 문서의 경우 pdf로 변환!</li>
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
        </div>
        {!user && <Register />}
      </div>
    );
  }
}
