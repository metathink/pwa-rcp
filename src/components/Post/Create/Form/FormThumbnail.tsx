import { useState } from 'react';
import { Button, Form, FormInstance, Image, Upload, UploadFile, message } from 'antd';
import { UploadOutlined, CloseOutlined } from '@ant-design/icons';

const FormThumbnail = ({ form }: { form: FormInstance<any> }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleChange = (info: { file: UploadFile; fileList: UploadFile[] }) => {
        const { status } = info.file;
        if (status === 'done' || status === 'removed') {
            setImageUrl(null); // 画像が削除された場合、URLをリセット


            form.setFieldsValue({ thumbnail: null });

        } else if (status === 'uploading') {
            return; // アップロード中は何もしない
        } else if (status === 'error') {
            message.error('Image upload failed.');
        }
    };


    const beforeUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const { result } = e.target as FileReader;
            if (typeof result === 'string') {
                setImageUrl(result);
                // フォームの値としてサムネイルURLを設定
                // form.setFieldsValue({ thumbnail: result });

                // Base64からBlobへの変換
                const byteString = atob(result.split(',')[1]);
                const mimeString = result.split(',')[0].split(':')[1].split(';')[0];
                const arrayBuffer = new Uint8Array(byteString.length);
                for (let i = 0; i < byteString.length; i++) {
                    arrayBuffer[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([arrayBuffer], { type: mimeString });

                // フォームの値としてサムネイルのBlobを設定
                form.setFieldsValue({ thumbnail: blob });
            }
        };
        reader.readAsDataURL(file);
        return false; // 自動アップロードを防ぐ
    };

    const handleRemoveImage = () => {
        setImageUrl(null);
        
        form.setFieldsValue({ thumbnail: null }); // サムネイルを削除
    };

    return (
        <Form.Item name="thumbnail" label="Thumbnail">
            <div style={{ textAlign: 'center', margin: '10px' }}>
                <Upload
                    accept="image/*"
                    showUploadList={false}
                    onChange={handleChange}
                    beforeUpload={beforeUpload}
                >
                    <Button>
                        <UploadOutlined onClick={(e) => e.preventDefault()} />
                        Image
                    </Button>
                </Upload>

                {imageUrl && (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <Image
                            width="90%"
                            src={imageUrl}
                            alt="Selected Thumbnail"
                            style={{ margin: 10 }}
                        />
                        <CloseOutlined
                            onClick={handleRemoveImage}
                            style={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                cursor: 'pointer',
                                color: 'red',
                                fontSize: '20px',
                            }}
                        />
                    </div>
                )}
            </div>
        </Form.Item>
    )
}

export default FormThumbnail