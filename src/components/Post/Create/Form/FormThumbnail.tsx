import { useState } from 'react';
import { Button, Form, FormInstance, Upload, UploadFile, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ImagePreview from './ImagePreview';

const FormThumbnail = ({ form }: { form: FormInstance<any> }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleChange = (info: { file: UploadFile; fileList: UploadFile[] }) => {
        const { status } = info.file;
        if (status === 'done' || status === 'removed') {
            setImageUrl(null); // 画像が削除された場合、URLをリセット
        } else if (status === 'uploading') {
            return; // アップロード中は何もしない
        } else if (status === 'error') {
            message.error('Image upload failed.');
        }
    };

    const beforeUpload = (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const { result } = e.target as FileReader;
            if (typeof result === 'string') {
                // 画像を圧縮するときにBase64データを渡す
                const compressedImage = await compressImage(result, 800, 800); // 引数を指定
                setImageUrl(compressedImage);

                // 圧縮されたBase64画像をBlobに変換してIndexedDBに保存
                const byteString = atob(compressedImage.split(',')[1]);
                const mimeString = compressedImage.split(',')[0].split(':')[1].split(';')[0];
                const arrayBuffer = new ArrayBuffer(byteString.length);
                const intArray = new Uint8Array(arrayBuffer);

                for (let i = 0; i < byteString.length; i++) {
                    intArray[i] = byteString.charCodeAt(i);
                }

                const blob = new Blob([intArray], { type: mimeString });

                // フォームの値としてサムネイルBlobを設定
                form.setFieldsValue({ thumbnail: blob }); // IndexedDBに保存するためにBlobを設定
            }
        };
        reader.readAsDataURL(file);
        return false; // 自動アップロードを防ぐ
    };


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

                <ImagePreview imageUrl={imageUrl} handleRemoveImage={handleRemoveImage} />
            </div>
        </Form.Item>
    );
};

export default FormThumbnail;
