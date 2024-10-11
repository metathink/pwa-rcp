import { Checkbox, List, Typography } from "antd"
import { styles } from "./PostDetail"
import { useState } from "react"


const PostItemList = ({ items }: { items: { group: string, item: string, quantity: string }[] | undefined }) => {

    return (
        <div style={styles.box}>
            <Typography style={styles.typography}>Items</Typography>
            <List
                bordered
                dataSource={items}
                renderItem={(item) => {
                    const [checkState, changeCheckState] = useState(false)
                    const textColor = checkState ? "blue" : "black"
                    const itemString = `Group: ${item.group} , Item: ${item.item} , Quantity: ${item.quantity}`

                    return (
                        <List.Item
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Typography.Text style={{ color: textColor }}> {itemString} </Typography.Text>
                            <Checkbox checked={checkState} onChange={() => { changeCheckState(!checkState) }} />
                        </List.Item>
                    )
                }}
            />
        </div>
    )
}

export default PostItemList