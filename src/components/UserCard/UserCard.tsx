import "./UserCard.css";

interface Props {
  name: string;
  email: string;
}

export default function UserCard(props: Props): JSX.Element {
  return (
    <div>
      <h2 className="user-name">{props.name}</h2>
      <p className="user-email">{props.email}</p>
    </div>
  );
}
