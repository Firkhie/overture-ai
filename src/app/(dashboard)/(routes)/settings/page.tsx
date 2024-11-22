import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col pb-8 md:pb-10">
      <Heading
        title="Settings"
        description="Manage account settings"
        icon={Settings}
      />
      <div>
        <p>
          You're currently on a <strong>Free Tier</strong>
        </p>
        <p className="mb-3">Expired in: -</p>
        <Button variant="custom">Upgrade</Button>
      </div>
    </div>
  );
}
