import { useRef } from "react"
import { useRouter } from "next/router"

const EventPage = ({ data }) => {
  const inputRef = useRef()
  const router = useRouter()
  const onSubmit = async (e) => {
    e.preventDefault()
    if (inputRef) {
      const email = inputRef.current.value
      const eventId = router?.query.id

      try {
        const res = await fetch("/api/email-registeration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, eventId: eventId }),
        })
        if (!res.ok) throw new Error("ERROR")

        const data = await res.json()
        console.log(data)
      } catch (e) {
        console.log("ERROR: ", e)
      }
    }
  }
  return (
    <div className="">
      <img src={data.image} alt="" width={1000} />
      <h1>{data.title}</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="">Get Registerd for this event!</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          pattern="[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
          placeholder="Please insert your email here"
          ref={inputRef}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default EventPage

export async function getStaticPaths() {
  const data = await import("/data/data.json")
  const { allEvents } = data
  console.log(data)
  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    }
  })
  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps(ctx) {
  const data = await import("/data/data.json")
  const id = ctx.params.id
  const { allEvents } = data
  const eventData = allEvents.find((event) => event.id === id)
  console.log(eventData)
  return {
    props: {
      data: eventData,
      id: id,
    },
  }
}
