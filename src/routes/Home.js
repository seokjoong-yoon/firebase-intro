import React, {useState, useEffect} from 'react'
import {dbService} from '../fbase'

const Home = () => {
    const [msg, setMsg] = useState("");
    const [dbmsgs, setDbmsgs] = useState([]);
    const onSubmit = async(event) => {
        event.preventDefault()
        await dbService.collection("messages").add(
            {
                message:msg,
                createdAt: Date.now().toString()
            }
        )
        setMsg("");
    }
    const onChange = (event) => {
        const {value} = event.target;
        setMsg(value);
    }
    const getDbmsgs = async() => {
        const dbmsgs = await dbService.collection("messages").get()
        await dbmsgs.forEach((document) => {
            const msgObject = {
                ...document.data(), // fields: message, createdAt
                id: document.id,
            }
            setDbmsgs((prev)=>[msgObject, ...prev]);
        })
    }
    useEffect(()=>{
        getDbmsgs();
    }, [])

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="post messages!" maxLength={120} value={msg}/>
                <input type="submit" value="Post" />
            </form>
            <div>
                {
                    dbmsgs.map((dbmsg)=>(
                        <div key={dbmsg.id}>
                            <h4>{dbmsg.message}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default Home