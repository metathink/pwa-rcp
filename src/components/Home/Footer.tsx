import { Button } from "antd"
import { Footer } from "antd/es/layout/layout"
import { deleteDatabase } from "../../util/db"

const onClick = () => {
    deleteDatabase()
    window.location.reload()
}

const FooterContainer = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            <Button onClick={onClick}>Initialization</Button>
        </Footer>
    )
}

export default FooterContainer