import { useState } from "react";
import { useEffect } from "react";

export const useFetchUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(
          data.map((user) => ({
            ...user,
            avatarUrl: `https://i.pravatar.cc/150?img=${user.id}`,
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
};
