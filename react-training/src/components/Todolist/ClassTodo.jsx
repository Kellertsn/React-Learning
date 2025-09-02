import React, { Component, createRef } from "react";
import { v4 as uuidv4 } from "uuid";

class ClassTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      input: "",
    };
    this.inputRef = createRef();
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = () => {
    if (!this.state.input.trim()) return;
    const newTodo = {
      id: uuidv4(),
      title: this.state.input,
      isEditing: false,
      editText: "",
      status: "pending",
    };
    this.setState(
      (prevState) => ({
        todos: [...prevState.todos, newTodo],
        input: "",
      }),
      () => {
        this.inputRef.current.focus();
      }
    );
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((item) => item.id !== id),
    }));
  };

  handleEditClick = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((item) =>
        item.id === id
          ? { ...item, isEditing: true, editText: item.title }
          : item
      ),
    }));
  };

  handleEditChange = (id, newText) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((item) =>
        item.id === id ? { ...item, editText: newText } : item
      ),
    }));
  };

  handleSave = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((item) =>
        item.id === id
          ? { ...item, title: item.editText, isEditing: false, editText: "" }
          : item
      ),
    }));
  };

  handleCancel = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((item) =>
        item.id === id ? { ...item, isEditing: false, editText: "" } : item
      ),
    }));
  };
  get pendingTodos() {
    return this.state.todos.filter((item) => item.status === "pending");
  }

  get completedTodos() {
    return this.state.todos.filter((item) => item.status === "completed");
  }

  handleSwitch = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "pending" ? "completed" : "pending",
            }
          : item
      ),
    }));
  };

  render() {
    return (
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="todo__submit">
          <input
            value={this.state.input}
            onChange={this.handleChange}
            ref={this.inputRef}
          />
          <button onClick={this.handleSubmit}>Submit</button>
        </div>
        <div className="todo__lists">
          <div className="todo__pending">
            <h3>Pending Todos</h3>
            <ul>
              {this.pendingTodos.map((item) => (
                <li key={item.id}>
                  {item.isEditing ? (
                    <>
                      <input
                        value={item.editText}
                        onChange={(e) =>
                          this.handleEditChange(item.id, e.target.value)
                        }
                      />
                      <button onClick={() => this.handleSave(item.id)}>
                        Save
                      </button>
                      <button onClick={() => this.handleCancel(item.id)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{item.title}</span>
                      <button onClick={() => this.handleEditClick(item.id)}>
                        Edit
                      </button>
                    </>
                  )}
                  <button onClick={() => this.handleDelete(item.id)}>
                    Delete
                  </button>
                  <button onClick={() => this.handleSwitch(item.id)}>
                    Switch
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="todo__completed">
            <h3>Completed Todos</h3>
            <ul>
              {this.completedTodos.map((item) => (
                <li key={item.id}>
                  {item.isEditing ? (
                    <>
                      <input
                        value={item.editText}
                        onChange={(e) =>
                          this.handleEditChange(item.id, e.target.value)
                        }
                      />
                      <button onClick={() => this.handleSave(item.id)}>
                        Save
                      </button>
                      <button onClick={() => this.handleCancel(item.id)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{item.title}</span>
                      <button onClick={() => this.handleEditClick(item.id)}>
                        Edit
                      </button>
                    </>
                  )}
                  <button onClick={() => this.handleDelete(item.id)}>
                    Delete
                  </button>
                  <button onClick={() => this.handleSwitch(item.id)}>
                    Switch
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    );
  }
}

export default ClassTodo;
