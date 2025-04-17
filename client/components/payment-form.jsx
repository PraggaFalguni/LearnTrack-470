"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Smartphone } from "lucide-react"

export default function PaymentForm({ course }) {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [bkashNumber, setBkashNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsProcessing(true)

    // In a real app, this would process the payment
    setTimeout(() => {
      setIsProcessing(false)
      router.push("/payment/success")
    }, 2000)
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center justify-center ${
                paymentMethod === "card" ? "border-purple-600 bg-purple-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <CreditCard
                className={`h-8 w-8 mb-2 ${paymentMethod === "card" ? "text-purple-600" : "text-gray-600"}`}
              />
              <span className={`font-medium ${paymentMethod === "card" ? "text-purple-600" : "text-gray-800"}`}>
                Credit/Debit Card
              </span>
            </button>

            <button
              type="button"
              className={`p-4 border rounded-lg flex flex-col items-center justify-center ${
                paymentMethod === "bkash" ? "border-purple-600 bg-purple-50" : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={() => setPaymentMethod("bkash")}
            >
              <Smartphone
                className={`h-8 w-8 mb-2 ${paymentMethod === "bkash" ? "text-purple-600" : "text-gray-600"}`}
              />
              <span className={`font-medium ${paymentMethod === "bkash" ? "text-purple-600" : "text-gray-800"}`}>
                bKash
              </span>
            </button>
          </div>
        </div>

        {paymentMethod === "card" ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="card-number" className="form-label">
                Card Number
              </label>
              <input
                id="card-number"
                type="text"
                className="form-input"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="card-name" className="form-label">
                Cardholder Name
              </label>
              <input
                id="card-name"
                type="text"
                className="form-input"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiry-date" className="form-label">
                  Expiry Date
                </label>
                <input
                  id="expiry-date"
                  type="text"
                  className="form-input"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="cvv" className="form-label">
                  CVV
                </label>
                <input
                  id="cvv"
                  type="text"
                  className="form-input"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <label htmlFor="bkash-number" className="form-label">
              bKash Number
            </label>
            <input
              id="bkash-number"
              type="text"
              className="form-input"
              placeholder="01XXXXXXXXX"
              value={bkashNumber}
              onChange={(e) => setBkashNumber(e.target.value)}
              required
            />
            <p className="text-sm text-gray-600 mt-2">
              You will receive a payment confirmation message on this number.
            </p>
          </div>
        )}

        <button type="submit" className="btn-primary w-full" disabled={isProcessing}>
          {isProcessing ? "Processing Payment..." : `Pay $${course.price.toFixed(2)}`}
        </button>
      </form>
    </div>
  )
}
