import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function LaborantDocentry() {

    const { docEntry } = useParams()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/data?docEntry=${docEntry}`);
            const data = await response.json();
            setData(data);
        };
        fetchData();
    }, [])
    return (
        <div>LaborantDocentry</div>
    )
}

export default LaborantDocentry