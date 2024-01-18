import axios from 'axios'
import React,{useState , useEffect} from 'react'
import {  useNavigate , useParams } from "react-router-dom";
import style from './Update.module.css'
function Update() {

    const [inputdata, setInputdata] = useState({
        title:''
      })
      const {id} = useParams()
      const pageNavigate = useNavigate()

      useEffect(()=>{
        axios.get('https://retoolapi.dev/fGXeVs/data/' + id )
                .then(res=>setInputdata(res.data))
                .catch(err=>console.log(err))
      } , [] )

      const handleSubmit = ( e ) => {
                e.preventDefault()
                axios.put('https://retoolapi.dev/fGXeVs/data/' + id , inputdata)
                            .then(res => {
                                console.log(res.data)
                                pageNavigate('/')
                            })
      }
  return (
   
    <div className={style.div_form_update}>
            <form className={style.form_update}  onSubmit={handleSubmit}>
                        <input 
                                className={style.input_update}
                                type='text'
                                value={inputdata.title}
                                onChange={(e)=>setInputdata({...inputdata , title : e.target.value})}
                        />
                        <button
                            className={style.button_confirm_update}
                        >UPDATE</button>
                
            </form>
    </div>
  )
}

export default Update
