import React, { Component } from 'react';
import { List, Radio, Checkbox, Input, Row, Button } from 'antd';
import { connect } from "unistore/react";
import { actions } from '../../service/store';
import styles from './index.less';

class FillPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: '标题',
      formList: [{
        title: '标题',
        type: 'radio',
        options: [{
          value: '选项1'
        }, {
          value: '选项2'
        }]
      }, {
        title: '标题',
        type: 'checkbox',
        options: [{
          value: '选项1'
        }, {
          value: '选项2'
        }],
      }, {
        title: '标题',
        type: 'input',
      }],
    };
  }

  render() {
    const { formTitle, formList } = this.state;
    const optionStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}></div>
        <div className={styles.content}>
          <p className={styles['form-title']}>{formTitle}</p>
          <List
            style={{padding: '10px 50px'}}
            itemLayout="horizontal"
            dataSource={formList}
            renderItem={(item, formIndex) => (
              <List.Item>
                <List.Item.Meta
                  title={(
                    <div className={styles.title}>
                      {formIndex + 1}. {item.title}
                    </div>
                  )}
                  description={(
                    <div className={styles.desc}>
                      {
                        item.type === 'input'
                        ? (<Input style={{width: 200}} />)
                        : item.type === 'radio'
                        ? (
                          <Radio.Group>
                            {
                              item.options.map((option,index) => (
                                <Radio style={optionStyle} value={index}>
                                  {option.value}
                                </Radio>
                              ))
                            }
                          </Radio.Group>
                        )
                        : (
                          <Checkbox.Group>
                            {
                              item.options.map((option,index) => (
                                <Row>
                                  <Checkbox style={optionStyle} value={index}>{option.value}</Checkbox>
                                </Row> 
                              ))
                            }
                          </Checkbox.Group>
                        )
                      }
                    </div>
                  )}
                />
            </List.Item>
            )}
          />
          <div className={styles.submit}>
            <Button type="primary">提交</Button>
          </div>
          <div className={styles.footer}>Powered By WMX</div>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)((state) => (
  <FillPage {...state}/>  
));
