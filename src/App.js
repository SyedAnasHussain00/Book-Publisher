import "./App.scss";
import "antd/dist/reset.css";

import { Button } from "antd";
import { Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useState } from "react";

const { Meta } = Card;

function App() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setIsbn] = useState();
  const [entireBooks, setEntireBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);


  const formSubmitHandler = () => {
    if(!bookName){
      alert("Enter Valid Book Name");
    }else if(!isbn){
      alert("Enter Valid isbn");
    }
    else{
      setEntireBooks((prev) => [...prev, {name: bookName, author: authorName, isbn: isbn}]);
      setBookName("")
      setAuthorName("")
      setIsbn()
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="navbar">
          <h1>Publish Pro</h1>
          <Button type="primary" onClick={() => {setShowForm(showForm ? false : true)}}>{showForm ? "Cancel" : "Add Book"}</Button>
        </div>
        {showForm && (
          <div className="form-container">
            <Form layout="vertical" onFinish={formSubmitHandler}>
              <Form.Item label="Book Name">
                <Input type="text" placeholder="Book Name" onChange={(e) => {setBookName(e.target.value)}} value={bookName} />
              </Form.Item>

              <Form.Item label="Author Name">
                <Input type="text" placeholder="Author Name" onChange={(e) => {setAuthorName(e.target.value)}} value={authorName} />
              </Form.Item>

              <Form.Item label="ISBN Number">
                <Input type="number" placeholder="ISBN Number" onChange={(e) => {setIsbn(e.target.value)}} value={isbn} />
              </Form.Item>
              <Button type="primary" htmlType="submit">Publish</Button>
            </Form>
          </div> 
        )}
        <div className="card-container">
          {entireBooks.length === 0 ? (
            <p>No Book Yet</p>
          ) : (
            entireBooks.slice().reverse().map((book, index) => (
              <Card
                key={index}
                actions={[
                  <DeleteOutlined key="delete" />,
                  <EditOutlined key="edit" />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnDufRX2LYg6HbtP4xlfeewDVNlPHa9oxEA&s" />
                  }
                  title={`${book.name} - #${book.isbn}`}
                  description={book.author || "Unknown Author"}
                />
                {/* <p><strong>ISBN:</strong> {book.isbn}</p> */}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
