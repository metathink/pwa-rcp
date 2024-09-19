import { Form, Input } from "antd"

const FormTitle = () => (
    <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true }]}
    >
        <Input />
    </Form.Item>
)

export default FormTitle