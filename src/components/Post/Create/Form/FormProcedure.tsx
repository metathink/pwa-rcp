import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Upload } from "antd";
import { useState } from "react";
import { UploadFile } from "antd/es/upload/interface";

const FormProcedure = ({ form }: { form: any }) => {
    const [imageUrls, setImageUrls] = useState<{ [key: number]: string | null }>({});

    const handleChange = (info: { file: UploadFile, fileList: UploadFile[] }, index: number) => {
        const { status } = info.file;

        if (status === "done" || status === "removed") {
            if (status === "removed") {
                setImageUrls((prev) => ({ ...prev, [index]: null }));
                form.setFieldsValue({
                    procedure: form.getFieldValue('procedure').map((p: any, i: number) =>
                        i === index ? { ...p, procedureImage: '' } : p
                    )
                });
            }
        } else if (status === 'uploading') {
            return;
        } else if (status === 'error') {
            message.error('Image upload failed.');
        }
    };

    const beforeUpload = (file: File, index: number) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const { result } = e.target as FileReader;

            if (typeof result === "string") {
                const compressedImage = await compressImage(result, 800, 800);
                setImageUrls(prev => ({ ...prev, [index]: compressedImage }));

                const byteString = atob(compressedImage.split(",")[1]);
                const mimeString = compressedImage.split(',')[0].split(':')[1].split(';')[0];
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const intArray = new Uint8Array(arrayBuffer);

                for (let i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([intArray], { type: mimeString });
                form.setFieldsValue({
                    procedure: form.getFieldValue('procedure').map((p: any, i: number) =>
                        i === index ? { ...p, procedureImage: blob } : p
                    )
                });
            }
        };
        reader.readAsDataURL(file);
        return false;
    };

    const compressImage = (base64Str: string, maxWidth: number, maxHeight: number): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const img = new Image();
            img.onerror = () => reject(new Error('Failed to load the image.'));
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                let { width, height } = img;
                if (width > maxWidth) {
                    height = Math.floor((height * maxWidth) / width);
                    width = maxWidth;
                } else if (height > maxHeight) {
                    width = Math.floor((width * maxHeight) / height);
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                ctx?.drawImage(img, 0, 0, width, height);

                const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
                resolve(compressedBase64);
            };
            img.src = base64Str;
        });
    };

    const handleRemoveImage = (fieldIndex: number) => {
        setImageUrls((prev: any) => ({ ...prev, [fieldIndex]: '' }));
        form.setFieldsValue({
            procedure: form.getFieldValue('procedure').map((p: any, i: number) => (
                i === fieldIndex ? { ...p, procedureImage: '' } : p
            ))
        });
    };

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
                                        onChange={(info) => handleChange(info, index)}
                                        beforeUpload={(file) => beforeUpload(file, index)}
                                    >
                                        <Button icon={<UploadOutlined />}>Image</Button>
                                    </Upload>
                                    {imageUrls[index] && (
                                        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
                                            <img src={imageUrls[index]} alt="Procedure" style={{ width: '100px', height: 'auto' }} />
                                            <Button type="text" style={{ color: 'red' }} onClick={() => handleRemoveImage(index)}>Remove</Button>
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
    );
};

export default FormProcedure;
