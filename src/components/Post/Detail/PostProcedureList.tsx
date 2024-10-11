import { Card, Checkbox, List, Popover, Typography } from "antd"
import { useState } from "react"
import { styles } from "./PostDetail"

const PostProcedureList = ({ items, procedures }: {
    items: { group: string, item: string, quantity: string }[] | undefined,
    procedures: string[] | undefined,
}) => {

    const [groupItem, setGroupItem] = useState<string[]>([])

    const handleClick = ({ part, items }: {
        part: string,
        items: { group: string, item: string, quantity: string }[] | undefined
    }) => {
        const filteredItems = items ? items
            .filter((item) => item.group.includes(part))
            .map((item) => `${item.item} : ${item.quantity}`) : []
        setGroupItem(filteredItems)
    }

    const highlightNumbers = ({ item, useItemColor }: {
        item: string,
        useItemColor: string
    }) => {
        // ①～⑨を探す正規表現
        const regex = /(①|②|③|④|⑤|⑥|⑦|⑧|⑨)/g;
        const parts = item.split(regex); // 正規表現で文字列を分割
        return parts.map((part, index) =>
            regex.test(part) ? (
                <Popover
                    key={index}
                    content={<div>{groupItem.length > 0 ? groupItem.join(", ") : "No items"}</div>}
                    trigger="click"
                >
                    <Typography.Text
                        strong
                        style={{ color: useItemColor }}
                        key={index}
                        onClick={() => handleClick({ part, items })}
                    >
                        {part}
                    </Typography.Text>

                </Popover>
            ) : (
                part
            )
        )
    }


    return (
        <div style={styles.box}>
            <Typography style={styles.typography}>Procedure</Typography>
            <List
                // bordered
                dataSource={procedures}
                renderItem={(item) => {
                    const [checkState, changeCheckState] = useState(false)
                    const useColor = checkState ? "silver" : "black"
                    const useItemColor = checkState ? "silver" : "red"

                    return (
                        <List.Item>
                            <Card style={{ width: "100%", borderColor: useColor, color: useColor, textAlign: "left" }}>
                                {highlightNumbers({ item, useItemColor })}
                                <Checkbox
                                    checked={checkState}
                                    onChange={() => { changeCheckState(!checkState) }}
                                    style={{ float: "right" }} />
                            </Card>
                        </List.Item>
                    )
                }
                }
            />

        </div>
    )
}

export default PostProcedureList