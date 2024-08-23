import React, { useState } from "react"
import green from "../assets/green.png"
import red from "../assets/red.png"

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false)

  const packages = [
    {
      name: "Free",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description:
        "A common form of Lorem ipsum read: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      features: [
        {
          feature: "Videos of Lessons",
          availableInFree: true,
          availableInPremium: true,
        },
        {
          feature: "Homework check",
          availableInFree: true,
          availableInPremium: true,
        },
        {
          feature: "Additional practical task",
          availableInFree: false,
          availableInPremium: false,
        },
        {
          feature: "Monthly conferences",
          availableInFree: false,
          availableInPremium: false,
        },
        {
          feature: "Personal advice from teachers",
          availableInFree: false,
          availableInPremium: false,
        },
      ],
      green: green,
      red: red,
    },
    {
      name: "Premium",
      monthlyPrice: 19,
      yearlyPrice: 199,
      description:
        "A common form of Lorem ipsum read: Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      features: [
        {
          feature: "Videos of Lessons",
          availableInFree: true,
          availableInPremium: true,
        },
        {
          feature: "Homework check",
          availableInFree: true,
          availableInPremium: true,
        },
        {
          feature: "Additional practical task",
          availableInFree: true,
          availableInPremium: true,
        },
        {
          feature: "Monthly conferences",
          availableInFree: true,
          availableInPremium: true,
        },
        {
          feature: "Personal advice from teachers",
          availableInFree: true,
          availableInPremium: true,
        },
      ],
      green: green,
      red: red,
    },
  ]

  return (
    <div className="md:px-14 p-4 max-w-s mx-auto py-10 dark:bg-darkBg" id="pricing">
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extrabold text-blue-950 dark:text-white mb=2">
          Here are all our plans
        </h2>
        <br></br>
        <p className="text-black dark:text-gray-400 text-lg md:w-1/3 mx-auto px-4">
          A simple paragraph is comprised of three major components, which is often a
          declarative sentence.
        </p>

        <div className="mt-16">
          <label
            htmlFor="toggle"
            className="inline-flex items-center cursor-pointer"
          >
            <span className="mr-8 text-2xl font-semibold dark:text-gray-300">
              Monthly
            </span>
            <div
              className={`w-14 h-6 rounded-full shadow-inner transition duration-200 ease-in-out ${isYearly ? "bg-lime-500" : "bg-gray-500"}`}
            >
              <div
                className={`w-6 h-6 rounded-full transition duration-200 ease-in-out ${isYearly ? "translate-x-full bg-gray-300 ml-2" : "bg-gray-300"}`}
              ></div>
            </div>
            <span className="ml-8 text-2xl font-semibold dark:text-gray-300">
              Yearly
            </span>
          </label>
          <input
            type="checkbox"
            id="toggle"
            className="hidden"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-10 mt-20 md:w-11/12 mx-auto">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={`relative border py-10 md:px-6 px-4 rounded-lg shadow-3xl ${pkg.name === "Premium" ? "bg-slate-900 text-white" : "bg-white dark:bg-darkCard dark:text-darkText"}`}
          >
            {pkg.name === "Premium" && (
              <div className="absolute top-0 right-0 mr-6 -mt-4">
                <div className="inline-flex items-center text-xs font-semibold py-1.5 px-3 bg-emerald-500 text-white rounded-full shadow-sm shadow-slate-950/5">
                  Most Popular
                </div>
              </div>
            )}
            <h3 className="text-3xl font-bold text-center dark:text-white">
              {pkg.name}
            </h3>
            <p
              className={`text-center my-5 ${pkg.name === "Premium" ? "text-gray-300" : "text-gray-600 dark:text-gray-400"}`}
            >
              {pkg.description}
            </p>
            <p className="text-4xl mt-5 text-center font-bold dark:text-white">
              {isYearly ? `$${pkg.yearlyPrice}` : `$${pkg.monthlyPrice}`}
              <span
                className={`text-base font-medium ${pkg.name === "Premium" ? "text-gray-300" : "text-gray-600 dark:text-gray-400"}`}
              >
                {isYearly ? "/year" : "/month"}
              </span>
            </p>
            <ul className="mt-4 space-y-2 px-4">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <img
                    src={
                      isYearly
                        ? feature.availableInPremium
                          ? pkg.green
                          : pkg.red
                        : feature.availableInFree
                          ? pkg.green
                          : pkg.red
                    }
                    alt=""
                    className="w-4 h-4"
                  />
                  <span className="dark:text-white">{feature.feature}</span>
                </li>
              ))}
            </ul>
            <div className="w-full mx-auto mt-8 flex items-center justify-center">
              <button className="animate-slidein700 opacity-0 px-7 py-2 bg-blue-500 border-blue-600 text-white font-medium rounded hover:bg-blue-700 hover:text-blue-600 inline-flex justify-center whitespace-nowrap text-sm dark:bg-blue-500 dark:text-white dark:border-slate-600 dark:hover:bg-blue-700 dark:hover:text-white shadow focus:outline-none focus:ring focus:ring-blue-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-blue-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
                Get started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
