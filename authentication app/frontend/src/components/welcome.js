import React from 'react'
import axios from 'axios';
import { useEffect ,useState} from 'react';
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
    const [user, setUser] = useState()
    const refreshToken=async()=>{
      const res = await axios.get("http://localhost:5000/api/refresh",{
        withCredentials:true
      }).catch(err=>console.log(err))
      const data = await res.data;
      return data;
    }
      const sendRequest = async()=>{
          const res = await axios.get('http://localhost:5000/api/user',{
              withCredentials:true
          }).catch(err => console.log(err));
          const data = await res.data;
          return data
      }
      useEffect(() => {
        if(firstRender){
          firstRender=false
          sendRequest().then((data)=>setUser(data.user));
        }
        let interval =setInterval(() => {
          refreshToken().then(data=>setUser(data.user))
        }, 1000*28);
        return ()=>clearInterval(interval)
      }, [])
  return (
    <div>{user&&<h1>{user.name}</h1>}</div>
  )
}

export default Welcome






// const Welcome = () => {
//     const [user, setUser] = useState()
//       const sendRequest = async()=>{
//           const res = await axios.get('http://localhost:5000/api/user',{
//               withCredentials:true
//           }).catch(err => console.log(err));
//           const data = await res.data;
//           return data
//       }
//       useEffect(() => {
//         sendRequest().then((data)=>setUser(data.user))
//       }, [])
//       return
//       <div>
//           {user&&<h1>{user.name}</h1>}
//       </div>
    
// }

// export default Welcome