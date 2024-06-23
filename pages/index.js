import Image from 'next/image'
import Layout from '@/components/Layout'
import PopularProductSection from '@/components/section/PopularProductSection'
import CategorySection from '@/components/section/CategorySection'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'
import Hero from '@/components/Hero'





export default function Home() {

  const token = JSON.stringify(Cookies.get('token'))
  const router = useRouter()

  if (token) {
    const { exp } = jwtDecode(token)
    const expirationTime = (exp * 1000) - 60000

    if (Date.now() >= expirationTime) {
      Cookies.remove('token');
      Cookies.remove('role');
      Cookies.remove('id');
      router.push('/')
    }
  }

  return (
    <div>
      <Layout>
        <Hero />
        <PopularProductSection />
        <CategorySection />
      </Layout>
    </div>
  )
}
