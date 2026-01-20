"use client";

import { useState } from "react";
import { Package, Lock, Mail } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { toast } from "sonner";
import type { User } from "../page";

interface LoginProps {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate university email
    if (!email.endsWith("@university.edu")) {
      toast.error("Invalid Email", {
        description:
          "Please use your university email address (@university.edu)",
      });
      return;
    }

    if (!password) {
      toast.error("Password required", {
        description: "Please enter your password",
      });
      return;
    }

    // Determine role based on email prefix (demo logic)
    const role = email.startsWith("admin.staff") ? "staff" : "lecturer";

    onLogin({ email, role });
    toast.success("Login Successful", {
      description: `Welcome ${role === "lecturer" ? "Lecturer" : "Academic Support Staff"}!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-2xl mb-4 shadow-lg">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Stationery Inventory System
          </h1>
          <p className="text-gray-600">Campus Stationery Management Portal</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Sign In
            </h2>
            <p className="text-gray-600 text-sm">
              Enter your university email and password to access the system
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                University Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 text-black bg-gray-50 border-gray-200 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11 h-12 text-black bg-gray-50 border-gray-200 focus:bg-white"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-medium text-base shadow-lg shadow-orange-500/30"
            >
              Sign In
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-sm font-semibold text-orange-900 mb-2">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-orange-700">
              <p>
                <span className="font-medium">Lecturer:</span>{" "}
                lecturer123@university.edu / staff123
              </p>
              <p>
                <span className="font-medium">Staff:</span>{" "}
                admin.staff@university.edu / staff123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          © 2026 University Stationery Management System
        </div>
      </div>
    </div>
  );
}
