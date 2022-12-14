import Image from "next/image"
import { useRouter } from "next/router"

const CourseCard = ({ course }) => {
  const { thumbnail, name, description, _id } = course

  const router = useRouter()

  const handleClick = () => {
    router.push(`/courses/study/${_id}`)
    localStorage.setItem(_id, JSON.stringify(course))
  }

  return (
    <>
      <div className="df cursorp card-container posr" onClick={handleClick}>
        <div
          style={{
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            width: `100%`,
            height: `auto`,
            overflow: "hidden",
          }}
        >
          <Image
            src={thumbnail}
            alt="Picture of the author"
            width={`${15 * 1.77}rem`}
            height={`15rem`}
            layout="responsive"
          />
        </div>
        <div className="df fdc card-body">
          <h2
            className="cwhite mv5"
            style={{
              fontSize: "1.8rem",
            }}
          >
            {name}
          </h2>
          <p className="cgrey mt5 fs12">{description}</p>
        </div>
      </div>

      <style jsx>
        {`
          .card-container {
            flex-direction: column;
            background-color: var(--blackDark);
            width: ${15 * 1.77 + "rem"};
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
            transition: transform 0.2s ease;
            margin: 0 auto;
          }

          .card-body {
            width: 100%;
            padding: 1rem;
            background-color: var(--blackDark);
          }

          .card-container:hover {
            transform: scale(1.03);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
          }

          @media screen (max-width: 800px) {
            .card-container {
              width: 90%;
            }
          }
        `}
      </style>
    </>
  )
}

export default CourseCard
