"use client";

import PaymentForm from "../../components/payment-form";

export default function PaymentPage() {
  // Mock course data (replace this with actual data fetching logic)
  const course = { price: 49.99 }; // Replace with the actual course price

  return <PaymentForm course={course} />;
}
