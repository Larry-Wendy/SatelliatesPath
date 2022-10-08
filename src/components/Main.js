import React, {Component} from 'react';
import { Row, Col, List } from 'antd';
import axios from "axios";

import SatSetting from './SatSetting';
import SatelliteList from './SatelliteList';
import { SAT_API_KEY, BASE_URL, NEARBY_SATELLITE, STARLINK_CATEGORY } from "../constants";
import WorldMap from './WorldMap';

class Main extends Component {
    state = {
        setting: {},
        satInfo: {},
        satList: [],
        isLoadingList: false
    }

    showNearbySatellite = (setting) => {        //给satSetting调用并把用户输入传入state of setting
        console.log('show nearby')
        this.setState({
            satList: [],
            setting: setting
        })
        this.fetchSatellite(setting);
    }

    fetchSatellite = (setting) => {
        console.log("fetching")
        const { latitude, longitude, elevation, altitude } = setting;
        const url = `${BASE_URL}/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        this.setState({
            isLoadingList: true
        });

        axios.get(url)
            .then( res => {
                console.log(res.data);      
                this.setState({
                    satInfo: res.data,            //给SatelliteList.js拿到API返回卫星信息放入state of satInfo
                    isLoadingList: false
                })
            })
            .catch( error => {
                this.setState({
                    isLoadingList: false       //ture的话有error会一直load转圈
                });
                console.log('err in fetch satellite -> ', error);
            })
    }

    // showMap = (selected) => {
    //     this.setState(preState => ({  /** （=>左边）旧state和（=>右边）新state之间有推导关系时，出于安全考虑做了大量的拷贝 */
    //         ...preState,
    //         satList: [...selected]
    //     }));
    // };

    updateSelected = (list) => {   //list是 satellitelist里调用时传进来的
        this.setState({
            satList : list,
        })
    }

    render() {
        const { satInfo, isLoadingList, satList, setting } = this.state;
        /* SatSetting onShow={this.showNearbySatellite}, 传递函数过来，props的名字看左边，看左边了解函数什么时候执行（when）
           去SatSetting找onShow。看右边了解函数做什么事情，看定义 */
        return (
            <Row className='main'>
                <Col span={8} className="left-side">
                    <SatSetting onShow={this.showNearbySatellite} />
                    <SatelliteList satInfo={satInfo}
                                   isLoad={isLoadingList}
                                   selected={this.state.satList}
                                   updateSelected={this.updateSelected}
                    />
                </Col>
                <Col span={16} className="right-side">
                    <WorldMap satData={satList} observerData={setting} />
                </Col>
            </Row>
        );
    }
}

export default Main;
