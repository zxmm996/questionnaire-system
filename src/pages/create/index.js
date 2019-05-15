import React, {Component } from 'react';
import { connect } from "unistore/react";
import { actions } from '../../service/store';
import styles from './index.less';

 class Create extends Component {
  render() {
    return (
      <div className={styles.normal}>
        <div className={styles.left}>left</div>
        <div className={styles.right}>right</div>
      </div>
    );
  }
}

export default connect(state => state, actions)((state) => (
  <Create {...state}/>  
));