import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, Upload } from "antd"
import { useState } from "react"


const FormProcedure = ({ form }: { form: any }) => {
    const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

    const handleImageUpload = (file: File, fieldIndex: number) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            const { result } = e.target as FileReader;
            if (typeof result === 'string') {
                setImageUrls((prev: any) => ({ ...prev, [fieldIndex]: result }));
                // フォームの特定の手順フィールドに`procedureImage`を設定
                form.setFieldsValue({
                    procedure: form.getFieldValue('procedure').map((p: any, i: number) => (
                        i === fieldIndex ? { ...p, procedureImage: result } : p
                    ))
                })
            }
        }
        reader.readAsDataURL(file)
        return false // アップロードを中断して手動処理
    }

    const removeImage = (fieldIndex: number) => {
        setImageUrls((prev: any) => ({ ...prev, [fieldIndex]: '' }));
        form.setFieldsValue({
            procedure: form.getFieldValue('procedure').map((p: any, i: number) => (
                i === fieldIndex ? { ...p, procedureImage: '' } : p
            ))
        })
    }

    return (
        <Form.List name="procedure">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <div key={key} style={{ marginBottom: 8 }}>
                            <div style={{ display: 'flex', marginBottom: 8, justifyContent: 'space-between' }}>
                                <span style={{ marginRight: 8 }}>{index + 1}.</span>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'procedureStr']}
                                    noStyle
                                    rules={[{ required: true, message: 'Please enter the procedure.' }]}
                                >
                                    <Input.TextArea rows={4} placeholder="Enter Procedure" style={{ marginRight: "8px", width: "70%" }} />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} style={{ cursor: 'pointer' }} />
                            </div>

                            <Form.Item name={[name, 'procedureImage']} noStyle>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Upload
                                        accept="image/*"
                                        showUploadList={false}
                                        beforeUpload={(file) => handleImageUpload(file, index)}
                                    >
                                        <Button icon={<UploadOutlined />}>Image</Button>
                                    </Upload>
                                    {imageUrls[index] && (
                                        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
                                            <img src={imageUrls[index]} alt="Procedure" style={{ width: '100px', height: 'auto' }} />
                                            <Button type="text" style={{ color: 'red' }} onClick={() => removeImage(index)}>Remove</Button>
                                        </div>
                                    )}
                                </div>
                            </Form.Item>
                        </div>
                    ))}
                    <Form.Item>
                        <Button
                            type="dashed"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                            style={{ width: '100%', textAlign: "center" }}
                        >
                            Add Procedure
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>
    )
}

export default FormProcedure

// const FormProcedure = () => (
//     <Form.List name="procedureStr">
//         {(fields, { add, remove }) => (
//             <>
//                 {fields.map(({ key, name, ...restField }, index) => (
//                     <div key={key} style={{ display: 'flex', marginBottom: 8, width: '100%', justifyContent: 'space-between' }} >
//                         <span style={{ marginRight: 8 }}>{index + 1}.</span>
//                         <Form.Item
//                             {...restField}
//                             name={[name]}
//                             noStyle
//                         >
//                             <Input.TextArea rows={4} placeholder="Enter Procedure" style={{ marginRight: "8px" }} />
//                         </Form.Item>
//                         <MinusCircleOutlined
//                             onClick={() => remove(name)}
//                             style={{ cursor: 'pointer' }}

//                         />
//                     </div>
//                 ))}
//                 <Form.Item>
//                     <Button
//                         type="dashed"
//                         onClick={() => add()}
//                         icon={<PlusOutlined />}
//                         style={{ width: '100%', textAlign: "center", marginRight: "8px" }}
//                     >
//                         Add Procedure
//                     </Button>
//                 </Form.Item>
//             </>
//         )}
//     </Form.List>
// )