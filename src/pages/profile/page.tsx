import { useModalStore } from "@/app/store/useModalStore";
import { UserModal } from "@/components/widgets/modals/UserModal";

const ProfilePage = () => {
  const openModal = useModalStore((s) => s.openModal);

  const handleOpen = () => {
    openModal(UserModal, {
      name: "Gemini",
      role: "AI Collaborator",
    });
  };

  return <button onClick={handleOpen}>Ver Perfil</button>;
};

export default ProfilePage;
