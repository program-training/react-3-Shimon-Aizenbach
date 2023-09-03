import "./ToDoList.css";

interface Props {
  title: string;
  completed: boolean;
}

export default function TodoList(props: Props): JSX.Element {
  return (
    <li className="to-do-item">
      {props.title}
      <p>status: {props.completed ? `completed` : `no completed`}</p>
    </li>
  );
}
