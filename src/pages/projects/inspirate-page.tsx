import React, { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "motion/react";

// --- Mock Data & Types ---
type Priority = "Low" | "Medium" | "High";
type Status = "todo" | "in-progress" | "complete";

interface Project {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  date: string;
  members: string[]; // URLs de avatares
}

const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Prototopi Mobile App",
    description: "Evaluate, improve, and optimize performance.",
    priority: "Medium",
    status: "todo",
    date: "Jun 8, 2025",
    members: ["https://github.com/shadcn.png", "https://github.com/vercel.png"],
  },
  {
    id: "2",
    title: "YellyBox Project",
    description: "YellyBox: Innovative platform for collaboration.",
    priority: "Low",
    status: "in-progress",
    date: "Jun 8, 2025",
    members: ["https://github.com/shadcn.png"],
  },
  {
    id: "3",
    title: "Mantraman (Branding)",
    description: "Elevate your brand with Mantraman.",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: ["https://github.com/vercel.png", "https://github.com/nextjs.png"],
  },
  {
    id: "4",
    title: "Minicam Exploration",
    description: "Discover, analyze, and improve visuals.",
    priority: "High",
    status: "in-progress",
    date: "Jun 9, 2025",
    members: ["https://github.com/nextjs.png"],
  },
  {
    id: "5",
    title: "EcoTrack Dashboard",
    description: "Sustainability monitoring platform.",
    priority: "Medium",
    status: "todo",
    date: "Jul 12, 2025",
    members: ["https://github.com/shadcn.png"],
  },
];

// --- Sub-components ---

const StatusBadge = ({ status }: { status: Status }) => {
  const styles = {
    todo: "bg-slate-100 text-slate-600 dark:bg-slate-500/20 dark:text-slate-400",
    "in-progress":
      "bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    complete:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  };

  const labels = {
    todo: "To Do",
    "in-progress": "In Progress",
    complete: "Complete",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status]} flex items-center gap-1.5`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
      {labels[status]}
    </span>
  );
};

const PriorityIndicator = ({ priority }: { priority: Priority }) => {
  const colors = {
    Low: "text-emerald-500",
    Medium: "text-amber-500",
    High: "text-rose-500",
  };
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <div
        className={`w-2 h-2 rounded-full ${colors[priority].replace("text-", "bg-")}`}
      />
      <span>{priority} Priority</span>
    </div>
  );
};

const ProjectListItem = ({ project }: { project: Project }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.005, backgroundColor: "var(--bg-hover)" }}
      className="group relative bg-card border border-border/60 hover:border-primary/30 p-4 sm:p-5 rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between overflow-hidden"
      style={{ "--bg-hover": "rgba(var(--primary), 0.02)" } as any}
    >
      {/* Decorative left border on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Main Content */}
      <div className="flex items-start gap-4 flex-1 w-full">
        {/* Project Icon / Avatar Initials */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
          {project.title.charAt(0)}
        </div>

        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <StatusBadge status={project.status} />
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {project.description}
          </p>

          {/* Metadata for mobile */}
          <div className="flex sm:hidden items-center gap-3 mt-2">
            <PriorityIndicator priority={project.priority} />
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {project.date}
            </span>
          </div>
        </div>
      </div>

      {/* Metadata & Actions (Desktop) */}
      <div className="hidden sm:flex items-center gap-6 shrink-0">
        <PriorityIndicator priority={project.priority} />

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{project.date}</span>
        </div>

        <div className="flex -space-x-2">
          {project.members.map((src, i) => (
            <Avatar key={i} className="w-7 h-7 border-2 border-background">
              <AvatarImage src={src} />
              <AvatarFallback>U{i}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex">
        <ArrowRight className="w-5 h-5 text-primary" />
      </div>
    </motion.div>
  );
};

const ProjectsPage = () => {
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = PROJECTS.filter((p) => {
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full h-full bg-muted/10 font-sans">
      {/* Header Simple y Limpio */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your initiatives and track progress.
          </p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </div>

      {/* Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 py-3 px-2 rounded-xl border border-border/40 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-9 h-10 rounded-lg bg-background border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-10 rounded-lg border-dashed border-border gap-2 font-normal"
              >
                <Filter className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Filter Status</span>
                {filterStatus !== "all" && (
                  <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                    {filterStatus}
                  </span>
                )}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                All Projects
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("todo")}>
                To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("in-progress")}>
                In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("complete")}>
                Complete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg text-muted-foreground"
          >
            <Clock className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Projects List with Animations */}
      <motion.div layout className="flex flex-col gap-3 pb-8 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectListItem key={project.id} project={project} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-64 flex flex-col items-center justify-center border border-dashed border-border rounded-xl bg-card/50 text-muted-foreground gap-2"
            >
              <Search className="w-8 h-8 opacity-20" />
              <p>No projects found matching your criteria.</p>
              <Button
                variant="link"
                onClick={() => {
                  setFilterStatus("all");
                  setSearchQuery("");
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;
