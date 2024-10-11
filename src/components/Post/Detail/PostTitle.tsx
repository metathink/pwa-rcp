import { styles } from "./PostDetail"

const PostTitle = ({ title }: { title: string }) => (
    <h2 style={styles.typography}>{title}</h2>
)

export default PostTitle