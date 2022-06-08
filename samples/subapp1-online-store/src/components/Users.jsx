import { map } from "lodash";
import { React } from "subapp-react";
import usersData from "../data/usersData";
import fetchFakeData from "../data/utils";

const resource = fetchFakeData(usersData, 2500);

const Users = () => {
  const users = resource.read();
  return (
    <ul id="user-box">
      {users.map((user, i) => (
        <li className="user" key={i}>
          ID: {user.id}<br/>
          Name: {user.name}<br/>
          Email: {user.email}<br/>
          <hr />
        </li>
      ))}
    </ul>
  );
};

export default Users;