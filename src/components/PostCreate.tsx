import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Col, Row } from 'antd';
import TextArea from 'antd/es/input/TextArea';


const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

import { Content } from "antd/es/layout/layout"
import { Post } from '../types/types';
import { useEffect, useState } from 'react';

const PostCreate = () => {
    const [post, setPost] = useState<Post>({
        title: "",
        description: "",
        createdAt: new Date(),
        items: [],
        referenceUrls: [],
    })
    const [form] = Form.useForm();

    const onFinish = (values: Post) => {
        const data = {
            title: values.title,
            description: values.description,
            createdAt: new Date(),
            items: values.items,
            referenceUrls: values.referenceUrls,
        }
        setPost(data)
    };

    const onReset = () => {
        form.resetFields();
    };

    useEffect(() => {
        console.log(post)
    }, [post])

    return (
        <>
            <Content style={{ padding: '10px', margin: "10px", backgroundColor: "#fff" }} >
                <Row style={{ textAlign: "center" }}>
                    <Col span={24}>
                        <h3>PostCreate</h3>
                    </Col>
                </Row>

                <Form
                    form={form}
                    onFinish={onFinish}
                >

                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} style={{ display: 'flex', marginBottom: 8, width: '100%', justifyContent: 'space-between' }} >
                                        <Form.Item
                                            {...restField}
                                            label={"Item"}
                                            name={[name, 'item']}
                                            rules={[{ required: true, message: 'Please input an item!' }]}
                                            style={{ flex: 1 }}
                                        >
                                            <Input placeholder="Enter Item" />
                                        </Form.Item>

                                        <Form.Item
                                            label={"Group"}
                                            name={[name, 'group']}
                                            rules={[{ required: true, message: 'Please select a group!' }]}
                                            style={{ marginLeft: 16 }}
                                        >
                                            <Select placeholder="Select Group" style={{ width: 120 }}>
                                                <Select.Option value="group1">Group 1</Select.Option>
                                                <Select.Option value="group2">Group 2</Select.Option>
                                                <Select.Option value="group3">Group 3</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                ))}

                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                        style={{ width: '100%', textAlign: "center" }}
                                    >
                                        Add Item
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.List name="referenceUrls">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} style={{ display: 'flex', marginBottom: 8, width: '100%', justifyContent: 'space-between' }} >
                                        <Form.Item
                                            {...restField}
                                            name={[name]}
                                            noStyle
                                        >
                                            <Input placeholder="Enter URL" style={{ marginRight: "8px" }} />
                                        </Form.Item>
                                        <MinusCircleOutlined
                                            onClick={() => remove(name)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                        style={{ width: '100%', textAlign: "center", marginRight: "8px" }}
                                    >
                                        Add Reference URL
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>

                </Form>

            </Content >

        </>
    )
}

export default PostCreate