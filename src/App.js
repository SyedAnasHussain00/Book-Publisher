import "./App.scss";
import "antd/dist/reset.css";

import { Button } from "antd";
import { Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useState } from "react";
import { Toaster, toast } from 'react-hot-toast';

const { Meta } = Card;

function App() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setIsbn] = useState();
  const [entireBooks, setEntireBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [openedBookIndex, setOpenedBookIndex] = useState(null);



  const formSubmitHandler = () => {
    if(!bookName){
      toast.error("Please enter a valid book name.");
    }else if(!isbn){
      toast.error("Please enter a valid ISBN.");
    }
    else{
      setEntireBooks((prev) => [...prev, {name: bookName, author: authorName, isbn: isbn}]);
      toast.success("Book Added");
      setBookName("")
      setAuthorName("")
      setIsbn()
    }
  }
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
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
              <div className={`book-card ${openedBookIndex === index ? "open" : ""}`} key={index} onClick={() => setOpenedBookIndex(openedBookIndex === index ? null : index)}>
                <div className="book-inner">

                  <div className="book-front">
                    <p>{book.name}</p>
                  </div>

                  <div className="book-back">
                    <Meta className="card-items"
                      avatar={
                        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnDufRX2LYg6HbtP4xlfeewDVNlPHa9oxEA&s" />
                      }
                      title={`${book.name} - #${book.isbn}`}
                      description={book.author || "Unknown Author"}
                    />
                    <div className="icons">
                      <DeleteOutlined />
                      <EditOutlined />
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
