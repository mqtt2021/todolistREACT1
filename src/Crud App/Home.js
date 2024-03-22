import React,{useEffect, useState , useRef} from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import style from './Home.module.scss'
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
function Home() {
    const [data, setData] = useState([])
    const [inputdata, setInputdata] = useState({
        title:''
      })
    const InputRef = useRef()

const handleDelete = (id) => {
    const confirm = window.confirm('Would you like to delete task')
    if(confirm){
        axios.delete('https://retoolapi.dev/fGXeVs/data/'+ id  )
                .then(response => {  
                    return axios.get('https://retoolapi.dev/fGXeVs/data');
                })
                
                .then(res=>setData(res.data))
                       
                .catch(error => {
                    alert('Lỗi khi xóa phần tử:', error);
                });
            }  
}

const handleSubmit = async (e) => {
    e.preventDefault();
    if(inputdata.title===''){
      alert('No task')
      return
    }
    try {
      // Gửi yêu cầu POST để thêm dữ liệu mới vào API
      await axios.post('https://retoolapi.dev/fGXeVs/data', inputdata);

      // Gọi hàm để lấy dữ liệu từ API và cập nhật trạng thái
      fetchDataFromApi();
      InputRef.current.focus()
      // Xóa giá trị của input
      setInputdata({
        title:''
      });
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu POST:', error);
    }
  };

  const fetchDataFromApi = async () => {
    try {
      // Gửi yêu cầu GET để lấy dữ liệu từ API
      const response = await axios.get('https://retoolapi.dev/fGXeVs/data');

      // Cập nhật trạng thái với dữ liệu mới từ API
      setData(response.data);
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu GET:', error);
    }
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [data]);


  const handleClearAll = async () => {
    const confirm = window.confirm('Would you like to delete task')
    if(confirm){
        try {
     
      for (const item of data) {
        await axios.delete(`https://retoolapi.dev/fGXeVs/data/${item.id}`);
      }

      fetchDataFromApi()
    } catch (error) {
      console.error('Error fetching or deleting data:', error);
    }
    }
  };   
  
  return (
    <div  className={style.father}>
                <div>
                        <h1>Todo App</h1>
                </div>
        
                <form className={style.form_input_submit}  onSubmit={handleSubmit}>                
                                <input  
                                        className={style.input}
                                        value={inputdata.title}
                                        ref={InputRef}
                                        type='text'
                                        onChange={(e)=>setInputdata({...inputdata , title : e.target.value})}
                                />
                                <button
                                  className={style.button_add}
                                >
                                        <div className={style.div_icon_add}>
                                          <FaPlus className={style.icon_add}/>
                                        </div>
                                </button>    
                </form>
       
                <div className={style.div_content_tasks}>
                  <ul className={style.ul_content_task} >
                    {data.map((d,i)=>(
                            <li className={style.item_todo}  key={i}>

                                <p className={style.item_todo_content}>{d.title}</p>
                                <div className={style.div_button} >
                                        <Link to={`/update/${d.id}`}>
                                              <button 
                                                      className={`${style.button} ${style.button_update}`}
                                              >  
                                                      <FaRegEdit className={style.action_icon}/>
                                              </button>
                                        </Link>

                                        <button
                                                className={`${style.button} ${style.button_delete}`}
                                                onClick={ (e) => handleDelete(d.id) }
                                        >
                                              <MdDelete className={style.action_icon}/>
                                        </button>
                    
                                        <Link to={`/read/${d.id}`}>
                                              <button 
                                                        className={`${style.button} ${style.button_read}`}
                                              >
                                                        <FaBookReader className={style.action_icon}/>
                                              </button>
                                        </Link>
                                </div>
                            </li>
                        ))}
                  </ul>
                </div>
                <div className={style.footer}>
                            <div className={style.remaining}>
                                    <p>{`You have ${data.length} pending tasks`}</p>
                            </div>

                            <button
                                        className={style.button_clear}
                                        onClick={handleClearAll}
                            >Clear All
                            </button>     
                </div>
    </div>
  )
}

export default Home
