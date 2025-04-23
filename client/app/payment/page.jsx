"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap -mx-4">
        {/* Card Options */}
        <div className="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
          <div className="card p-4 shadow-md rounded-lg">
            <div className="img-box mb-4">
              <img
                src="https://www.freepnglogos.com/uploads/visa-logo-download-png-21.png"
                alt="Visa"
                className="w-16 mx-auto"
              />
            </div>
            <div className="number text-center mb-2">
              <label className="font-bold">**** **** **** 1060</label>
            </div>
            <div className="flex justify-between text-sm">
              <small>
                <span className="font-bold">Expiry date:</span> 10/16
              </small>
              <small>
                <span className="font-bold">Name:</span> Kumar
              </small>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
          <div className="card p-4 shadow-md rounded-lg">
            <div className="img-box mb-4">
              <img
                src="https://www.freepnglogos.com/uploads/mastercard-png/file-mastercard-logo-svg-wikimedia-commons-4.png"
                alt="MasterCard"
                className="w-16 mx-auto"
              />
            </div>
            <div className="number text-center mb-2">
              <label className="font-bold">**** **** **** 1060</label>
            </div>
            <div className="flex justify-between text-sm">
              <small>
                <span className="font-bold">Expiry date:</span> 10/16
              </small>
              <small>
                <span className="font-bold">Name:</span> Kumar
              </small>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 px-4 mb-4 lg:mb-0">
          <div className="card p-4 shadow-md rounded-lg">
            <div className="img-box mb-4">
              <img
                src="https://www.freepnglogos.com/uploads/discover-png-logo/credit-cards-discover-png-logo-4.png"
                alt="Discover"
                className="w-16 mx-auto"
              />
            </div>
            <div className="number text-center mb-2">
              <label className="font-bold">**** **** **** 1060</label>
            </div>
            <div className="flex justify-between text-sm">
              <small>
                <span className="font-bold">Expiry date:</span> 10/16
              </small>
              <small>
                <span className="font-bold">Name:</span> Kumar
              </small>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="w-full px-4 mt-8">
          <div className="card p-4 shadow-md rounded-lg">
            <p className="font-bold text-lg mb-4">Payment Methods</p>
            <div className="card-body border p-4 rounded-lg">
              <p>
                <button
                  className="btn btn-primary w-full flex justify-between items-center"
                  type="button"
                >
                  <span className="font-bold">PayPal</span>
                  <span className="fab fa-cc-paypal"></span>
                </button>
              </p>
              <div className="mt-4">
                <p className="font-bold text-lg">Summary</p>
                <p>
                  <span className="font-bold">Product:</span> Course {courseId}
                </p>
                <p>
                  <span className="font-bold">Price:</span> $452.90
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Card Form */}
        <div className="w-full px-4 mt-8">
          <div className="card p-4 shadow-md rounded-lg">
            <p className="font-bold text-lg mb-4">Credit Card</p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter card number"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium mb-1">
                    CVV Code
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="CVV"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter name"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Make Payment Button */}
        <div className="w-full px-4 mt-8">
          <button className="btn btn-primary w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}