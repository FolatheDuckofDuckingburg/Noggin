import { Brain } from "lucide-react";
import PageShell from "@/components/PageShell";
import NoggimigoTutor from "@/components/dashboard/NoggimigoTutor";

export default function NoggimigoChat() {
  return (
    <PageShell title="Noggimigo Chat" subtitle="Ask questions, get homework hints, and learn step-by-step with your AI tutor." accent="from-teal-500 to-emerald-600" icon={Brain}>
      <NoggimigoTutor />
    </PageShell>
  );
}
