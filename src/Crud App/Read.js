import axios from 'axios'
import React,{useState , useEffect} from 'react'
import { Link , useParams } from "react-router-dom";
import style from './Read.module.scss'
import { RiArrowGoBackFill } from "react-icons/ri";
function Read() {
    const [data, setData] = useState({
        title:''
      })
      const {id} = useParams()
      useEffect(()=>{
        axios.get('https://retoolapi.dev/fGXeVs/data/' + id )
                .then(res=>setData(res.data))
                .catch(err=>console.log(err))
      } , [] )
  return (
    <div className={style.background_read}>
           
                    <h1>{data.title}</h1>
                    <Link to="/"><button className={style.button_goback}><RiArrowGoBackFill className={style.goback}/></button></Link>
    </div>
  )
}
export default Read

