import { Typography } from "antd"
import { styles } from "./PostDetail"

const PostDescription = ({ description }: { description: string }) => (
    <div style={styles.box}>
        <Typography style={styles.typography}> Description </Typography>
        <Typography style={{ textAlign: "left", margin: "5px" }}> {description} </Typography>
    </div>
)

export default PostDescription