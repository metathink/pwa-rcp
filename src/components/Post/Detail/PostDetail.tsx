import { Content } from "antd/es/layout/layout";
import { Post } from "../../../types/types";
import { Button, List, Space } from "antd";
import { deletePost } from "../../../util/db";

const PostDetail = ({ detailPost }: { detailPost: Post | undefined }) => {

    const onDelete = () => {
        console.log("delete click")

        if (detailPost && detailPost.id) {
            deletePost(detailPost.id)
            window.location.reload()
        }
    }

    return (
        <Content style={{ padding: '20px', margin: "10px", backgroundColor: "#fff", textAlign: "center" }}>
            <h3>Post Detail</h3>
            <h4>{detailPost?.title}</h4>
            <p>{detailPost?.description}</p>
            <p><strong>Created At:</strong> {detailPost?.createdAt.toLocaleDateString()}</p>
            {detailPost?.editedAd && (
                <p><strong>Edited At:</strong> {detailPost.editedAd.toLocaleDateString()}</p>
            )}

            {detailPost?.items && detailPost.items.length > 0 && (
                <>
                    <h4>Items</h4>
                    <List
                        bordered
                        dataSource={detailPost.items}
                        renderItem={(item) => (
                            <List.Item>
                                {`Group: ${item.group}, Item: ${item.item}, Quantity: ${item.quantity}`}
                            </List.Item>
                        )}
                    />
                </>
            )}

            {detailPost?.referenceUrls && detailPost.referenceUrls.length > 0 && (
                <>
                    <h4>Reference URLs</h4>
                    <List
                        bordered
                        dataSource={detailPost.referenceUrls}
                        renderItem={(url) => (
                            <List.Item>
                                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                            </List.Item>
                        )}
                    />
                </>
            )}

            {detailPost?.procedure && detailPost.procedure.length > 0 && (
                <>
                    <h4>Items</h4>
                    <List
                        bordered
                        dataSource={detailPost.procedure}
                        renderItem={(item) => (
                            <List.Item>{item}</List.Item>
                        )}
                    />
                </>
            )}

            {
                <p>postID: {detailPost?.id}</p>
            }
            <Space>
                <Button type="primary" htmlType="submit">
                    edit
                </Button>
                <Button htmlType="button" onClick={onDelete}>
                    delete
                </Button>
            </Space>
        </Content>
    );
};

export default PostDetail;
