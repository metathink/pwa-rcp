// import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons"
// import { Button, Form, Input, Upload } from "antd"
// import { useState } from "react"


// const FormProcedure = ({ form }: { form: any }) => {
//     const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

//     const handleImageUpload = (file: File, fieldIndex: number) => {
//         const reader = new FileReader()
//         reader.onload = (e) => {
//             const { result } = e.target as FileReader;
//             if (typeof result === 'string') {
//                 setImageUrls((prev: any) => ({ ...prev, [fieldIndex]: result }));
//                 // フォームの特定の手順フィールドに`procedureImage`を設定
//                 form.setFieldsValue({
//                     procedure: form.getFieldValue('procedure').map((p: any, i: number) => (
//                         i === fieldIndex ? { ...p, procedureImage: result } : p
//                     ))
//                 })
//             }
//         }
//         reader.readAsDataURL(file)
//         return false // アップロードを中断して手動処理
//     }

//     const removeImage = (fieldIndex: number) => {
//         setImageUrls((prev: any) => ({ ...prev, [fieldIndex]: '' }));
//         form.setFieldsValue({
//             procedure: form.getFieldValue('procedure').map((p: any, i: number) => (
//                 i === fieldIndex ? { ...p, procedureImage: '' } : p
//             ))
//         })
//     }

//     return (
//         <Form.List name="procedure">
//             {(fields, { add, remove }) => (
//                 <>
//                     {fields.map(({ key, name, ...restField }, index) => (
//                         <div key={key} style={{ marginBottom: 8 }}>
//                             <div style={{ display: 'flex', marginBottom: 8, justifyContent: 'space-between' }}>
//                                 <span style={{ marginRight: 8 }}>{index + 1}.</span>
//                                 <Form.Item
//                                     {...restField}
//                                     name={[name, 'procedureStr']}
//                                     noStyle
//                                     rules={[{ required: true, message: 'Please enter the procedure.' }]}
//                                 >
//                                     <Input.TextArea rows={4} placeholder="Enter Procedure" style={{ marginRight: "8px", width: "70%" }} />
//                                 </Form.Item>
//                                 <MinusCircleOutlined onClick={() => remove(name)} style={{ cursor: 'pointer' }} />
//                             </div>

//                             <Form.Item name={[name, 'procedureImage']} noStyle>
//                                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                                     <Upload
//                                         accept="image/*"
//                                         showUploadList={false}
//                                         beforeUpload={(file) => handleImageUpload(file, index)}
//                                     >
//                                         <Button icon={<UploadOutlined />}>Image</Button>
//                                     </Upload>
//                                     {imageUrls[index] && (
//                                         <div style={{ position: 'relative', display: 'inline-block', marginLeft: '10px' }}>
//                                             <img src={imageUrls[index]} alt="Procedure" style={{ width: '100px', height: 'auto' }} />
//                                             <Button type="text" style={{ color: 'red' }} onClick={() => removeImage(index)}>Remove</Button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </Form.Item>
//                         </div>
//                     ))}
//                     <Form.Item>
//                         <Button
//                             type="dashed"
//                             onClick={() => add()}
//                             icon={<PlusOutlined />}
//                             style={{ width: '100%', textAlign: "center" }}
//                         >
//                             Add Procedure
//                         </Button>
//                     </Form.Item>
//                 </>
//             )}
//         </Form.List>
//     )
// }

// export default FormProcedure


import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";

const FormProcedure = ({ form }: { form: any }) => {
    const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

    const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 800) => {
        return new Promise<string>((resolve, reject) => {
            const img = new Image();

            // ロードエラーが発生した場合の処理
            img.onerror = () => {
                reject(new Error('Failed to load the image.'));
            };

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d')!;

                // 画像の比率を保ちながら最大サイズを調整
                let { width, height } = img;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.floor((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else if (height > maxHeight) {
                    width = Math.floor((width * maxHeight) / height);
                    height = maxHeight;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                // 圧縮されたBase64画像を取得
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 圧縮率70%でJPEGとして出力
                resolve(compressedBase64);
            };

            img.src = base64Str; // onloadイベント後にsrcを設定
        });
    };

    const handleImageUpload = (file: File, fieldIndex: number) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const { result } = e.target as FileReader;
            if (typeof result === 'string') {
                const compressedImage = await compressImage(result, 800, 800); // 圧縮処理

                setImageUrls((prev: any) => ({ ...prev, [fieldIndex]: compressedImage }));

                // フォームの特定の手順フィールドに`procedureImage`を設定
                form.setFieldsValue({
                    procedure: form.getFieldValue('procedure').map((p: any, i: number) => (
                        i === fieldIndex ? { ...p, procedureImage: compressedImage } : p
                    ))
                });
            }
        };
        reader.readAsDataURL(file);
        return false; // アップロードを中断して手動処理
    };

    const removeImage = (fieldIndex: number) => {
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
    );
};

export default FormProcedure;
