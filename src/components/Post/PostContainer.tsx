import { Content } from "antd/es/layout/layout"
import { Post } from "../../types/types"
import PostListView from "./ListView/PostListView"
import PostDetail from "./Detail/PostDetail"
import PostCreate from "./Create/PostCreate"

const PostContainer = ({ view, setView, posts }: {
    view: string,
    setView: React.Dispatch<React.SetStateAction<string>>,
    posts: Post[]
}) => {
    return (
        <Content style={{ padding: '20px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            {view === "list" && <PostListView setView={setView} posts={posts} />}
            {view === "detail" && <PostDetail view={view} />}
            {view === "create" && <PostCreate />}
        </Content>
    );
}

export default PostContainer