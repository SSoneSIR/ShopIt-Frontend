import { useState, useEffect } from "react";
import { User, Lock, ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// Import your background image
import LoginImage from "../../assets/Login/LoginImage.png";
import logoImage from "../../assets/Logo/logo.png";

export default function LoginPage() {
  const [step, setStep] = useState<
    "initial" | "signup" | "otp" | "password" | "location" | "loading"
  >("initial");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const navigate = useNavigate();

  // OTP countdown timer
  useEffect(() => {
    if (step === "otp" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [step, countdown]);

  const handleCreateAccount = () => {
    setStep("signup");
  };

  const handleSignupSubmit = () => {
    if (fullName && phoneNumber) {
      setStep("otp");
      setCountdown(30);
    }
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      setStep("password");
    }
  };

  const handlePasswordSubmit = () => {
    if (password && password === confirmPassword) {
      setStep("location");
    }
  };
  const handleSetLocation = () => {
    setIsGettingLocation(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationStr = `${position.coords.latitude.toFixed(
            4
          )}, ${position.coords.longitude.toFixed(4)}`;
          setLocation(locationStr);
          setIsGettingLocation(false);

          // Navigate to loading screen after getting location
          setStep("loading");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        },
        (error) => {
          setIsGettingLocation(false);
          if (error.code === error.PERMISSION_DENIED) {
            alert(
              "Location permission denied. Please enable location access to continue."
            );
          } else {
            alert("Unable to retrieve your location. Please try again.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setIsGettingLocation(false);
      alert("Geolocation is not supported by your browser.");
    }
  };
  const handleLocationSubmit = () => {
    setStep("loading");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleBack = () => {
    if (step === "signup") setStep("initial");
    else if (step === "otp") setStep("signup");
    else if (step === "password") setStep("otp");
    else if (step === "location") setStep("password");
  };

  const resendOtp = () => {
    setCountdown(30);
    setOtp("");
  };

  // Initial Screen
  if (step === "initial") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          <div className="text-center mb-12">
            <img
              src={logoImage}
              alt="Shopit Logo"
              className="h-40 w-96 cursor-pointer object-contain"
            />

            <h2 className="text-3xl font-bold text-green-500 mb-1 whitespace-nowrap">
              Delivered Today!!!
            </h2>
          </div>
          <div className="flex flex-col items-center space-y-3 w-auto">
            <button
              onClick={handleCreateAccount}
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-sm whitespace-nowrap"
            >
              Create an Account now
            </button>
            <button className="bg-white cursor-pointer hover:bg-gray-50 text-green-600 font-semibold py-3 px-8 rounded-lg transition-colors text-sm whitespace-nowrap">
              Already Have an Account
            </button>
            <a
              href="/"
              className="bg-transparent cursor-pointer text-green-500 hover:bg-green-500/10 font-medium py-2.5 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              Continue as a guest
            </a>
          </div>
          <p className="text-center text-xs text-gray-300 mt-5">
            By signing up, you agree to our{" "}
            <a href="#" className="text-green-500 hover:underline">
              Terms
            </a>
            .<br />
            See how we use our data in our{" "}
            <a href="#" className="text-green-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  // Sign Up Screen
  if (step === "signup") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 w-full max-w-lg flex items-center justify-center gap-8">
          {/* Left side - Form Card */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl w-full max-w-md">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src={logoImage}
                  alt="Shopit Logo"
                  className="h-1/2 w-1/2 justify-center cursor-pointer object-contain mx-auto"
                />
              </Link>
            </div>

            <h2 className="text-xl font-bold mb-1">
              Let's Get You Set for{" "}
              <span className="text-green-600">Instant Shopping!</span>
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              It just takes a minute — faster than our delivery time.
            </p>

            <div className="space-y-3">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <div className="relative flex gap-2">
                <div className="flex items-center gap-2 px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
                  <img
                    src="https://flagcdn.com/w40/np.png"
                    alt="Nepal"
                    className="w-5 h-4"
                  />
                  <span className="text-sm font-medium">+977</span>
                </div>
                <input
                  type="tel"
                  placeholder="XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleSignupSubmit}
              className="w-full mt-6 bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // OTP Screen
  if (step === "otp") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 w-full max-w-lg flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl w-full max-w-md">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src={logoImage}
                  alt="Shopit Logo"
                  className="h-1/2 w-1/2 justify-center cursor-pointer object-contain mx-auto"
                />
              </Link>
            </div>

            <h2 className="text-xl font-bold mb-1">
              You're Just Some Steps Away{" "}
              <span className="text-green-600">Verify to Join In!</span>
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              It just takes a minute — faster than our delivery time.
            </p>

            <div className="relative">
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-center text-xl tracking-widest"
                maxLength={6}
              />
            </div>

            <div className="mt-4 text-center text-xs">
              {countdown > 0 ? (
                <p className="text-gray-600">
                  Didn't Receive the code?{" "}
                  <span className="text-green-600 font-medium">
                    Resend in 00:{countdown.toString().padStart(2, "0")}
                  </span>
                </p>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-green-600 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              onClick={handleOtpSubmit}
              className="w-full mt-6 bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Password Screen
  if (step === "password") {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 relative"
        style={{
          backgroundImage: `url(${LoginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 w-full max-w-lg flex items-center justify-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl w-full max-w-md">
            <button
              onClick={handleBack}
              className="mb-4 text-gray-600 hover:text-gray-800"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src={logoImage}
                  alt="Shopit Logo"
                  className="h-1/2 w-1/2 justify-center cursor-pointer object-contain mx-auto"
                />
              </Link>
            </div>

            <h2 className="text-xl font-bold mb-1">
              Let's Get You Set for{" "}
              <span className="text-green-600">Instant Shopping!</span>
            </h2>
            <p className="text-gray-600 text-xs mb-6">
              It just takes a minute — faster than our delivery time.
            </p>

            <div className="space-y-3">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  placeholder="Set a strong Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
            </div>

            <button
              onClick={handlePasswordSubmit}
              className="w-full mt-6 bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Location Screen
  if (step === "location") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md w-full">
          <div className="flex items-center justify-center gap-3 mb-12">
            <img
              src={logoImage}
              alt="Shopit Logo"
              className="h-40 w-96 object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-green-600">Set Your Location,</span>
            <br />
            We'll Deliver in a Day!!!
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            We deliver fast — just tell us where to stop.
          </p>

          <button
            onClick={handleSetLocation}
            disabled={isGettingLocation}
            className={`bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-3 px-12 rounded-lg transition-colors mb-4 ${
              isGettingLocation ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {isGettingLocation ? "Getting Location..." : "Set Your Location"}
          </button>
          <button
            onClick={handleLocationSubmit}
            disabled={isGettingLocation}
            className="block mx-auto text-green-600 hover:underline text-sm cursor-pointer"
          >
            I'll do it later
          </button>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (step === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-16">
            <img
              src={logoImage}
              alt="Shopit Logo"
              className="h-40 w-96 object-contain"
            />
          </div>
          <div className="flex gap-3 justify-center mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-gray-700 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 1}s`,
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto mb-6">
            <div
              className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full animate-pulse"
              style={{
                animation: "slideRight 2s ease-in-out infinite",
              }}
            />
          </div>

          <p className="text-gray-700 font-semibold text-lg">
            Setting Up Your Account...
          </p>
          <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>

          <style>{`
            @keyframes slideRight {
              0% { width: 0%; margin-left: 0%; }
              50% { width: 100%; margin-left: 0%; }
              100% { width: 0%; margin-left: 100%; }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return null;
}
