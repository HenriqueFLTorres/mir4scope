import NFTModal from "@/components/NFTModal";
import { Modal } from "./modal";

export default function PhotoModal({ params }: { params: { id: string } }) {

  return <NFTModal seq={params.id} />;
}
