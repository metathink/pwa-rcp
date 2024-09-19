import { Card } from "antd"
import { Content } from "antd/es/layout/layout"
import { Post } from "../../../types/types"

const PostListView = ({ setView, posts, setDetailPost }:
    {
        setView: React.Dispatch<React.SetStateAction<string>>,
        posts: Post[],
        setDetailPost: React.Dispatch<React.SetStateAction<Post | undefined>>
    }) => {

    const onCardClick = (card: Post) => {
        setDetailPost(card)
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
                            style={{ margin: '20px auto' }}
                            onClick={() => onCardClick(card)}
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