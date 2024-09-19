import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

import { Content } from "antd/es/layout/layout"

const PostCreate = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
    };

    const onReset = () => {
        form.resetFields();
    };

    return (

        <Content style={{ padding: '10px', margin: "10px", backgroundColor: "#fff" }}>
            <p style={{ textAlign: "center" }}>
                PostCreate
            </p>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <div style={{ width: "90%" }}>
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true }]}
                        style={{ width: '90%' }}
                    >
                        <Input />
                    </Form.Item>

                </div>

                <div style={{ width: "90%" }}>

                    {/* Form.List for dynamic items and their group selection */}
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Space
                                        key={field.key}
                                        style={{ display: 'flex', marginBottom: 8, justifyContent: 'center' }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            label={"Item"}
                                            name={[field.name, 'item']}
                                            rules={[{ required: true, message: 'Please input an item!' }]}
                                        >
                                            <Input placeholder="Enter Item" />
                                        </Form.Item>

                                        <Form.Item
                                            label={"Group"}
                                            name={[field.name, 'group']}
                                            rules={[{ required: true, message: 'Please select a group!' }]}
                                        >
                                            <Select placeholder="Select Group" style={{ width: 120 }}>
                                                <Select.Option value="group1">Group 1</Select.Option>
                                                <Select.Option value="group2">Group 2</Select.Option>
                                                <Select.Option value="group3">Group 3</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                        style={{ width: '60%' }}
                                    >
                                        Add Item
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </div>

                <div style={{ width: "90%" }}>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <TextArea rows={4} />
                    </Form.Item>
                </div>


                <div style={{ width: "90%" }}>
                    {/* Form.List for dynamic reference URL inputs */}
                    <Form.List name="referenceUrls">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Form.Item
                                        label={"Reference URL"}
                                        key={field.key}
                                    // required={index === 0} // Only the first URL is required
                                    >
                                        <Space align="baseline">
                                            <Form.Item
                                                name={[field.name]}
                                                noStyle
                                            >
                                                <Input placeholder="Enter URL" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Space>
                                    </Form.Item>
                                ))}
                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                        style={{ width: '60%' }}
                                    >
                                        Add Reference URL
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </div>

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
    )
}

export default PostCreate