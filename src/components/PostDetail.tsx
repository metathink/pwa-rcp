import { Content } from "antd/es/layout/layout"

const PostDetail = ({ view }: { view: string }) => {
    return (

        <Content style={{ padding: '20px', margin: "10px", backgroundColor: "#fff" }}>
            <p>
                PostDetail
            </p>
            <p>{view}</p>
        </Content>
    )
}

export default PostDetail