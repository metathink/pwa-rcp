import { Button, Space, Modal } from "antd"
import { useState } from "react"
// import { updatePost } from "../../../util/db"

const EditFormButtonSpace = ({ form }: { form: any }) => {
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const onReset = () => {
        form.resetFields()
    }


    // const onUpdate = () => {
    //     // updatePost()
    //     window.location.reload()
    // }

    // const CancelButton = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    //     e.preventDefault()
    //     window.location.reload()
    // }

    // const showModal = () => {
    //     setOpen(true)
    // }

    // const handleOk = () => {
    //     setConfirmLoading(true)
    //     setTimeout(() => {
    //         setOpen(false)
    //         setConfirmLoading(false)
    //         onUpdate()
    //         window.location.reload()
    //     }, 2000)
    // }

    // const handleCancel = () => {
    //     setOpen(false)
    // }

    return (
        <Space>
            {/* <Modal
                title="Edit POST?"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            ></Modal> */}
            <Button htmlType="button" onClick={showModal}>
                Decision
            </Button>

            <Button onClick={onReset} > Reset</Button>

            <Button htmlType="button" onClick={CancelButton} >
                Cancel
            </Button>
        </Space>
    )
}

export default EditFormButtonSpace