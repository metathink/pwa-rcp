import { List, Typography } from "antd"
import { styles } from "./PostDetail"

const PostReferenceUrlList = ({ urls }: { urls: string[] | undefined }) => (
    <div style={styles.box}>
        <Typography style={styles.typography}>Reference URLs</Typography>
        <List
            bordered
            dataSource={urls}
            renderItem={(url) => (
                <List.Item>
                    <a href={url} style={{ color: "gray" }} target="_blank" rel="noopener noreferrer">{url}</a>
                </List.Item>
            )}
        />
    </div>
)

export default PostReferenceUrlList