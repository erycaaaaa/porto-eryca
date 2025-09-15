import CaseLayout, { CaseSection } from "@/components/case/CaseLayout";

export const metadata = {
  title: "EduBot UI/UX Design — Case Study",
};

export default function Page() {
  return (
    <CaseLayout
      meta={{
        title: "EduBot UI/UX Design",
        subtitle: "Design system & conversational flow for an educational chatbot.",
        year: "2025",
        tag: "UI/UX • Chatbot",
        duration: "8 weeks",
        role: "Designer • Researcher",
        tools: ["Figma", "Next.js", "Tailwind", "Framer Motion"],
      }}
      quickFacts={[
        { label: "Screens", value: "30" },
        { label: "Usability Tests", value: "5 rounds" },
        { label: "Components", value: "25+" },
      ]}
    >
      <CaseSection id="about" title="About Project">
        <p>
          EduBot is a chatbot platform for schools to provide Q&A services 
          for students and teachers. The design focused on conversational 
          UI, accessibility, and a scalable component system.
        </p>
      </CaseSection>
    </CaseLayout>
  );
}
