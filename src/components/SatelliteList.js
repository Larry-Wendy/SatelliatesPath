import React, {Component} from 'react';
import { List, Avatar, Button, Checkbox, Spin } from 'antd';
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         selected: []
    //     };
    // }

    onChange = (e) => {
        const { dataInfo, checked } = e.target; // 刚刚点的
        const { selected } = this.props; // 点之前
        const list = this.addOrRemove(dataInfo, checked, selected); // 生成新的list
        //this.setState({ selected: list })
        this.props.updateSelected(list); // 盖住旧的
    }

    addOrRemove = (item, status, list) => {
        const found = list.some( entry => entry.satid === item.satid); //some: 检查list中是否有元素通过定义的函数测试，已选卫星中没有现在点的，found为false
        if(status && !found){ // 新选并找不到
            list=[...list, item]
        }

        if(!status && found){ // 反选并能找到
            list = list.filter( entry => {
                return entry.satid !== item.satid;
            });
        }
        return list;
    }

    // onShowSatMap = () =>{
    //     this.props.onShowMap(this.state.selected);
    // }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        //const { selected } = this.state;

        return (
            <div className="sat-list-box">
                {/* <Button className="sat-list-btn"
                        type="primary"
                        disabled={ selected.length === 0}
                        onClick={this.onShowSatMap}
                >Track</Button>
                <hr/> */}

                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large" />
                        </div>
                        :
                        <List
                            className="sat-list"
                            itemLayout="horizontal"
                            size="small"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Checkbox dataInfo={item} onChange={this.onChange}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src={satellite} />}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />

                                </List.Item>
                            )}
                        />
                }
            </div>
        );
    }
}

export default SatelliteList;