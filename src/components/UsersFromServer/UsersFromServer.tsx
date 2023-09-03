import axios from "axios";
import { useEffect, useState } from "react";
import UserCard from "../UserCard/UserCard";
import TodoList from "../TodoList/TodoList";
import "./UsersFromServer.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function UsersFromServer(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [toDo, setToDo] = useState<ToDo[]>([]);
  const [selectToDo, setSelectToDo] =
    useState<{ id: number; select: boolean }[]>();
  useEffect(() => {
    const getUsers = async () => {
      const usersArray = await axios(
        `https://jsonplaceholder.typicode.com/users`
      );
      setUsers(usersArray.data);
    };
    getUsers();

    const getToDo = async () => {
      setToDo((await axios(`https://jsonplaceholder.typicode.com/todos`)).data);
    };
    getToDo();
  }, []);
  return (
    <div className="users-cards-div">
      {users.map((user) => (
        <div
          className="user-card"
          key={user.id}
          onClick={() => setSelectToDo(!selectToDo)}
        >
          <UserCard name={user.name} email={user.email} />
          {selectToDo && (
            <ul className="to-do-list">
              {toDo.map(
                (toDoItem) =>
                  toDoItem.userId === user.id &&
                  toDoItem.id <= 5 && (
                    <TodoList
                      key={toDoItem.id}
                      title={toDoItem.title}
                      completed={toDoItem.completed}
                    />
                  )
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
