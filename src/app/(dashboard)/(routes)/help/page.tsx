import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type AccordionItemType = {
  id: string;
  header: string;
  content: JSX.Element;
};

const accordionItems: AccordionItemType[] = [
  {
    id: "item-1",
    header: "What features does the platform offer?",
    content: (
      <>
        <p>
          Our platform provides a range of cutting-edge AI tools designed to
          enhance your creativity and productivity. Whether you’re a developer,
          content creator, or simply exploring AI, our features are tailored to
          meet your needs.
        </p>
        <p>
          The <strong>Conversation</strong> feature allows you to chat with an
          AI assistant to brainstorm ideas, seek support, or get answers to your
          questions efficiently. It's perfect for quick interactions or in-depth
          discussions.
        </p>
        <p>
          With <strong>Code Generation</strong>, you can create code snippets or
          resolve programming problems in a matter of seconds. This feature
          supports multiple programming languages and can help streamline your
          development process.
        </p>
        <p>
          The <strong>Music Generation</strong> tool lets you compose
          AI-generated music customized to your preferences. Whether you're
          creating background scores or exploring musical ideas, this feature
          has you covered.
        </p>
        <p>
          <strong>Video Generation</strong> enables you to create AI-powered
          videos tailored to various purposes, such as presentations, marketing,
          or creative projects. While this feature is powerful, some longer
          videos might occasionally fail due to technical limitations.
        </p>
        <p>
          Lastly, the <strong>Image Generation</strong> feature allows you to
          produce high-quality AI-generated images from your prompts. It's ideal
          for creating visuals for projects, marketing, or personal use.
        </p>
      </>
    ),
  },
  {
    id: "item-2",
    header: "What is the difference between the Free Plan and the Pro Plan?",
    content: <></>,
  },
  {
    id: "item-3",
    header: "How do I upgrade to the Pro Plan?",
    content: <></>,
  },
  {
    id: "item-4",
    header: "What happens if I run out of credits on the Free Plan?",
    content: <></>,
  },
  {
    id: "item-5",
    header: "Why does video or image generation sometimes fail?",
    content: <></>,
  },
  {
    id: "item-6",
    header: "What should I do if my video or image generation fails?",
    content: <></>,
  },
  {
    id: "item-7",
    header: "Are my credits deducted for failed requests?",
    content: <></>,
  },
  {
    id: "item-8",
    header: "What payment methods do you support?",
    content: <></>,
  },
  {
    id: "item-9",
    header: "Can I get a refund if I cancel my Pro Plan?",
    content: <></>,
  },
];

export default function HelpPage() {
  return (
    <div className="flex flex-col pb-8 md:pb-10">
      <div className="mb-6 space-y-1 md:mb-10">
        <h2 className="text-2xl font-bold md:text-2xl">Help & FAQ</h2>
        <p className="text-sm font-light text-muted-foreground md:text-base">
          Find answers to common questions and tips for using our AI features
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-3">
        {accordionItems.map((item) => (
          <AccordionItem
            value={item.id}
            className="rounded-lg border-[#593a8b] bg-white"
            key={item.id}
          >
            <AccordionTrigger>{item.header}</AccordionTrigger>
            <AccordionContent>
              <div className="w-full border"></div>
              <div className="space-y-3 px-5 py-4">{item.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
