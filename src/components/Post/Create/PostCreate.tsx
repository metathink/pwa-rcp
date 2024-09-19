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

const PostCreate = () => {

    const [form] = Form.useForm();

    const onFinish = (values: Post) => {
        const data = {
            title: values.title,
            description: values.description,
            createdAt: new Date(),
            items: values.items,
            referenceUrls: values.referenceUrls,
        }

        addPost(data)
        console.log(data)
    }


    return (
        <>
            <Content style={{ padding: '10px', margin: "10px", backgroundColor: "#fff" }} >
                <Title />
                <Form form={form} onFinish={onFinish} >
                    <FormTitle />
                    <FormItems />
                    <FormDescription />
                    <FormReferenceUrls />
                    <FormButtons form={form} />
                </Form>
            </Content >

        </>
    )
}

export default PostCreate