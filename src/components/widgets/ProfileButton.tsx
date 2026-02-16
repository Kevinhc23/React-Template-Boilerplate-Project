import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuProfileAvatar } from "@/components/widgets/menus/MenuProfileAvatar";

export const ProfileButton = () => {
  const { name, avatar, isLoading, email } = useUserInfo();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end gap-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2 w-12" />
        </div>
        <Skeleton className="h-9 w-9 rounded-full" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 group cursor-pointer h-auto p-2">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end leading-none">
              <span className="text-sm font-medium text-slate-900">{name}</span>
              <span className="text-xs text-slate-400 font-normal">
                {email}
              </span>
            </div>

            <Avatar className="size-9 shadow-sm transition-transform group-active:scale-95">
              <AvatarImage
                src={avatar || ""}
                alt={name}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary text-white text-xs font-bold">
                {name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </DropdownMenuTrigger>

      <MenuProfileAvatar />
    </DropdownMenu>
  );
};
