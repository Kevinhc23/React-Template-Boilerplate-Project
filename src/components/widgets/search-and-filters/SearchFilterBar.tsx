import { useEffect, useState, useMemo } from "react";
import { Searcher } from "fast-fuzzy";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Check, ListFilter } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type FilterOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type FilterGroup = {
  id: string;
  label: string;
  type: "single" | "multiple";
  options: FilterOption[];
};

interface SearchFilterBarProps<T extends string | object> {
  data: T[];
  searchKeys: (item: T) => string[];
  onResultChange: (filtered: T[]) => void;
  placeholder?: string;
  threshold?: number;
  filterOptions?: FilterGroup[];
  selectedFilters?: Record<string, string | string[]>;
  onFilterChange?: (groupId: string, value: string) => void;
}

export function SearchFilterBar<T extends string | object>({
  data,
  searchKeys,
  onResultChange,
  placeholder = "Search...",
  threshold = 0.8,
  filterOptions = [],
  selectedFilters = {},
  onFilterChange,
}: SearchFilterBarProps<T>) {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300);

  const searcher = useMemo(() => {
    return new Searcher(data, {
      keySelector: searchKeys,
      threshold: threshold,
    });
  }, [data, searchKeys, threshold]);

  const filteredData = useMemo(() => {
    if (!debouncedQuery.trim()) return data;
    return searcher.search(debouncedQuery) as T[];
  }, [debouncedQuery, data, searcher]);

  useEffect(() => {
    onResultChange(filteredData);
  }, [filteredData, onResultChange]);

  const toggleFilter = (groupId: string, value: string) => {
    if (onFilterChange) {
      onFilterChange(groupId, value);
    }
  };

  const isSelected = (groupId: string, value: string) => {
    const groupSelection = selectedFilters[groupId];
    if (!groupSelection) return false;
    if (Array.isArray(groupSelection)) {
      return groupSelection.includes(value);
    }
    return groupSelection === value;
  };

  return (
    <section className="flex flex-col sm:flex-row gap-3 items-center justify-between py-2 bg-background/95 backdrop-blur-md flex-none">
      <div className="relative w-full sm:w-96 group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors" />
        <Input
          placeholder={placeholder}
          className="pl-10 h-11 rounded-xl bg-muted/40 border-border/40 focus-visible:ring focus-visible:ring-primary/20 transition-all border shadow-sm ease-in-out duration-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="rounded-xl h-11 border-border/60 gap-2 hover:bg-muted/50 font-medium data-[state=open]:bg-muted/50 transition-colors cursor-pointer"
          >
            <ListFilter className="size-4" />
            <span>Filters</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 p-2 rounded-xl bg-background/95 backdrop-blur-md border-border/60 shadow-xl"
        >
          <DropdownMenuLabel className="px-3 py-2 text-sm font-bold text-foreground">
            Filter Options
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mx-1 bg-border/60" />

          {filterOptions.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No filters available
            </div>
          ) : (
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              <AnimatePresence>
                {filterOptions.map((group, groupIndex) => (
                  <motion.div
                    key={group.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: groupIndex * 0.05 }}
                  >
                    {group.type === "single" ? (
                      <DropdownMenuGroup className="py-1">
                        <h4 className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {group.label}
                        </h4>
                        <RadioGroup
                          value={(selectedFilters[group.id] as string) || ""}
                          onValueChange={(value) =>
                            toggleFilter(group.id, value)
                          }
                          className="px-1 gap-1"
                        >
                          {group.options.map((option) => (
                            <div
                              key={option.value}
                              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group/item"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFilter(group.id, option.value);
                              }}
                            >
                              <RadioGroupItem
                                value={option.value}
                                id={`${group.id}-${option.value}`}
                                className="border-muted-foreground/30 text-primary data-[state=checked]:border-primary"
                              />
                              <label
                                htmlFor={`${group.id}-${option.value}`}
                                className="flex-1 text-sm font-medium cursor-pointer text-foreground/80 group-hover/item:text-foreground"
                              >
                                {option.icon && (
                                  <span className="mr-2 text-muted-foreground inline-block align-middle">
                                    {option.icon}
                                  </span>
                                )}
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </DropdownMenuGroup>
                    ) : (
                      <div className="py-1">
                        <h4 className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {group.label}
                        </h4>
                        {group.options.map((option) => {
                          const selected = isSelected(group.id, option.value);
                          return (
                            <DropdownMenuItem
                              key={option.value}
                              className={cn(
                                "flex items-center gap-2 px-3 py-2 cursor-pointer rounded-lg transition-colors mx-1",
                                selected
                                  ? "bg-primary/10 text-primary focus:bg-primary/15"
                                  : "text-foreground/80 focus:bg-muted",
                              )}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleFilter(group.id, option.value);
                              }}
                            >
                              <div
                                className={cn(
                                  "flex items-center justify-center size-4 rounded-sm border transition-colors",
                                  selected
                                    ? "bg-primary border-primary text-primary-foreground hover:bg-primary/80"
                                    : "border-muted-foreground/30",
                                )}
                              >
                                {selected && (
                                  <Check className="size-3 text-white! hover:text-white!" />
                                )}
                              </div>

                              {option.icon && (
                                <span className="text-muted-foreground">
                                  {option.icon}
                                </span>
                              )}
                              <span className="flex-1 text-sm font-medium">
                                {option.label}
                              </span>
                            </DropdownMenuItem>
                          );
                        })}
                      </div>
                    )}
                    {groupIndex < filterOptions.length - 1 && (
                      <DropdownMenuSeparator className="mx-1 my-1 bg-border/40" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
