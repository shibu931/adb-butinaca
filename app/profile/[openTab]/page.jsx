import ProfileDashboard from '/Components/ProfileDashboard.jsx'

const page = ({params}) => {
  const tabId = parseInt(params.openTab)
  return (
    <ProfileDashboard openTab={tabId}/>
  )
}

export default page