import React, { Component } from 'react';
import { Provider, connect } from "unistore/react";
import styles from './index.css';
import { store } from '../service/store';

function BasicLayout(props) {
  console.log('props=', props);
  const pathname = props.location.pathname;
 
  if (pathname === '/login' || pathname === '/regist') {
    return (
      <Provider store={store}>
        <div className={styles.normal}>
          {props.children}
        </div>
      </Provider>
    );
  } else {
    return (
      <Layout {...props}/>
    );
  }
}

class Layout extends Component {
  constructor(props) {
    super(props);
    const state = store.getState();
    console.log('state=', state);
    if (!state.isLogin) {
      props.history.push('/login');
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <Provider store={store}>
        <div className={styles.normal}>
          <div>header</div>
          {this.props.children}
          <div>footer</div>
        </div>
      </Provider>
    );
  }
}

// const App = connect(state => {console.log('state=', state); return state}, actions)(({ count, increment }) => (
//   <div>
//     <p>Count: {count}</p>
//     <button onClick={increment}>Increment</button>
//   </div>
// ));

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   root
// );
export default BasicLayout;
