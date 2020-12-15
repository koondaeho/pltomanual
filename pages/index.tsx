import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'
import { type } from 'os'

type Props = {
  allPosts: Post[]
}
type orderState = {
  PayComplete?: string,
  ShippingRequest? :string,
  ShippingProgress? : string,
}
type orderStateTxt = 'PayComplete' | 'ShippingRequest' | 'ShippingProgress'
type Shop = {
  title: string,
  code: string,
  orderList:orderState
}
const Index = ({ allPosts }: Props) => {
  const orderStateList: orderState = {
    PayComplete:'결제완료',
    ShippingRequest: '신규주문',
    ShippingProgress: '배송중'
  }
  const shops:Array<Shop> = [
    {
      title: '오늘의집',
      code: 'B959',
      orderList: {
        PayComplete:'미확인주문',
        ShippingRequest:'송장입력대기',
        ShippingProgress: '배송중'
      }
    },{
      title: '카카오톡 스토어',
      code: 'B688',
      orderList: {
        PayComplete:'결제 완료',
        ShippingRequest:'배송 요청',
        ShippingProgress: '배송 중'
      }
    }]
  const selectedShops:Array<Shop> = [];
  const getState = (status:orderStateTxt) => shops.map((shop:Shop) => ({
        code: shop.code,
        state: shop.orderList[status]
    }))
  return (
    <>
      <Layout>
        <Head>
          <title>PLTO 주문 프로세스</title>
        </Head>
        <div>
          <div>
            {shops.map((shop:Shop) => (
              <span key={shop.code}>
                {shop.title}
              </span>
            ))}
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th className='width'>
                  플레이오토
                </th>
                {shops.map(s => (
                  <th key={s.code}>
                    {s.title}
                  </th>
                ))}
              </tr>
              {selectedShops.map((shop:Shop) => (
                <th key={shop.code}>{shop.title}</th>
              ))}
            </thead>
            <tbody>
              {Object.entries(orderStateList).map(([k,v]) => (
                <tr key={k}  className='width'>
                  <td>{v}</td>
                  {getState(k).map((s) => (
                      <td key={s.code}>{s.state}</td>
                    )
                  )}
                </tr>

              ))}
              <tr>
                <td>신규주문</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Layout>
      <style jsx>
        {`
        .table {
          border: 1px solid black;
        }
        .width {
          width:20%;
        }
        `}
      </style>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
