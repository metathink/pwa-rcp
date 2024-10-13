import { Form } from 'antd';
import { Content } from "antd/es/layout/layout"
import { Post } from '../../../types/types';
import Title from './Title';
import FormTitle from './Form/FormTitle';
import FormItems from './Form/FormItems';
import FormDescription from './Form/FormDescription';
import FormReferenceUrls from './Form/FormReferenceUrls';
import FormButtons from './Form/FormButtons';
import { addPost } from '../../../util/db';
import FormProcedure from './Form/FormProcedure';
import FormThumbnail from './Form/FormThumbnail';

const PostCreate = ({ setView }: { setView: React.Dispatch<React.SetStateAction<string>> }) => {

    const [form] = Form.useForm()

    const onReset = () => {
        form.resetFields()
    }

    const onFinish = (values: Post) => {

        const data = {
            title: values.title,
            thumbnail: values.thumbnail,
            description: values.description,
            createdAt: new Date(),
            items: values.items,
            referenceUrls: values.referenceUrls,
            procedure: values.procedure
        }

        addPost(data)
        console.log(data)
        window.location.reload()

        onReset()
        setView("list")
    }


    return (
        <Content >
            <Title />
            <Form form={form} onFinish={onFinish} >
                <FormTitle />
                <FormThumbnail form={form} />
                <FormDescription />
                <FormItems />
                <FormReferenceUrls />
                <FormProcedure form={form} />
                <FormButtons form={form} />
            </Form>
        </Content >
    )
}

export default PostCreate