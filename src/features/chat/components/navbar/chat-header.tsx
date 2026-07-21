//Header chat
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
export default function ChatHeader({ brandName }: { brandName?: string }) {
      const router = useRouter();
  const title = brandName ? `Chat with ${brandName}` : "Messages";
  const subtitle = brandName
    ? "Ask this seller about products, stock, and delivery."
    : "Your conversations with sellers on CamboDecor.";
      return (
            <div>
                  <div className="flex flex-row text-lg font-bold uppercase text-brand-navy md:text-xl">
                        <button onClick={() => router.back()}>
                              <ChevronLeft />
                        </button>
                        <p>{title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
      );
}