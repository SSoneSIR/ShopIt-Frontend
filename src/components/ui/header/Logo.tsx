import logoImage from "../../../assets/Logo/logo.png";

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export default function Logo({ onClick, className = "" }: LogoProps) {
  return (
    <img
      src={logoImage}
      onClick={onClick}
      alt="Shopit Logo"
      className={`cursor-pointer object-contain ${className}`}
    />
  );
}
