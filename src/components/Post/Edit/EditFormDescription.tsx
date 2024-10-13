import { Form, Input } from "antd"

const EditFormDescription = () => {
    return (
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
    </Form.Item>
    )
}

export default EditFormDescription