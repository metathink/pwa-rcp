import { Form, Input } from "antd"


const EditFormTitle = () => {

    return (
        <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
        >
            <Input />
        </Form.Item>
    )
}

export default EditFormTitle