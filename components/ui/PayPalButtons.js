import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"
import { config } from "../../constants/config"

const PayPalButtons = ({ coursePrice, price, courseId, setCourse }) => {
  const [render, setRender] = useState(false)
  const paypalRef = useRef()

  const renderPaypalButtons = () => {
    paypal
      .Buttons({
        // Order is created on the server and the order id is returned
        createOrder: (data, actions) => {
          const token = localStorage.getItem("token")

          return fetch(`${config.BASE_BACKEND_URL}/paypal/orders`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              courseId,
              price,
            }),
          })
            .then((response) => response.json())
            .then((order) => order.id)
        },
        // Finalize the transaction on the server after payer approval
        onApprove: (data, actions) => {
          const token = localStorage.getItem("token")
          return fetch(
            `${config.BASE_BACKEND_URL}/paypal/orders/${data.orderID}/capture`,
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ price }),
            }
          )
            .then((response) => response.json())
            .then((capture_id) => {
              // Successful capture! For dev/demo purposes:
              Swal.fire({
                title: "Excelente",
                html: "Ya puedes comenzar con el curso 🧠",
                icon: "success",
                confirmButtonText: "Excelente 😊",
                timer: 3000,
              })
              setCourse((oldCourseData) => ({
                ...oldCourseData,
                hasBoughtTheCourse: true,
                capture_id,
              }))
            })
        },
        style: { color: "blue" },
      })
      .render(paypalRef.current)
  }

  useEffect(() => {
    if (render && courseId) {
      console.log("RENDER")
      renderPaypalButtons()
    } else {
      setRender(true)
    }
  }, [render, courseId])

  console.log({ price })

  return (
    <>
      <div
        className="df aic mb20 cblack"
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "0.5rem",
        }}
      >
        <div className="df fdc aic" style={{ marginRight: "2rem" }}>
          <h1
            className="tdlt cgreylight"
            style={{ fontSize: "1.5rem", fontWeight: "400", margin: "0" }}
          >
            ${coursePrice}
          </h1>
          <h1 style={{ fontSize: "3rem" }} className="cprice">
            ${price}
          </h1>
        </div>
        <div ref={paypalRef}></div>
      </div>
      <style jsx>{`
        .dom-ready {
          background-color: red;
        }

        h1 {
          margin: 0;
          font-family: cubano, sans-serif;
        }

        .cprice {
          background: linear-gradient(rgb(24, 255, 32), rgb(22, 175, 2));
          -webkit-background-clip: text;
          color: transparent;
        }
      `}</style>
    </>
  )
}

export default PayPalButtons
