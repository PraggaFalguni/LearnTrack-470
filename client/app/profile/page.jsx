"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { authAPI } from "@/utils/api";
import { getUserById, getPaymentHistory } from "@/lib/data";
import PaymentHistoryList from "@/components/payment-history-list";

export default function ProfilePage() {
  const { user, isAuthenticated, setUser } = useAuth();
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);
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
      const response = await authAPI.updateProfile({ name, email });
      if (response.data.status === "success") {
        setSuccess("Profile updated successfully");
        setIsEditing(false);
        const updatedUser = { ...user, name, email };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        setError(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update profile error:", error);
      setError(error.response?.data?.message || "Failed to update profile");
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
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    disabled={loading}
                  />
                ) : (
                  <div className="form-input bg-gray-50">{user.name}</div>
                )}
              </div>

              <div>
                <label className="form-label">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    disabled={loading}
                  />
                ) : (
                  <div className="form-input bg-gray-50">{user.email}</div>
                )}
              </div>

              <div className="pt-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleNameUpdate}
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setName(user.name);
                        setEmail(user.email);
                      }}
                      className="btn-secondary"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-primary"
                  >
                    Edit Profile
                  </button>
                )}
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
                  {user.paymentHistory?.reduce((total, payment) => total + payment.amount, 0).toFixed(2) || "0.00"}
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
