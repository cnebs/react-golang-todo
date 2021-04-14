import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Form, Input, Icon } from "semantic-ui-react";
import { endpoint } from "../config.json";

const ToDoList = () => {

  const [task, setTask] = useState("");
  const [items, updateItems] = useState([]);

  const taskFns = {
    get: () => {
      axios.get(endpoint + "/api/task")
        .then(res => {
          console.log(res);
          updateItems(res.data?.map(item => ({
            color: item.status ? "green" : "yellow",
            _id: item._id,
            task: item.task,
          }))
            ?? []);
        });
    },
    update: (id) => {
      axios
        .put(`${endpoint}/api/task/${id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          console.log(res);
          taskFns.get();
        });
    },
    undo: (id) => {
      axios
        .put(`${endpoint}/api/undoTask/${id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          console.log(res);
          taskFns.get();
        });
    },
    delete: (id) => {
      axios
        .delete(`${endpoint}/api/deleteTask/${id}`, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          console.log(res);
          taskFns.get();
        });
    }
  }

  // On mount, retrieve task
  useEffect(() => {
    taskFns.get();
  });

  const onChange = (event) => {
    setTask(event.target.value)
  };

  const onSubmit = () => {
    // console.log("PRINTING task", this.state.task);
    if (task) {
      axios
        .post(
          `${endpoint}/api/task`,
          {
            task
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          taskFns.get();
          setTask("")
          console.log(res);
        });
    }
  };


  return (
    <div>
      <div className="row">
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            name="task"
            onChange={onChange}
            value={task}
            fluid
            placeholder="Create Task"
          />
          {/* <Button >Create Task</Button> */}
        </Form>
      </div>
      <div className="row">
        <Card.Group>{
          items.map((item) => (
            <Card key={item._id} color={item.color} fluid>
              <Card.Content>
                <Card.Header textAlign="left">
                  <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                </Card.Header>

                <Card.Meta textAlign="right">
                  <Icon
                    name="check circle"
                    color="green"
                    onClick={() => taskFns.update(item._id)}
                  />
                  <span style={{ paddingRight: 10 }}>Done</span>
                  <Icon
                    name="undo"
                    color="yellow"
                    onClick={() => taskFns.undo(item._id)}
                  />
                  <span style={{ paddingRight: 10 }}>Undo</span>
                  <Icon
                    name="delete"
                    color="red"
                    onClick={() => taskFns.delete(item._id)}
                  />
                  <span style={{ paddingRight: 10 }}>Delete</span>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))
        }</Card.Group>
      </div>
    </div>

  )

}

export default ToDoList;