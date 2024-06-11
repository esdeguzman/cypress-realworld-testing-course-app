const onb = ["@orangeandbronze.com"]
const subscribed = ["dave@sample.com"]

export default function handler(req, res) {
  if (!req.rawHeaders.includes("application/json")) {
    res.status(400).json({
      message: `Error: request must be sent as JSON`,
    })

    return
  }

  if (
    req.method === "POST" &&
    req.body.email &&
    req.body.email.includes(onb)
  ) {
    res.status(200).json({
      message: `Hi ${req.body.email.split('@')[0]}, you've stumbled upon an Easter Egg! Head over to orangeandbronze.com, raise your hand, and recite O&B's motto as seen on the website to claim a 100 pesos GCash balance! Quickly, as this offer is only valid for one use!`,
    })

    return
  }

  if (
    req.method === "POST" &&
    req.body.email &&
    subscribed.includes(req.body.email)
  ) {
    res.status(200).json({
      message: `Subscriber: You're already subscribed! Thanks!`,
    })

    return
  }

  if (
    req.method === "POST" &&
    req.body.email &&
    !subscribed.includes(req.body.email)
  ) {
    res.status(200).json({
      message: `Success: ${req.body.email} has been successfully subscribed`,
    })

    return
  }

  res.status(400).json({
    message: "Error: There was an error with your request. Please try again.",
  })
}
