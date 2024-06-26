import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";

function DeleteApplication() {
    const { id } = useParams();
    const { removeDataById } = useLocalStorage('users');
    const navigate = useNavigate();

    useEffect(() => {
        removeDataById(id);
        navigate("/");
    }, [])

    return (
        <>
        </>
    )
}

export default DeleteApplication;