import { useState, useMemo } from "react";
import { Search, FolderKanban, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import ProjectCard from "@/components/widgets/cards/projectCards";
import { Link } from "react-router";
import type { Project } from "@/shared/entities/project";
import {
  SearchFilterBar,
  type FilterGroup,
} from "@/components/widgets/search-and-filters/SearchFilterBar";

// --- Constants ---
const searchKeys = (project: Project) => [project.title, project.description];

const FILTER_OPTIONS: FilterGroup[] = [
  {
    id: "status",
    label: "Status",
    type: "single",
    options: [
      { label: "All Status", value: "all" },
      { label: "To Do", value: "todo" },
      { label: "In Progress", value: "in-progress" },
      { label: "Complete", value: "complete" },
    ],
  },
  {
    id: "priority",
    label: "Priority",
    type: "multiple",
    options: [
      { label: "Low", value: "Low" },
      { label: "Medium", value: "Medium" },
      { label: "High", value: "High" },
    ],
  },
];

// --- Mock Data ---
const Projects: Project[] = [
  {
    id: "1",
    title: "Prototopi Mobile App",
    description: "Evaluate...",
    priority: "Medium",
    status: "todo",
    date: "Jun 8, 2025",
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      {
        name: "Jane Doe",
        avatar: "https://github.com/vercel.png",
      },
    ],
  },
  {
    id: "2",
    title: "YellyBox Project",
    description: "Innovative...",
    priority: "Low",
    status: "in-progress",
    date: "Jun 8, 2025",
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      {
        name: "Jane Doe",
        avatar: "https://github.com/vercel.png",
      },
    ],
  },
  {
    id: "3",
    title: "Mantraman (Branding)",
    description: "Elevate...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      {
        name: "Jane Doe",
        avatar: "https://github.com/vercel.png",
      },
    ],
  },
  {
    id: "4",
    title: "Proyecto Carnaval",
    description: "Carnaval...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      {
        name: "Jane Doe",
        avatar: "https://github.com/vercel.png",
      },
    ],
  },
  {
    id: "5",
    title: "Proyecto Carnaval",
    description: "Carnaval...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      {
        name: "Jane Doe",
        avatar: "https://github.com/vercel.png",
      },
    ],
  },
  {
    id: "6",
    title: "Proyecto Carnaval",
    description: "Carnaval...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      {
        name: "Jane Doe",
        avatar: "https://github.com/vercel.png",
      },
    ],
  },
  {
    id: "7",
    title: "Proyecto Carnaval",
    description: "Carnaval...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: [
      {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      {
        name: "Jane Doe",
        avatar: "https://github.com/vercel.png",
      },
    ],
  },
];

const ProjectsPage = () => {
  const [searchedProjects, setSearchedProjects] = useState<Project[]>(Projects);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({
    status: "all",
    priority: [],
  });

  const filteredProjects = useMemo(() => {
    let result = searchedProjects;

    // Filter by Status
    if (filters.status && filters.status !== "all") {
      result = result.filter((p) => p.status === filters.status);
    }

    // Filter by Priority
    const priorityFilter = filters.priority as string[];
    if (priorityFilter && priorityFilter.length > 0) {
      result = result.filter((p) => priorityFilter.includes(p.priority));
    }

    return result;
  }, [searchedProjects, filters]);

  const handleFilterChange = (groupId: string, value: string) => {
    setFilters((prev) => {
      const groupConfig = FILTER_OPTIONS.find((g) => g.id === groupId);
      if (!groupConfig) return prev;

      if (groupConfig.type === "multiple") {
        const current = (prev[groupId] as string[]) || [];
        const updated = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return { ...prev, [groupId]: updated };
      } else {
        return { ...prev, [groupId]: value };
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 px-1 w-full h-full bg-background font-sans overflow-hidden">
      {/* Header profesional */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-none">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FolderKanban className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Projects
            </h1>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            Manage your initiatives and track progress in real-time.
          </p>
        </div>

        <Button
          className="rounded-xl bg-primary hover:bg-primary/90 text-white shadow-lg min-h-10 shadow-primary/20 transition-all active:scale-95"
          size="lg"
          variant="default"
        >
          <Plus className="mr-2 size-4" />
          New Project
        </Button>
      </header>

      {/* Search & Filter Bar */}
      <SearchFilterBar
        data={Projects}
        searchKeys={searchKeys}
        onResultChange={setSearchedProjects}
        placeholder="Search projects..."
        filterOptions={FILTER_OPTIONS}
        selectedFilters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-1 pb-4">
        {/* Grid de Resultados */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeIn" }}
              >
                <Link to={`/projects/${project.id}`}>
                  <ProjectCard project={project} />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-3 h-full"
            >
              <div className="p-4 bg-muted/30 rounded-full">
                <Search className="size-10 opacity-20" />
              </div>
              <p className="text-lg font-semibold text-foreground">
                No projects found
              </p>
              <p className="text-sm">
                Try adjusting your search terms or filters.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;
