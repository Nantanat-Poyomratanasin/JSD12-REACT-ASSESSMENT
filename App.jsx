import { useEffect, useState } from "react";
import myphoto from "./src/ploy.jpg";

const API_URL = "https://67eca027aa794fb3222e43e2.mockapi.io/members";

function App() {
  const [page, setPage] = useState("home");
  const [section, setSection] = useState("home");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", lastName: "", position: "" });

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Unable to load members.");
      }
      const data = await response.json();
      setMembers(data);
    } catch (err) {
      setError(err.message || "Fetch failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.name.trim() || !form.lastName.trim() || !form.position.trim()) {
      setError("Please fill all fields before saving.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Cannot create member.");
      }
      const created = await response.json();
      setMembers((current) => [...current, created]);
      setForm({ name: "", lastName: "", position: "" });
      setMessage("Member created successfully.");
    } catch (err) {
      setError(err.message || "Create request failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setError("");
    setMessage("");
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Unable to delete member.");
      }
      setMembers((current) => current.filter((member) => member.id !== id));
      setMessage("Member deleted successfully.");
    } catch (err) {
      setError(err.message || "Delete request failed.");
    } finally {
      setLoading(false);
    }
  }

  function renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Position</th>
            {section === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {members.length > 0 ? (
            members.map((member) => (
              <tr key={member.id}>
                <td>{member.name || "—"}</td>
                <td>{member.lastName || "—"}</td>
                <td>{member.position || "—"}</td>
                {section === "admin" && (
                  <td>
                    <button
                      className="delete"
                      type="button"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={section === "admin" ? 4 : 3} className="no-data">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  function renderOwner() {
    return (
      <div className="panel owner-card">
        <h2>17 Nantanat Poyomratanasin (Ploy) - JSD12</h2>
        <img className="owner-photo" src={myphoto} alt="owner" />
        <p className="owner-bio">My name is Meow Meow.</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="navbar">
        <div>
          <button
            type="button"
            className={page === "home" ? "active" : ""}
            onClick={() => {
              setPage("home");
              setSection("home");
            }}
          >
            Home
          </button>
          <button
            type="button"
            className={page === "owner" ? "active" : ""}
            onClick={() => setPage("owner")}
          >
            Owner
          </button>
        </div>
      </header>

      {page === "home" ? (
        <div className="panel">
          <div className="page-header">
            <h1>
              {section === "home"
                ? "Generation Thailand React - Assessment"
                : section === "user"
                  ? "Generation Thailand Home - User Section"
                  : "Generation Thailand Home - Admin Section"}
            </h1>
          </div>
          <div className="section-switcher">
            <button
              type="button"
              className={section === "user" ? "active" : ""}
              onClick={() => setSection("user")}
            >
              User Home Section
            </button>
            <button
              type="button"
              className={section === "admin" ? "active" : ""}
              onClick={() => setSection("admin")}
            >
              Admin Home Section
            </button>
          </div>

          {section === "admin" && (
            <div className="card">
              <h2>Create User Here</h2>
              <form onSubmit={handleSave}>
                <div className="row">
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        lastName: event.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={form.position}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        position: event.target.value,
                      }))
                    }
                  />
                </div>
                <button className="primary" type="submit" disabled={loading}>
                  Save
                </button>
              </form>
            </div>
          )}

          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}

          {section !== "home" && (
            <div className="card">
              <h2>Table 1</h2>
              {loading ? (
                <p className="status">Loading members…</p>
              ) : (
                renderTable()
              )}
            </div>
          )}
        </div>
      ) : (
        renderOwner()
      )}
    </div>
  );
}

export default App;
