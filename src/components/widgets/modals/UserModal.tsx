interface UserProps {
  name: string;
  role: string;
}

export const UserModal = ({ name, role }: UserProps) => (
  <div className="p-6">
    <h2 className="text-xl font-bold text-slate-800">{name}</h2>
    <p className="text-slate-500 mt-1">{role}</p>
  </div>
);
