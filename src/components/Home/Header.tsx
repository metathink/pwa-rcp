import { PlusOutlined } from "@ant-design/icons"
import { Header } from "antd/es/layout/layout"
import { Input } from "antd"

const onSearch = (setView: React.Dispatch<React.SetStateAction<string>>) => {
    setView("list")
}

const logoClick = (setView: React.Dispatch<React.SetStateAction<string>>) => {
    setView("list")
}

const HeaderContainer = ({ setView }: {
    setView: React.Dispatch<React.SetStateAction<string>>,
}) => {
    const onPlusClick = () => {
        setView("create")
    }

    return (
        <>
            <Header style={{ display: 'flex', alignItems: 'center', padding: '0 20px', height: '64px' }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                    <img
                        src="logo.png"
                        alt="Logo"
                        style={{ height: '80%', maxHeight: '60px', marginRight: '10px', borderRadius: '10px' }} // 画像の最大高さをヘッダーの高さに合わせる
                        onClick={() => logoClick(setView)}
                    />
                    <Input.Search
                        placeholder="input search title or item"
                        onSearch={() => onSearch(setView)}
                        style={{ width: 200, marginRight: '20px' }}
                    />
                </div>
                <PlusOutlined
                    style={{ color: 'white', fontSize: '24px' }}
                    onClick={onPlusClick}
                />
            </Header>

        </>
    )
}

export default HeaderContainer