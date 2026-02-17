import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, FolderKanban, Plus, Filter } from "lucide-react";
import { Searcher } from "fast-fuzzy";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import ProjectCard from "@/components/widgets/cards/projectCards";

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

// --- Mock Data ---
const Projects: Project[] = [
  {
    id: "1",
    title: "Prototopi Mobile App",
    description: "Evaluate...",
    priority: "Medium",
    status: "todo",
    date: "Jun 8, 2025",
    members: ["https://github.com/shadcn.png", "https://github.com/vercel.png"],
  },
  {
    id: "2",
    title: "YellyBox Project",
    description: "Innovative...",
    priority: "Low",
    status: "in-progress",
    date: "Jun 8, 2025",
    members: ["https://github.com/shadcn.png"],
  },
  {
    id: "3",
    title: "Mantraman (Branding)",
    description: "Elevate...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: ["https://github.com/vercel.png", "https://github.com/nextjs.png"],
  },
  {
    id: "4",
    title: "Proyecto Carnaval",
    description: "Carnaval...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: ["https://github.com/vercel.png", "https://github.com/nextjs.png"],
  },
  {
    id: "5",
    title: "Proyecto Carnaval",
    description: "Carnaval...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: ["https://github.com/vercel.png", "https://github.com/nextjs.png"],
  },
  {
    id: "6",
    title: "Proyecto Carnaval",
    description: "Carnaval...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: ["https://github.com/vercel.png", "https://github.com/nextjs.png"],
  },
  {
    id: "7",
    title: "Proyecto Carnaval",
    description: "Carnaval...",
    priority: "High",
    status: "complete",
    date: "Jun 8, 2025",
    members: ["https://github.com/vercel.png", "https://github.com/nextjs.png"],
  },
];

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searcher = useMemo(() => {
    return new Searcher(Projects, {
      keySelector: (obj) => [obj.title, obj.description],
      threshold: 0.8,
    });
  }, []);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return Projects;
    return searcher.search(searchQuery);
  }, [searchQuery, searcher]);

  return (
    /* CORRECCIÓN 1: Un solo contenedor con scroll. 
      Cambiamos h-dvh + overflow-y-auto por h-full para que el padre controle el scroll 
      o permitamos que crezca según el contenido. 
    */
    <div className="flex flex-col gap-6 w-full h-full bg-background font-sans overflow-hidden">
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
      <section className="flex flex-col sm:flex-row gap-3 items-center justify-between py-2 bg-background/95 backdrop-blur-md flex-none">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
          <Input
            placeholder="Search projects..."
            className="pl-10 h-11 rounded-xl bg-muted/40 border-none focus-visible:ring-primary/30 transition-all outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="rounded-xl h-11 border-border/60 gap-2 hover:bg-muted/50"
        >
          <Filter className="size-4" /> Filter
        </Button>
      </section>

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
                <ProjectCard project={project} />
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
              <Button
                variant="link"
                onClick={() => setSearchQuery("")}
                className="text-primary font-bold"
              >
                Clear search
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProjectsPage;
