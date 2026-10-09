import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </Icon>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.5 10.5V17M7.5 7.2v.1M11.5 17v-6.5M11.5 13.5c0-1.8 1.2-3 2.7-3s2.3 1 2.3 2.8V17" />
    </Icon>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </Icon>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.01" />
    </Icon>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.3" />
    </Icon>
  );
}

export function QuillIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 4c-6.5.5-11.5 5-13 13l-2 3" />
      <path d="M20 4c-.5 5-3 9-9 10.5M9.5 10.5c2.5.2 4.6-.4 6.5-1.7" />
    </Icon>
  );
}

export function TowerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 21V8l-1-3h2l.5 1.5h2L10 5h4l.5 1.5h2L17 5h2l-1 3v13Z" />
      <path d="M10.5 21v-4a1.5 1.5 0 0 1 3 0v4M9 11.5h.01M15 11.5h.01" />
    </Icon>
  );
}

export function AnvilIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 8h13c0 2.5 2 3.5 5 3.5V13c-3 0-5 1-6 3H9c-1-2-3-3-6-3Z" />
      <path d="M9 16l-1.5 4h9L15 16" />
    </Icon>
  );
}

export const contactIcons = {
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  instagram: InstagramIcon,
  location: PinIcon,
};

export const schoolIcons = {
  frontend: QuillIcon,
  backend: TowerIcon,
  devtools: AnvilIcon,
};
