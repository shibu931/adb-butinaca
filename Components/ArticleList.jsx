import axios from "axios"
import { useEffect, useState } from "react"

const ArticleList = ({ setId, setOpenTab }) => {
  const [data, setData] = useState();
  const fetchData = async () => {
    const response = await axios.get('/api/article')
    setData(response.data)
  }
  const deleteArticle = (id)=>{
    const response = axios.delete(`/api/article/${id}`)
    if(response.status ==200){
      toast.success(
        'Article Deleted',{
          position:'bottom-center',
          autoClose:2000,
          theme:'dark'
        }
      )
      const filteredArticle = data.filter(article => article._id !== id);
      setData(filteredArticle)
    }else{
      toast.error(
        'Something Went Wrong',{
          position:'bottom-center',
          autoClose:2000,
          theme:'dark'
        }
      )
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>{
      data?.map((item, index) => (
        <div className='flex p-4 bg-slate-800 rounded' key={index}>
          <div className='ms-5'>
            <h2 className='text-xl'>{item.title}</h2>
            <span className='text-xs'>{item.slug}</span>
          </div>
          <div className='ms-auto my-auto'>
            <button onClick={()=>{setId(item.slug);setOpenTab('update-article')}} className='mx-2 bg-green-700 px-4 rounded py-2'>
              Edit
            </button>
            <button onClick={()=>{deleteArticle(item._id)}} className='mx-2 bg-red-700 px-4 rounded py-2'>
              Delete
            </button>
          </div>
        </div>
      ))
    }</div>
  )
}

export default ArticleList