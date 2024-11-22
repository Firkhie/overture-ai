import Heading from "@/components/heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleHelp } from "lucide-react";

type AccordionItemType = {
  id: string;
  header: string;
  content: JSX.Element;
};

const accordionItems: AccordionItemType[] = [
  {
    id: "item-1",
    header: "What is the difference between the Free Tier and the Pro Tier?",
    content: (
      <>
        <p>
          <strong>Free Tier</strong> Includes 5 credits per month. Each credit
          allows you to use any feature once (e.g., generate one image or
          video). Meanwhile for the <strong>Pro Tier</strong>, it offers
          unlimited usage for a monthly subscription fee.
        </p>
      </>
    ),
  },
  {
    id: "item-2",
    header: "How do I upgrade to the Pro Tier?",
    content: (
      <>
        <p>
          You can upgrade to the <strong>Pro Tier</strong> by clicking the
          "Upgrade" button in the sidebar or accessing it from the settings
          page. A pop-up will appear with details about the{" "}
          <strong>Pro Tier</strong>. If you're interested, you can follow the
          steps to make a payment.
        </p>
        <p>
          If you’re running out of free credits, trying to use any feature will
          automatically show this upgrade pop-up.
        </p>
      </>
    ),
  },
  {
    id: "item-3",
    header: "What happens if I run out of credits on the Free Tier?",
    content: (
      <>
        <p>
          If you run out of credits on the <strong>Free Tier</strong>, you won’t
          be able to use the features anymore. To continue using them, you will
          need to subscribe to the <strong>Pro Tier</strong>.
        </p>
      </>
    ),
  },
  {
    id: "item-4",
    header: "Why does video or image generation sometimes fail?",
    content: (
      <>
        <p>
          Video or image generation might fail if the process takes too long to
          complete. This can happen when the server takes longer than expected
          to create or fetch the results. While most requests are completed
          within the time limit, some may fail due to occasional delays.
        </p>
      </>
    ),
  },
  {
    id: "item-5",
    header: "Are my credits deducted for failed requests?",
    content: (
      <>
        <p>
          Yes, credits are deducted even if a request fails. This is because the
          system still processes the request, whether it succeeds or not.
        </p>
      </>
    ),
  },
];

export default function HelpPage() {
  return (
    <div className="flex flex-col pb-8 md:pb-10">
      <Heading
        title="Help & FAQ"
        description="Find answers to common questions and tips for using our AI features"
        icon={CircleHelp}
      />
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
              <div className="space-y-3 px-5 pt-4">{item.content}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
