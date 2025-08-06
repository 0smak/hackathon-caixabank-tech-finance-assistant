import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useNotification } from "../Context/NotificationContext";

export const useRecommendations = () => {
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockRecommendations = useCallback(async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockError = Math.random() < 0.5;
        if (mockError) {
          const errorMsg = "Oops! Error fetching recommendation data";
          showNotification(errorMsg);
          return reject(errorMsg);
        } else {
          return resolve(true);
        }
      }, 1000);
    });
  }, [showNotification]);

  useEffect(() => {
    setLoading(true);
    mockRecommendations()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [mockRecommendations]);

  return { loading, error, setError };
};
