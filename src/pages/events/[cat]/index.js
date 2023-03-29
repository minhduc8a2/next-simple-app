import Image from "next/image";

const EventsCatPage = ({ data }) => {
  return (
    <div>
      <h1>Event in London</h1>
      {data.map((event) => (
        <a key={event.id} href={`/events/${event.city}/${event.id}`}>
          <Image src={event.image} width={300} height={300} alt={event.title} />
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </a>
      ))}
    </div>
  );
};

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import("/data/data.json");
  const allPaths = events_categories.map((event) => {
    return {
      params: {
        cat: event.id.toString(),
      },
    };
  });
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context?.params.cat;
  const { allEvents } = await import("/data/data.json");
  const data = allEvents.filter((event) => event.city === id);
  console.log("data", data);
  return {
    props: { data },
  };
}
