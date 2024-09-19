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

    switch (view) {
        case "list":
            return (
                <Content style={{ padding: '20px', margin: '20px' }}> {/* Adjust the margin as needed */}
                    <PostListView setView={setView} posts={posts} />
                </Content>
            )
        case "detail":
            return (
                <PostDetail view={view} />
            )
        case "create":
            return (
                <PostCreate />
            )
    }
}

export default PostContainer