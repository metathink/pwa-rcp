import { useEffect, useState } from "react";
import { Image } from "antd";

const PostImage = ({ thumbnail }: { thumbnail:  Blob | undefined | null }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (thumbnail instanceof Blob) {
            // Blobの場合はURLに変換
            const url = URL.createObjectURL(thumbnail);
            setImageUrl(url);

            // メモリリーク防止のためにクリーンアップ
            return () => {
                URL.revokeObjectURL(url);
            };
        } else if (typeof thumbnail === 'string') {
            // stringの場合はそのまま使用
            setImageUrl(thumbnail);
        }
    }, [thumbnail]);

    return (
        <>
            {imageUrl && (
                <Image
                    width="90%"
                    src={imageUrl}
                    alt="Selected Thumbnail"
                    style={{ margin: 10 }}
                />
            )}
        </>
    );
};

export default PostImage;
