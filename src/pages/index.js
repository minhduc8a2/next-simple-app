import { Inter } from "next/font/google"

import HomePage from "../components/home/home-page"

const inter = Inter({ subsets: ["latin"] })

export default function Home({ data }) {
  return (
    <>
      <HomePage data={data} />
    </>
  )
}
export async function getServerSideProps() {
  const data = await import("data/data.json")
  const { events_categories } = data
  console.log(events_categories)
  return {
    props: {
      data: events_categories,
    },
  }
}
