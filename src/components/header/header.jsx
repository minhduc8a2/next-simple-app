import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <div className="top-nav">
        <Image alt="logo" src={"/nextlogo.png"} width={50} height={50} />
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="about-us">About Us</Link>
            </li>
          </ul>
        </nav>
      </div>
      <h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus
        sit deleniti ab, repudiandae et, a temporibus excepturi accusantium amet
        id asperiores, ex placeat! Nihil itaque incidunt maxime debitis expedita
        quaerat.
      </h1>
    </header>
  )
}

export default Header
