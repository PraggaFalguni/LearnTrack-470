"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { authAPI } from "@/utils/api";
import { getUserById, getPaymentHistory } from "@/lib/data";
import PaymentHistoryList from "@/components/payment-history-list";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await authAPI.updateProfile({ name });
      if (response.data.status === "success") {
        setSuccess("Name updated successfully");
      } else {
        setError(response.data.message || "Failed to update name");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update name");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.updatePassword({
        currentPassword,
        newPassword,
      });
      if (response.data.status === "success") {
        setSuccess("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(response.data.message || "Failed to update password");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>

            <div className="space-y-4">
              <div>
                <label className="form-label">Name</label>
                <div className="form-input bg-gray-50">{user.name}</div>
              </div>

              <div>
                <label className="form-label">Email</label>
                <div className="form-input bg-gray-50">{user.email}</div>
              </div>

              <div className="pt-2">
                <button className="btn-primary">Edit Profile</button>
              </div>
            </div>
          </div>

          <div className="card mt-6">
            <h2 className="text-xl font-bold mb-4">Payment History</h2>
            <PaymentHistoryList payments={getPaymentHistory(user.id)} />
          </div>
        </div>

        <div>
          <div className="card sticky top-4">
            <h2 className="text-xl font-bold mb-4">Account Summary</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Enrolled Courses
                </h3>
                <p className="text-2xl font-bold">
                  {user.enrolledCourses?.length || 0}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Spent
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  $
                  {getPaymentHistory(user.id)
                    .reduce((total, payment) => total + payment.amount, 0)
                    .toFixed(2)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Member Since
                </h3>
                <p className="text-lg font-medium">January 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
