import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";

const SubscriptionCard = ({
  plan,
  currentPlan,
  userSubscription,
  handlePlanSelect,
}: {
  plan: any;
  currentPlan: string;
  userSubscription: any;
  handlePlanSelect: (selectedPlan: { name: string; price: number }) => void;
}) => {
  const isCurrentPlan = currentPlan === plan.name.toLowerCase();
  const isDowngrade =
    currentPlan === "pro" && plan.name.toLowerCase() === "free";

  return (
    <div className="flex h-full flex-col gap-y-3 rounded-lg border border-[#593a8b] bg-white p-5">
      <h2 className="text-xl font-bold">{plan.name} Plan</h2>
      <p className="text-[15px] font-light">{plan.description}</p>
      <div className="flex items-end gap-x-1">
        <h1 className="text-3xl font-bold">Rp. {plan.price}</h1>
        <p>/mo</p>
      </div>
      <Dialog>
        <DialogTrigger
          disabled={isCurrentPlan}
          className="disabled:pointer-events-none disabled:opacity-50"
        >
          <Button variant="custom" className="w-full">
            {isCurrentPlan ? "Plan Selected" : "Select Plan"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isDowngrade
                ? "Are you sure you want to downgrade?"
                : "Are you sure you want to upgrade?"}
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="custom" onClick={() => handlePlanSelect(plan)}>
              Confirm
            </Button>
            <Button variant="ghost">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <p className="font-semibold">Features include</p>
      {plan.features.map((feature: string) => (
        <div key={feature} className="flex items-center gap-x-2">
          <CircleCheck className="h-4 w-4 text-[#714ab0]" />
          <p>{feature}</p>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionCard;
