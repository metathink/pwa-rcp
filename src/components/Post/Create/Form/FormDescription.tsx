import { Form, Input } from "antd"

const FormDescription = () => (
    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
    </Form.Item>
)

export default FormDescription