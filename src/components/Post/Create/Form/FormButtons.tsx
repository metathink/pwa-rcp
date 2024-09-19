import { Button, Form, FormInstance, Space } from "antd"



const FormButtons = ({ form }: { form: FormInstance<any> }) => {

    const onReset = () => {
        form.resetFields();
    }

    return (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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