import React, {useState} from 'react';
import {dbService} from "../fbase";

const style = {
    border: "1px solid black",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    padding: "0.5rem",
}

const Message = ({data, isOwner}) => {
    const [isEditting, setIsEditting] = useState(false);
    const [newMessage, setNewMessage] = useState(data.message);


    const onDeleteClick = async(event) => {
        const ok = window.confirm("Are you sure you want to delete this message?")
        if(ok){
            await dbService.doc(`messages/${data.id}`).delete()
        }
    }

    const onChange = (event) => {
        const {value} = event.target;
        setNewMessage(value);
    }

    const onEdit = async(event) => {
        event.preventDefault();
        await dbService.doc(`messages/${data.id}`).update({message: newMessage});
        setIsEditting(false);
    }

    const toggleEdit = () => {
        setIsEditting((prev)=>!prev);
    }

    return(
        <div style={style}>
            <h4>{data.message}</h4>
            {
                isEditting ?
                    <>
                        <form onSubmit={onEdit}>
                            <input
                                value={newMessage}
                                required
                                onChange={onChange}
                            />
                            <input type="submit" />
                            <span> | </span>
                            <button onClick={toggleEdit}>Cancel</button>
                        </form>
                    </> :
                    isOwner ?
                        <>
                            <span onClick={onDeleteClick}>Delete</span>
                            <span> | </span>
                            <span onClick={toggleEdit}>Edit</span>
                        </> :
                        <></>
            }

        </div>
    )
}

export default Message