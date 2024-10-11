import { Button, Space } from "antd"

const PostButtonSpace = ({ onDelete }: { onDelete: () => void }) => (
    <Space>
        <Button type="primary" htmlType="submit">
            edit
        </Button>
        <Button htmlType="button" onClick={onDelete}>
            delete
        </Button>
    </Space>
)

export default PostButtonSpace