import { Form } from "antd"
import EditFormButtonSpace from "./EditFormButtonSpace"
import { updatePost } from "../../../util/db"
import { Post } from "../../../types/types"
import { Content } from "antd/es/layout/layout"
import EditPostTitle from "./EditPostTitle"
import EditFormTitle from "./EditFormTitle"
import EditFormThumbnail from "./EditFormThumbnail"
import EditFormDescription from "./EditFormDescription"
import EditFormItems from "./EditFormItems"
import EditFormReferenceUrls from "./EditFormReferenceUrls"
import EditFormProcedure from "./EditFormProcedure"

const EditPost = ({ detailPost }: { detailPost: Post }) => {
    const [form] = Form.useForm()
    console.log(detailPost)

    const onFinish = (values: Post) => {
        const data = {
            id: detailPost.id,
            title: values.title,
            thumbnail: values.thumbnail,
            description: values.description,
            createdAt: detailPost.createdAt,
            editedAt: new Date(),
            items: values.items,
            referenceUrls: values.referenceUrls,
            procedure: values.procedure
        }

        updatePost(data)
        window.location.reload()
    }

    return (
        <>
            <Content>
                <EditPostTitle />
                <Form form={form} onFinish={onFinish} initialValues={{
                    title: detailPost.title,
                    thumbnail: detailPost.thumbnail,
                    description: detailPost.description,
                    items: detailPost.items,
                    referenceUrls: detailPost.referenceUrls,
                    procedure: detailPost.procedure
                }} >
                    <EditFormTitle />
                    <EditFormThumbnail form={form} thumbnail={detailPost.thumbnail} />
                    <EditFormDescription />
                    <EditFormItems />
                    <EditFormReferenceUrls />
                    <EditFormProcedure form={form} procedure={detailPost.procedure} />
                    <EditFormButtonSpace form={form} />
                </Form>
            </Content>
        </>
    )
}

export default EditPost