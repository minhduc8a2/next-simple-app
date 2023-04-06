import Image from "next/image";
import Link from "next/link";
const EventsCatPage = ({ data, pageName }) => {
  return (
    <div>
      <h1>Event in {pageName}</h1>
      {data.map((event) => (
        <Link
          key={event.id}
          href={`/events/${event.city}/${event.id}`}
          passHref
        >
          <Image src={event.image} width={300} height={300} alt={event.title} />
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </Link>
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

  return {
    props: { data, pageName: id },
  };
}
