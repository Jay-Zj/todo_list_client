import { useState, useRef, useEffect } from "react";
import axios from "axios";
function App() {
  const [todoItems, setTodoItems] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    axios.get("http://localhost:8000/items").then((res) => {
      setTodoItems([...res.data]);
    });
  }, []);
  //添加事件
  const addItem = () => {
    const newItem = {
      id: todoItems.length + 1,
      value: inputRef.current.value,
      done: false,
      delete: false,
    };
    axios
      .post("http://localhost:8000/items", {
        todoItem: newItem,
      })
      .then((res) => {
        console.log(res, "====");
        setTodoItems([...res.data]);
      });
  };

  //删除事件
  const delItem = (item) => {
    axios
      .delete("http://localhost:8000/items", {
        data: {
          id: item.id,
        },
      })
      .then((res) => {
        axios.get("http://localhost:8000/items").then((res) => {
          setTodoItems([...res.data]);
        });
      });
  };

  return (
    <div className="App">
      <h1>TODO-LIST</h1>
      <div>
        <input type="text" placeholder="请添加" ref={inputRef}></input>
        <button type="submit" onClick={addItem}>
          添加
        </button>
      </div>
      <ul>
        {todoItems &&
          todoItems.map((item) => {
            return (
              !item.delete && (
                <li key={item.id}>
                  <label>{item.value}</label>
                  <button onClick={() => delItem(item)}>删除</button>
                </li>
              )
            );
          })}
      </ul>
    </div>
  );
}

export default App;
