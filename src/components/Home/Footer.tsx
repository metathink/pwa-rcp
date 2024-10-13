import { Button, Modal } from "antd"
import { Footer } from "antd/es/layout/layout"
import { deleteDatabase } from "../../util/db"
import { useState } from "react"


const FooterContainer = () => {

    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const showModal = () => {
        setOpen(true)
    }

    const handleOk = () => {
        setConfirmLoading(true)
        setTimeout(() => {
            setOpen(false)
            setConfirmLoading(false)
            deleteDatabase()
            window.location.reload()
        }, 2000)
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <Footer style={{ textAlign: 'center' }}>
            <Modal
                title="initializeDatabase"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>Do you want to initialize the database?</p>
            </Modal>
            <Button onClick={showModal}>Initialization</Button>
        </Footer>
    )
}

export default FooterContainer