import SectionWrap from "@/components/sections/extras/SectionWrap";
import { FaPython, FaHtml5, FaCss3Alt, FaGithub } from "react-icons/fa";
import {
  SiNextdotjs,
  SiDart,
  SiFigma,
  SiAdobeillustrator,
  SiAdobeaftereffects,
  SiGooglecolab,
} from "react-icons/si";

export default function LogoStrip() {
  const logos: { icon: React.ReactNode; label: string }[] = [
    {
      icon: <SiGooglecolab size={28} title="Google Colab" />,
      label: "Google Colab",
    },
    { icon: <FaPython size={28} title="Python" />, label: "Python" },
    { icon: <FaHtml5 size={28} title="HTML5" />, label: "HTML5" },
    { icon: <FaCss3Alt size={28} title="CSS3" />, label: "CSS3" },
    { icon: <SiNextdotjs size={28} title="Next.js" />, label: "Next.js" },
    { icon: <SiDart size={28} title="Dart" />, label: "Dart" },
    { icon: <SiFigma size={28} title="Figma" />, label: "Figma" },
    {
      icon: <SiAdobeillustrator size={28} title="Adobe Illustrator" />,
      label: "Adobe Illustrator",
    },
    {
      icon: <SiAdobeaftereffects size={28} title="Adobe After Effects" />,
      label: "Adobe After Effects",
    },
    { icon: <FaGithub size={28} title="GitHub" />, label: "GitHub" },
  ];

  return (
    <SectionWrap
      className="
        py-6 w-full overflow-x-clip 
    bg-gradient-to-r from-[#ffffff4e] via-[#95927573] to-[#ffffff4e]
      "
    >
      <ul
        className="
          mx-auto max-w-[min(100%,100vw)] w-full
          flex items-center justify-center gap-8
          whitespace-nowrap
          md:overflow-visible overflow-x-auto
          px-4
          opacity-90 
          [filter:grayscale(1)] hover:[filter:grayscale(0)] transition
        "
      >
        {logos.map(({ icon, label }) => (
          <li
            key={label}
            className="flex items-center justify-center text-[#f8e6c9] min-w-0"
          >
            {icon}
          </li>
        ))}
      </ul>
    </SectionWrap>
  );
}
