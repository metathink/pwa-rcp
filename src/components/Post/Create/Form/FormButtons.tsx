import { Button, Form, FormInstance, Space } from "antd"



const FormButtons = ({ form }: { form: FormInstance<any> }) => {

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form.Item style={{ textAlign: 'center' }}>
            <Space>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Space>
        </Form.Item>
    )
}


export default FormButtons