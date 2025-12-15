import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) throw new Error("Api Error");
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load users",
        });
      });
  }, []);
  return (
    <>
      <div className="app-wrapper">
        <div className="container">
          {loading ? (
            <div className="spinner-border text-light"></div>
          ) : (
            <>
              <div className="text-center mt-5">
                <h1 className="hero-title"> User Directory</h1>
              </div>
              <div className="row g-4">
                {users.map((user, index) => (
                  <ul key={user.id} className="col-xl-3 col-lg-4 col-md-6 p-3">
                    <li className="card user-card fade-up h-100">
                      <div className="avatar">{user.name.charAt(0)}</div>
                      <div className="card-body text-center">{user.name}</div>
                      <div className="text-muted text-center">
                        @{user.username}
                      </div>
                      <div className="email m-4 text-center">{user.email}</div>
                    </li>
                  </ul>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
