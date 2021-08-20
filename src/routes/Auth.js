import React, {useState} from 'react'
import {authService, firebaseInstance} from "../fbase";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {name, value} = event.target;

        if(name==="email") setEmail(value);
        if(name==="password") setPassword(value);
    }
    const onSubmit = async(event) => {
        event.preventDefault()
        try{
            let data;
            if(newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    }
    const toggleAccount = () => {setNewAccount((prev)=>!prev)};

    const onSocialClick = async(event) => {
        const {name} = event.target
        let provider
        if(name==="google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if(name==="github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required vaule={password} onChange={onChange}/>
                <input type="submit" value={newAccount?"Create New Account!" : "Log In"}/>
                <p>{error}</p>
                <span onClick={toggleAccount}>Click here to: {newAccount?"Sign In":"Sign Up"}</span>
                <p>{""}</p>
            </form>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
};

export default Auth