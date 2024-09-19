import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const FormProcedure = () => (
    <Form.List name="procedure">
        {(fields, { add, remove }) => (
            <>
                {fields.map(({ key, name, ...restField }, index) => (
                    <div key={key} style={{ display: 'flex', marginBottom: 8, width: '100%', justifyContent: 'space-between' }} >
                        <span style={{ marginRight: 8 }}>{index + 1}.</span>
                        <Form.Item
                            {...restField}
                            name={[name]}
                            noStyle
                        >
                            <Input.TextArea rows={4} placeholder="Enter Procedure" style={{ marginRight: "8px" }} />
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
                        Add Procedure
                    </Button>
                </Form.Item>
            </>
        )}
    </Form.List>
)

export default FormProcedure