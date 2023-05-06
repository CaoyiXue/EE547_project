import { CanceledError } from "axios";
import apiClient from "../services/api_client";
import { useState, useEffect } from "react";
const useGames = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get("/games", { signal: controller.signal })
      .then((res) => {
        setGames(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { games, error, isLoading };
};

export default useGames;
