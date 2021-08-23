import React, {useState, useEffect} from 'react'
import {dbService} from '../fbase'
import Message from '../components/Message'

const Home = ({userObj}) => {
    const [msg, setMsg] = useState("");
    const [dbmsgs, setDbmsgs] = useState([]);
    const [attachment, setAttachment] = useState();
    const onSubmit = async(event) => {
        event.preventDefault()
        // await dbService.collection("messages").add(
        //     {
        //         message:msg,
        //         creatorId: userObj.uid,
        //         createdAt: Date.now().toString()
        //     }
        // )
        // setMsg("");
    }
    const onChange = (event) => {
        const {value} = event.target;
        setMsg(value);
    }
    // const getDbmsgs = async() => {
    //     const dbmsgs = await dbService.collection("messages").get()
    //     await dbmsgs.forEach((document) => {
    //         const msgObject = {
    //             ...document.data(), // fields: message, creatorId, createdAt
    //             id: document.id,
    //         }
    //         setDbmsgs((prev)=>[msgObject, ...prev]);
    //     })
    // }
    const onFileChange = (event) => {
        const {files} = event.target;
        const firstFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const attachmentString = finishedEvent.currentTarget.result; // a string representation of image
            setAttachment(attachmentString);                        // which only is pasted to be converted to image
        }; // adding event listener that is triggered when file upload is done.
        reader.readAsDataURL(firstFile);
    }
    const onAttachmentClear = () => {
        setAttachment(null);
    }
    useEffect(()=>{
        // getDbmsgs();
        const freeListener = dbService.collection("messages").onSnapshot((complete)=>{
            const messagesArray = complete.docs.map(
                doc=>({id:doc.id, ...doc.data()})
            );
            console.log(messagesArray)
            setDbmsgs((prev)=>messagesArray)
        })

        return () => {
            freeListener();
        }
    }, [])


    return(
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="post messages!" maxLength={120} value={msg}/>
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Post" />
            </form>
            <div>
                { attachment &&
                    <>
                        <img src={attachment} width="100px" height="100px" />
                        <button onClick={onAttachmentClear}>Clear</button>
                    </>
                }
            </div>
            <div>

                {
                    dbmsgs.map((dbmsg)=>(
                        <Message key={dbmsg.id} data={dbmsg} isOwner={dbmsg.creatorId === userObj.uid}/>
                    ))
                }
            </div>
        </div>
    )
};

export default Home