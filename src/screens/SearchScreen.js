import React, {useState} from 'react';
import {AutoComplete, Space, Input, List, Empty, ConfigProvider} from "antd";


const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});


const SearchScreen = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [options, setOptions] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState('');



    const onSearch = (value) => {
        if(value.length >= 3){
            setDisabled(false);
            setOptions(
                !value ? [] : [mockVal(value), mockVal(value, 2), mockVal(value, 3)],
            );
            fetch(`https://jsonplaceholder.typicode.com/comments?q=${value}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setItems(result);
                        console.log(result)
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
        else {
            setDisabled(true);
            return
        }
    }

    const onSelect = (data) => {
        console.log('onSelect', data);
    };


    return (
        <Space direction="vertical" size="large" style={{display: 'flex'}}>
            <AutoComplete size="large"
                          onSelect={onSelect}
                          options={options}
                          style={{width: 400}}
            >
                <Input.Search onSearch={onSearch} size="large" placeholder="inserisci il testo per cercare un utente" disabled={disabled}/>
            </AutoComplete>
            <ConfigProvider renderEmpty={() => <Empty description={'Nessun Risultato'} />}>
            <List
                itemLayout="horizontal"
                dataSource={items}
                size="large"
                pagination={{pageSize: 20}}
                renderItem={item => (
                    <List.Item key={item.postId}>
                        <List.Item.Meta
                            title={item.name}
                            description={item.email}
                        />
                        {item.body}
                    </List.Item>
                )}
            />
            </ConfigProvider>
        </Space>

    );
};

export default SearchScreen;
