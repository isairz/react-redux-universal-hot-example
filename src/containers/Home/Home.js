import React, { Component } from 'react';
import config from '../../config';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <div className={styles.masthead}>
          <div className="container">
            <div className={styles.logo}>
              <p>
                <img src={logoImage}/>
              </p>
            </div>
            <h1>{config.app.title}</h1>

            <h2>{config.app.description}</h2>
          </div>
        </div>

        <div className="container">
          <h3>어디에 쓰는 것인가요?</h3>

          <dl>
            <dt>인쇄의 편리를 위한 시스템입니다</dt>
            <dd>
              아침마다 인쇄실에서 줄을 서서 과제를 출력하고 ppt를 출력하는 번거로움을 줄이고자 기획하였습니다.
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}
