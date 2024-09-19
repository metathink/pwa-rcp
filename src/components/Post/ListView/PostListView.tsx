import { Card } from "antd"
import { Content } from "antd/es/layout/layout"
import { Post } from "../../../types/types"

const PostListView = ({ setView, posts }:
    { setView: React.Dispatch<React.SetStateAction<string>>, posts: Post[] }) => {

    const onCardClick = () => {
        console.log("card click")
        setView("detail")
    }

    if (posts.length > 0) {
        return (
            <>
                <Content style={{ padding: '10px', margin: "10px" }}>
                    {posts.map((card, index) => (
                        <Card
                            key={index}
                            title={card.title}
                            bordered={false}
                            style={{ width: "100%", margin: '20px auto' }}
                            onClick={() => onCardClick()}
                        >
                            <p>{card.description}</p>
                        </Card>
                    ))}
                </Content>
            </>
        )
    }

    return (
        <Content style={{ padding: '10px', margin: "10px", textAlign: "center" }}>
            no post
        </Content>
    )
}

export default PostListView