import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Form, Input, Upload } from "antd"
import { useState } from "react"


const FormProcedure = ({ form }: { form: any }) => {
    const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

    const handleImageUpload = async (file: File, fieldIndex: number) => {
        const base64 = await readFileAsDataURL(file);
        const compressedImage = await resizeImage(base64, 800, 800);

        setImageUrls((prev: any) => ({ ...prev, [fieldIndex]: compressedImage }));

        // Update the form with the resized image
        form.setFieldsValue({
            procedure: form.getFieldValue('procedure').map((p: any, i: number) =>
                i === fieldIndex ? { ...p, procedureImage: compressedImage } : p
            )
        });

        return false; // Prevent default upload behavior
    };

    // FileReader を使ってファイルを DataURL に変換する非同期関数
    const readFileAsDataURL = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const { result } = e.target as FileReader;
                if (typeof result === 'string') {
                    resolve(result);
                } else {
                    reject(new Error('Failed to read file as data URL'));
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    // 画像をリサイズする非同期関数
    const resizeImage = (base64: string, maxWidth: number, maxHeight: number): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = base64;
            img.onload = () => {
                let { width, height } = img;

                // Maintain aspect ratio while resizing
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                }
                else if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, width, height);
                    const compressedImage = canvas.toDataURL('image/jpeg'); // You can change the format if needed
                    resolve(compressedImage);
                } else {
                    reject(new Error('Failed to get canvas context'));
                }
            };
            img.onerror = (error) => reject(error);
        });
    };

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
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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

