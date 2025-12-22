import { useState, useEffect } from "react";
import { User, Lock, ChevronLeft, PersonStanding, Truck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// Import your background image
import LoginImage from "/assets/Login/LoginImage.webp";
import logoImage from "/assets/Logo/logo.webp";
import rightImage from "/assets/Login/splitscreen bg img login.png";
// Auth Layout Component for Signup Flow (Split Screen)
const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white items-center justify-center">
      <div className="flex w-full max-w-6xl">
        {/* Left side */}
        <div className="w-full md:w-2/5 flex items-center justify-center p-2">
          <div className="w-full max-w-md">{children}</div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex w-3/5 items-center justify-center p-2">
          <div
            className="w-full max-w-3xl h-[85vh] rounded-3xl bg-cover bg-center border border-gray-100"
            style={{
              backgroundImage: `url(${rightImage})`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Auth Layout Component for Login Flow (Centered)
const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-lg bg-white p-6 md:p-8">
        {children}
      </div>
    </div>
  );
};

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
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        {/* Background image covering entire screen */}
        <div
          className="absolute bg-cover bg-center z-0  inset-0 bg-black/0"
          style={{
            backgroundImage: `url(${LoginImage})`,
          }}
        />

        {/* Content centered on top of background */}
        <div className="relative z-10 w-full max-w-md  p-8 rounded-2xl shadow-lg">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <img
                src={logoImage}
                alt="Shopit Logo"
                className="h-12 w-68 cursor-pointer object-contain mx-auto"
              />
            </div>

            <div className="flex flex-col items-center space-y-1 w-full mt-4">
              <h2 className="text-3xl font-semibold text-green-500 mb-3 whitespace-nowrap">
                Delivered Today!!!
              </h2>
              <div />
              <div className="space-y-3">
                <button
                  onClick={handleCreateAccount}
                  className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium py-4 px-8 rounded-2xl transition-colors text-base whitespace-nowrap "
                >
                  Create an Account
                </button>
                <button className="w-full bg-white cursor-pointer hover:bg-gray-50 text-green-600 font-medium py-4 px-8 rounded-2xl transition-colors text-base whitespace-nowrap ">
                  I have an Account
                </button>
                <a
                  href="/"
                  className="bg-transparent cursor-pointer text-green-600 font-medium py-4 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 text-base whitespace-nowrap "
                >
                  <PersonStanding className="w-5 h-5" />
                  Continue as a guest
                </a>
              </div>
            </div>
            <p className="text-center text-xs text-gray-300 mt-6">
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
      </div>
    );
  }

  // Sign Up Screen
  if (step === "signup") {
    return (
      <SignupLayout>
        <div className="w-full">
          <div className="flex-shrink-0 mb-10">
            <Link to="/">
              <img
                src={logoImage}
                alt="Shopit Logo"
                className="h-16 w-48 cursor-pointer object-contain"
              />
            </Link>
          </div>
          <button
            onClick={handleBack}
            className="mb-4 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 text-green-500 border border-gray-100 shadow-md bg-white rounded-md" />
          </button>
          <h2 className="text-2xl font-bold mb-2 text-left">
            Let's Get You Set for{" "}
            <span className="text-green-600">Instant Shopping!</span>
          </h2>
          <p className="text-gray-600 text-sm mb-8 text-left">
            It just takes a minute — faster than our delivery time.
          </p>

          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 border border-gray-300 rounded-2xl" />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-b border-gray-300  focus:outline-none  text-base"
              />
            </div>
            <div className="relative  gap-2">
              <div className="flex items-center gap-2 px-3 py-3 border-b bg-white border-gray-300">
                <img
                  src="https://flagcdn.com/w40/np.png"
                  alt="Nepal"
                  className="w-6 h-4"
                />
                <span className="text-base font-medium">+977</span>{" "}
                <input
                  type="tel"
                  placeholder="XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full flex-1 px-4 py-3 rounded-lg focus:outline-none  text-base"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleSignupSubmit}
            className="bg-green-600 hover:bg-green-700 cursor-pointer mt-6 text-white font-semibold py-3 px-32 rounded-3xl transition-colors mb-4  mx-auto block"
          >
            Continue
          </button>
        </div>
      </SignupLayout>
    );
  }

  // OTP Screen
  if (step === "otp") {
    return (
      <SignupLayout>
        <div className="w-full">
          <div className="flex-shrink-0 mb-10">
            <Link to="/">
              <img
                src={logoImage}
                alt="Shopit Logo"
                className="h-16 w-48 cursor-pointer object-contain"
              />
            </Link>
          </div>
          <button
            onClick={handleBack}
            className="mb-4 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 text-green-500 border border-gray-100 shadow-md bg-white rounded-md" />
          </button>

          <h2 className="text-2xl font-bold mb-2 text-left">
            You're Just Some Steps Away <br />
            <span className="text-green-600">Verify to Join In!</span>
          </h2>
          <p className="text-gray-600 text-sm mb-8 text-left">
            It just takes a minute — faster than our delivery time.
          </p>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full px-4 py-3 border-b border-gray-300  focus:outline-none   text-center text-2xl tracking-widest"
              maxLength={6}
            />
          </div>

          <div className="mb-8 text-center text-sm">
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
                className="text-green-600 font-medium hover:underline cursor-pointer"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={handleOtpSubmit}
            className="bg-green-600 hover:bg-green-700 cursor-pointer mt-6 text-white font-semibold py-3 px-32 rounded-3xl transition-colors mb-4  mx-auto block"
          >
            Continue
          </button>
        </div>
      </SignupLayout>
    );
  }

  // Password Screen
  if (step === "password") {
    return (
      <SignupLayout>
        <div className="w-full">
          <div className="flex-shrink-0 mb-10">
            <Link to="/">
              <img
                src={logoImage}
                alt="Shopit Logo"
                className="h-16 w-48 cursor-pointer object-contain"
              />
            </Link>
          </div>
          <button
            onClick={handleBack}
            className="mb-4 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <ChevronLeft className="w-8 h-8 text-green-500 border border-gray-100 shadow-md bg-white rounded-md" />
          </button>
          <h2 className="text-2xl font-bold mb-2 text-left">
            Let's Get You Set for{" "}
            <span className="text-green-600">Instant Shopping!</span>
          </h2>
          <p className="text-gray-600 text-sm mb-8 text-left">
            It just takes a minute — faster than our delivery time.
          </p>

          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Set a strong Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-b border-gray-300  focus:outline-none  text-base"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-b border-gray-300  focus:outline-none  text-base"
              />
            </div>
          </div>

          <button
            onClick={handlePasswordSubmit}
            className="bg-green-600 hover:bg-green-700 cursor-pointer mt-6 text-white font-semibold py-3 px-32 rounded-3xl transition-colors mb-4  mx-auto block"
          >
            Continue
          </button>
        </div>
      </SignupLayout>
    );
  }

  // Location Screen
  if (step === "location") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-14">
            <Link to="/">
              <img
                src={logoImage}
                alt="Shopit Logo"
                className="h-16 w-38 cursor-pointer object-contain"
              />
            </Link>
          </div>

          <h2 className="text-3xl font-semibold mb-4 text-center">
            <span className="text-green-600">Set Your Location,</span>
            <br />
            We'll Deliver in a Day!!!
          </h2>
          <p className="text-gray-900 text-base mb-10 text-center">
            We deliver fast — just tell us where to stop.
          </p>

          <button
            onClick={handleSetLocation}
            disabled={isGettingLocation}
            className={` bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-3 px-32 rounded-3xl transition-colors mb-4  mx-auto block ${
              isGettingLocation ? "opacity-70 cursor-wait" : ""
            }`}
          >
            {isGettingLocation ? "Getting Location..." : "Set Your Location"}
          </button>
          <button
            onClick={handleLocationSubmit}
            disabled={isGettingLocation}
            className="block mx-auto text-green-600 hover:underline text-base cursor-pointer"
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
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="w-full max-w-md">
          {/* Top area with delivery truck icon and app name */}
          <div className="flex justify-center mb-16">
            <Link to="/">
              <img
                src={logoImage}
                alt="Shopit Logo"
                className="h-16 w-38 cursor-pointer object-contain"
              />
            </Link>
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
          <div className="mx-auto block h-2 justify-center bg-gray-200 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-gray-400 to-gray-500 rounded-full animate-pulse"
              style={{
                animation: "slideRight 2s ease-in-out infinite",
              }}
            />
          </div>

          <p className="text-gray-700 font-semibold text-xl text-center">
            Setting Up Your Account...
          </p>
          <p className="text-gray-500 text-base mt-2 text-center">
            Please wait a moment
          </p>

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
