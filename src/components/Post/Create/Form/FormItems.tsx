import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select } from "antd"

const FormItems = () => (
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
)

export default FormItems