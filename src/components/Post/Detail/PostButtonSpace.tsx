import { Button, Space, Modal } from "antd"
import { useState } from "react"
import { deletePost } from "../../../util/db"

const PostButtonSpace = ({ id, setMode }: {
    id: number | undefined,
    setMode: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const onDelete = () => {
        if (id) {
            deletePost(id)
            window.location.reload()
        }
    }

    const showModal = () => {
        setOpen(true)
    }

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setOpen(false)
            setConfirmLoading(false)
            onDelete()
            window.location.reload()
        }, 2000)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <Space>
            <Button type="primary" htmlType="submit" onClick={() => setMode(false)}>
                edit
            </Button>
            <Modal
                title="Delete POST?"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            ></Modal>
            <Button htmlType="button" onClick={showModal}>
                delete
            </Button>
        </Space>
    )
}

export default PostButtonSpace