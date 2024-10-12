import { Image } from "antd"
const PostImage = ({ thumbnail }: { thumbnail: string | undefined }) => {
    return (
        <>
            {thumbnail && (
                <>
                    <Image
                        width="90%"
                        src={thumbnail}
                        alt="Selected Thumbnail"
                        style={{ margin: 10 }}
                    />
                </>
            )}
        </>
    )
}

export default PostImage

