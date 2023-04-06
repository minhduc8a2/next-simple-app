import path from "path"
import fs from "fs"
const buildPath = () => {
  return path.join(process.cwd(), "data", "data.json")
}
const extractData = (filePath) => {
  const jsonData = fs.readFileSync(filePath)
  const data = JSON.parse(jsonData)
  return data
}
export default function handler(req, res) {
  const { method } = req
  const filePath = buildPath()
  const { events_categories, allEvents } = extractData(filePath)
  if (!allEvents)
    res.status(404).json({
      message: "Events data not found",
    })
  if (method === "POST") {
    const { email, eventId } = req.body
    const allNewEvents = allEvents.map((event) => {
      if (event.id === eventId) {
        if (event.emails_registered.includes(email)) {
          res.status(201).json({ message: "This email has been registered" })
        }
        return {
          ...event,
          emails_registered: [...event.emails_registered, email],
        }
      }
      return event
    })
    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents:allNewEvents })
    )

    res.status(200).json({ email, eventId })
  }
  res.status(404).json({ message: "wrong method" })
}
