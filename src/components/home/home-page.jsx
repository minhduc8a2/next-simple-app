import Link from "next/link"
import Image from "next/image"

const HomePage = ({ data }) => {
  return (
    <main>
      {data?.map((ev) => (
        <Link href={`/events/${ev.id}`} key={ev.id} className="post">
          <div className="post__img">
            <img alt={ev.title} src={ev.image} />
          </div>
          <div className="post__title">
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </div>
        </Link>
      ))}
    </main>
  )
}

export default HomePage
