interface UserProps {
  name: string;
  role: string;
}

export const UserModal = ({ name, role }: UserProps) => (
  <div className="p-6 flex flex-col gap-2">
    <h2 className="text-xl font-bold text-slate-800">{name}</h2>
    <p className="text-slate-500">{role}</p>
  </div>
);
