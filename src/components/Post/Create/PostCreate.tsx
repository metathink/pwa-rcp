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
        <Content
            style={{
                maxWidth: "800px",       // 最大横幅を設定
                width: "100%",           // 幅は100%にするが、maxWidthで制限
                padding: '10px',         // 適切なパディング
                margin: "10px auto",     // 自動で中央に寄せる
                backgroundColor: "#fff", // 背景色を設定
                borderRadius: "8px",     // 見た目を改善するために角を少し丸める
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"  // 軽い影を追加
            }}
        ><Title />
            <Form form={form} onFinish={onFinish} >
                <FormTitle />
                <FormItems />
                <FormDescription />
                <FormReferenceUrls />
                <FormButtons form={form} />
            </Form>
        </Content >
    )
}

export default PostCreate