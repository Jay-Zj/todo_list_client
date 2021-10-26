import { useState, useEffect, useRef } from "react";
import { Input, List, Button, Typography, Space, Divider } from "antd";
import style from "./app.module.css";
import axios from "axios";
const { Search } = Input;
const baseUrl = "wwww.todoapi.com/items";
function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [waitList, setWaitList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const inputRef = useRef(null);
  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      setTodoItems([...res.data]);
    });
  }, []);
  useEffect(() => {
    setWaitList([...todoItems.filter((item) => !item.delete && !item.done)]);
    setDoneList([...todoItems.filter((item) => item.done)]);
  }, [todoItems]);
  //添加事件
  const addItem = (value) => {
    const newItem = {
      id: todoItems.length,
      value: value,
      done: false,
      delete: false,
    };
    // inputRef.current.input.value = "";
    value = "";
    axios
      .post(baseUrl, {
        todoItem: newItem,
      })
      .then((res) => {
        setTodoItems([...res.data]);
      });
  };

  //删除事件
  const delItem = (item) => {
    axios
      .delete(baseUrl, {
        data: {
          id: item.id,
        },
      })
      .then((res) => {
        axios.get(baseUrl).then((res) => {
          setTodoItems([...res.data]);
        });
      });
  };

  const hasChecked = (item) => {
    axios
      .put(baseUrl, {
        id: item.id,
      })
      .then((res) => {
        axios.get(baseUrl).then((res) => {
          setTodoItems([...res.data]);
        });
      });
  };

  return (
    <div className={style.App}>
      <h1>TODO-LIST</h1>
      <Search
        ref={inputRef}
        className={style.Search}
        placeholder="请输入......"
        enterButton="添加"
        size="large"
        onSearch={addItem}
      />
      <Divider orientation="left" style={{ width: "400px" }}>
        代办事项
      </Divider>
      <List
        pagination={{
          pageSize: 5,
          size: "small",
        }}
        className={style.List}
        bordered
        dataSource={waitList}
        renderItem={(item, index) =>
          !item.delete &&
          !item.done && (
            <List.Item>
              <Space>
                <Typography.Text mark>[{index + 1}]</Typography.Text>{" "}
                {item.value}
                <Button onClick={() => delItem(item)} type="primary">
                  删除
                </Button>
                <Button onClick={() => hasChecked(item)} type="primary">
                  已办
                </Button>
              </Space>
            </List.Item>
          )
        }
      />
      <Divider orientation="left" className={style.Done}>
        已办事项
      </Divider>
      <List
        pagination={{
          pageSize: 5,
          size: "small",
        }}
        className={style.List}
        bordered
        dataSource={doneList}
        renderItem={(item, index) =>
          item.done && (
            <List.Item>
              <Space>
                <Typography.Text delete>
                  [{index + 1}] {item.value}
                </Typography.Text>
              </Space>
            </List.Item>
          )
        }
      />
    </div>
  );
}

export default App;
