import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  email: string
}

const navigation = {
  main: [
    { name: "Next.js", href: "https://nextjs.org/" },
    {
      name: "Cypress",
      href: "https://www.cypress.io/",
    },
    {
      name: "GitHub",
      href: "https://github.com/cypress-io/cypress",
    },
  ],
}

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<Inputs>()
  
  const [isSubmitted, setIsSubmitted] = React.useState("")
  
  const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    event.target.reset()
  
    const subscribe = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const response = await subscribe.json()
  
    setIsSubmitted(response.message)
  }

  return (
    <>
      <hr />
      <footer className="bg-white">
        {/* Email Subscription */}
        <div className="py-8 lg:flex lg:items-center lg:justify-between lg:max-w-7xl lg:mx-auto xl:mt-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Subscribe for updates
            </h3>
            {/* <p className="mt-2 text-base text-gray-500">
            The latest updates sent to your inbox.
          </p> */}
          </div>
          <form className="sm:flex">
      <div className="min-w-0 flex-1">
        <label htmlFor="email" className="sr-only">
          Subscribe for Updates
        </label>
        <input
          data-test="email-input-footer"
          type="email"
          name="email"
          placeholder="Subscribe for Updates"
          className="block w-full px-4 py-3 rounded-md border-2text-base text-gray-900 placeholder-gray-500"
        />
        {errors.email && (
          <span className="text-red-500" data-test="error-message">
            {errors.email.message}
          </span>
        )}
        {formState.isSubmitted && isSubmitted.includes("Success:") && (
          <div className="text-jade-500" data-test="success-message">
            {isSubmitted}
          </div>
        )}
        {formState.isSubmitted && isSubmitted.includes("Error:") && (
          <div className="text-red-500" data-test="server-error-message">
            {isSubmitted}
          </div>
        )}
      </div>
      <div className="mt-3 sm:mt-0 sm:ml-3">
        <input
          data-test="submit-button-footer"
          type="submit"
          value="Subscribe"
          className="block w-full py-3 px-4 rounded-md shadow bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:ring-offset-gray-900"
        />
      </div>
    </form>
        </div>
        <hr />
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            {navigation.main.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <a
                  href={item.href}
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; {`${new Date().getFullYear()}`} Cypress. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
