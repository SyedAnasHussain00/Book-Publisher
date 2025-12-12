import "./App.scss";
import "antd/dist/reset.css";

import { Button } from "antd";
import { Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const { Meta } = Card;

function App() {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [entireBooks, setEntireBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [openedBookIndex, setOpenedBookIndex] = useState(null);

  // ------------ DELETE BOOK ------------
  const deleteBook = (index, e) => {
    e.stopPropagation();
    setEntireBooks(prev => prev.filter((_, i) => i !== index));
    toast.success("Book deleted!");
  };

  // ------------ EDIT PLACEHOLDER ------------
  const editBook = (index, e) => {
    e.stopPropagation();
    toast("Edit feature coming soon!");
  };

  // ------------ FORM SUBMIT HANDLER ------------
  const formSubmitHandler = () => {
    if (!bookName) {
      toast.error("Please enter a valid book name.");
      return;
    }
    if (!isbn) {
      toast.error("Please enter a valid ISBN.");
      return;
    }

    setEntireBooks(prev => [
      ...prev,
      { name: bookName, author: authorName, isbn: isbn }
    ]);

    toast.success("Book Added");

    // reset inputs
    setBookName("");
    setAuthorName("");
    setIsbn("");

    // close form after submit
    setShowForm(false);
  };

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container">
        <div className="navbar">
          <h1>Publish Pro</h1>

          <Button
            type="primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "Add Book"}
          </Button>
        </div>

        {/* ---------------- FORM ---------------- */}
        {showForm && (
          <div className="form-container">
            <Form layout="vertical" onFinish={formSubmitHandler}>
              
              <Form.Item label="Book Name" name="bookName">
                <Input
                  placeholder="Book Name"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Author Name" name="authorName">
                <Input
                  placeholder="Author Name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="ISBN Number" name="isbn">
                <Input
                  type="number"
                  placeholder="ISBN Number"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit">
                Publish
              </Button>

            </Form>
          </div>
        )}

        {/* ---------------- CARDS ---------------- */}
        <div className="card-container">
          {entireBooks.length === 0 ? (
            <p>No Book Yet</p>
          ) : (
            entireBooks
              .slice()
              .reverse()
              .map((book, index) => (
                <div
                  className={`book-card ${
                    openedBookIndex === index ? "open" : ""
                  }`}
                  key={index}
                  onClick={() =>
                    setOpenedBookIndex(
                      openedBookIndex === index ? null : index
                    )
                  }
                >
                  <div className="book-inner">
                    <div className="book-front">
                      <p>{book.name}</p>
                    </div>

                    <div className="book-back">
                      <Meta
                        className="card-items"
                        avatar={
                          <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnnDufRX2LYg6HbtP4xlfeewDVNlPHa9oxEA&s" />
                        }
                        title={`${book.name} - #${book.isbn}`}
                        description={book.author || "Unknown Author"}
                      />

                      <div className="icons">
                        <DeleteOutlined
                          onClick={(e) => deleteBook(index, e)}
                        />
                        <EditOutlined
                          onClick={(e) => editBook(index, e)}
                        />
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
