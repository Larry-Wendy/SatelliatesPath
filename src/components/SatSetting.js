import React, {Component} from 'react';
import {Form, Button, InputNumber} from 'antd';

class SatSetting extends Component {
    showSatellite = values => {
        console.log('Received values of form: ', values);
        this.props.onShow(values);
    }

    render() {
        return (
            <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={this.showSatellite}
            >

                <Form.Item
                    label="Longitude(degrees)"
                    name="longitude"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Longitude",
                        }
                    ]}
                >
                    <InputNumber min={-180} max={180}
                                 style={{width: "100%"}}
                                 placeholder="Please input Longitude"
                    />
                </Form.Item>

                <Form.Item
                    label="Latitude(degrees)"
                    name="latitude"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Latitude",
                        }
                    ]}
                >
                    <InputNumber min={-90} max={90}
                                 style={{width: "100%"}}
                                 placeholder="Please input Latitude"
                    />
                </Form.Item>

                <Form.Item
                    label="Altitude(meters)"
                    name="elevation"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Altitude",
                        }
                    ]}
                >
                    <InputNumber min={-413} max={8850}
                                 style={{width: "100%"}}
                                 placeholder="Please input Altitude"
                    />
                </Form.Item>

                <Form.Item
                    label="Radius(degrees)"
                    name="altitude"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Radius",
                        }
                    ]}
                >
                    <InputNumber min={0} max={90}
                                 style={{width: "100%"}}
                                 placeholder="Please input Radius"
                    />
                </Form.Item>

                <Form.Item
                    label="Duration(mins)"
                    name="duration"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Duration",
                        }
                    ]}
                >
                    <InputNumber min={0} max={90}
                                 style={{width: "100%"}}
                                 placeholder="Please input Duration"
                    />
                </Form.Item>

                <Form.Item className="show-nearby">
                    <Button type="primary" htmlType="submit" style={{textAlign: "center"}}>
                        Find Satellite
                    </Button>
                </Form.Item>

            </Form>
        );
    }
}

export default SatSetting;