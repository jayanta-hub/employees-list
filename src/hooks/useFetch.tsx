import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { setEmployees } from "../store/slice/employeeSlice";
import { useEffect, useState } from "react";

const useFetch = (method: string, url: string, body?: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const [cachedData, setCachedData] = useState<{ [key: string]: any }>({});
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const key = `${method}_${url}`;

    const postData = async (url: string, body: any) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            setCachedData((prevData) => ({ ...prevData, [key]: data }));
            return data;
        } catch (err) {
            console.error("Error posting data:", err);
            setError("Error posting data");
            return null;
        }
    };

    const update = async (url: string, body: any) => {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            setCachedData((prevData) => ({ ...prevData, [key]: data }));
            return data;
        } catch (err) {
            console.error("Error updating resource:", err);
            setError("Error updating resource");
            return null;
        }
    };
    const deleteResource = async (url: string) => {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            const data = await response.json();
            setCachedData((prevData) => ({ ...prevData, [key]: data }));
            return data;
        } catch (err) {
            console.error("Error deleting resource:", err);
            setError("Error deleting resource");
            return null;
        }
    };
    const patchData = async (url: string, body: any) => {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = await response.json();
            setCachedData((prevData) => ({ ...prevData, [key]: data }));
            return;
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Error fetching data");
            return null;
        }
    };
    const getData = async (url: string) => {
        try {
            console.log('getData')
            const response = await fetch(url);
            const data = await response.json();
            setCachedData((prevData) => ({ ...prevData, [key]: data }));
            // dispatch(setEmployees(data.employees));
            return data.employees;
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Error fetching data");
            return null;
        }
    };
    const fetchData = async () => {
        try {
            switch (method) {
                case 'GET':
                    const employees = await getData(url);
                    setData(employees);
                    break;
                case 'POST':
                    await postData(url, body);
                    break;
                case 'PUT':
                    await update(url, body);
                    break;
                case 'DELETE':
                    await deleteResource(url);
                    break;
                case 'PATCH':
                    await patchData(url, body);
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
        } catch (err) {
            console.error("Error during fetch operation:", err);
            setError("Error during fetch operation");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.log('cachedData[key]', cachedData[key])
        if (cachedData[key]) {
            setData(cachedData[key]);
            return;
        }
        setError(null);
        setLoading(true);
        fetchData();
        // Only refetch if method, url, or body change
    }, [method, url, body]);

    return { data, error, loading };
};

export default useFetch;
