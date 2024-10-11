import { Content } from "antd/es/layout/layout";
import { Post } from "../../../types/types";
import { deletePost } from "../../../util/db";
import { CSSProperties } from "react";
import PostTitle from "./PostTitle";
import PostDescription from "./PostDescription";
import PostItemList from "./PostItemList";
import PostReferenceUrlList from "./PostReferenceUrlList";
import PostProcedureList from "./PostProcedureList";
import PostCreatedAt from "./PostCreatedAt";
import PostEditedAt from "./PostEditedAt";
import PostId from "./PostId";
import PostButtonSpace from "./PostButtonSpace";

export const styles = {
    box: {
        borderRadius: "15px",
        border: "solid 1px",
        margin: "5px",
        padding: "5px",
        color: "gray"
    } as CSSProperties,
    typography: {
        margin: "5px",
        fontWeight: "bold"
    } as CSSProperties,
    content: {
        padding: '20px',
        margin: "10px",
        backgroundColor: "#fff",
        textAlign: "center"
    } as CSSProperties
}

const PostDetail = ({ detailPost }: { detailPost: Post }) => {

    const onDelete = () => {
        console.log("delete click")

        if (detailPost && detailPost.id) {
            deletePost(detailPost.id)
            window.location.reload()
        }
    }

    return (
        <Content style={styles.content}>

            <PostTitle title={detailPost.title} />
            <PostDescription description={detailPost.description} />
            <PostItemList items={detailPost.items} />
            <PostReferenceUrlList urls={detailPost.referenceUrls} />
            <PostProcedureList items={detailPost.items} procedures={detailPost.procedure} />
            <PostCreatedAt createdAt={detailPost.createdAt} />
            <PostEditedAt editedAt={detailPost.editedAt} />
            <PostId id={detailPost.id} />

            <PostButtonSpace onDelete={onDelete} />

        </Content>
    );
};

export default PostDetail;
