import { useState } from "react";

export default (apiFunc) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const request = async (...args) => {
        setLoading(true);
        try {
            const result = await apiFunc(...args);
            setData(result.data.slice(0,5));
        } catch (err) {
            setError(err.messsage) || "Unexpected Error";
        } finally {
            setLoading(false);
        }
    }

    return {
        data,
        error,
        loading,
        request,
    }
}