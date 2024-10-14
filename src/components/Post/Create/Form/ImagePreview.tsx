import { CloseOutlined } from "@ant-design/icons"
import { Image } from "antd"

const ImagePreview = ({ imageUrl, handleRemoveImage }:
    {
        imageUrl: string | null,
        handleRemoveImage: () => void
    }) => {
    return (
        <>
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
        </>
    )
}

export default ImagePreview