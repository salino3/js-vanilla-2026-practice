import React, { useState, useEffect } from "react";

export function UserList() {
  const [usersData, setUsersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users`,
      );
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`);
      }
      const result = await response.json();
      setUsersData(result);
    } catch (error) {
      setUsersData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUsers = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>User Lists </h2>

      <input
        type="text"
        placeholder="Search name.."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading
        ? "Loading users..."
        : filteredUsers.length > 0
          ? filteredUsers.map((user) => (
              <div key={user.id}>
                <span>{user.name}</span>
              </div>
            ))
          : "No users found"}
    </div>
  );
}
