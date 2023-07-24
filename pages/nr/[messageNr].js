import { useRouter } from 'next/router' 


export default function Message() {
    const router = useRouter()
    const { messageNr } = router.query
    return <p>Message: {messageNr}</p>
    }
