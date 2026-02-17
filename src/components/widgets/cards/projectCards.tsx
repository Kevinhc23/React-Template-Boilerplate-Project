import { type FC, memo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// --- Tipos ---
type Priority = "Low" | "Medium" | "High";
type Status = "todo" | "in-progress" | "complete";

interface Project {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  date: string;
  members: string[];
}

const stylesPriority = {
  High: "bg-red-100 text-red-600",
  Medium: "bg-orange-100 text-orange-600",
  Low: "bg-emerald-100 text-emerald-600",
} satisfies Record<Priority, string>;

const stylesStatus = {
  todo: "bg-red-100 text-red-600",
  "in-progress": "bg-orange-100 text-orange-600",
  complete: "bg-emerald-100 text-emerald-600",
} satisfies Record<Status, string>;

const ProjectCard: FC<{ project: Project }> = memo(
  ({ project }) => {
    return (
      <motion.div
        key={project.id}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="group p-5 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-all flex flex-col gap-4 h-[200px] cursor-pointer"
      >
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {project.date}
          </span>
          <span
            className={cn(
              "px-3 py-1 rounded-sm text-[10px] font-bold uppercase",
              stylesPriority[project.priority],
            )}
          >
            {project.priority}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="mt-auto pt-4 border-t border-border/40 flex justify-between items-center">
          <div className="flex -space-x-2">
            {project.members.map((avatar, i) => (
              <img
                key={i}
                src={avatar}
                alt="member"
                className="size-7 rounded-full border-2 border-card object-cover"
              />
            ))}
          </div>
          <span
            className={cn(
              "text-[11px] font-bold px-3 py-1 rounded-sm",
              stylesStatus[project.status],
            )}
          >
            {project.status.replace("-", " ")}
          </span>
        </div>
      </motion.div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.project.id === nextProps.project.id;
  },
);

export default ProjectCard;
