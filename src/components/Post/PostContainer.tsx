import { Content } from "antd/es/layout/layout"
import { Post } from "../../types/types"
import PostListView from "./ListView/PostListView"
import PostDetail from "./Detail/PostDetail"
import PostCreate from "./Create/PostCreate"

const PostContainer = ({ view, setView, posts, detailPost, setDetailPost }: {
    view: string,
    setView: React.Dispatch<React.SetStateAction<string>>,
    posts: Post[],
    detailPost: Post | undefined,
    setDetailPost: React.Dispatch<React.SetStateAction<Post | undefined>>
}) => {
    return (
        <Content style={{ padding: '20px', width: '100%', margin: '0 10px' }}>
            {view === "list" && <PostListView
                setView={setView}
                posts={posts}
                setDetailPost={setDetailPost} />}
            {view === "detail" && <PostDetail detailPost={detailPost} />}
            {view === "create" && <PostCreate setView={setView} />}
        </Content>
    );
}

export default PostContainer