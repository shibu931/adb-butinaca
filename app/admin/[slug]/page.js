'use client'
import AdminPanel from '/Components/AdminPanel'
import { useSearchParams } from 'next/navigation'


const Admin = ({params}) => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  return (
    <AdminPanel pathname={params.slug} id={id}/>
  )
}

export default Admin