import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"

const FormReferenceUrls = () => (
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
)

export default FormReferenceUrls