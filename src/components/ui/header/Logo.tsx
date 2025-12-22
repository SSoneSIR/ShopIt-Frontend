import logoImage from "../../../assets/Logo/logo.webp";

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

export default function Logo({ onClick, className = "" }: LogoProps) {
  return (
    <img
      src={logoImage}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClick) onClick();
      }}
      alt="Shopit Logo"
      className={`cursor-pointer object-contain ${className}`}
    />
  );
}
