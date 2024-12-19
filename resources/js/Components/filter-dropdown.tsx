import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

interface FilterDropdownProps {
    options: string[];
    onFilterChange: (selectedFilters: string[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    options,
    onFilterChange,
}) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleCheckboxChange = (value: string) => {
        setSelectedFilters((prev) => {
            const newSelectedFilters = prev.includes(value)
                ? prev.filter((filter) => filter !== value)
                : [...prev, value];
            onFilterChange(newSelectedFilters);
            return newSelectedFilters;
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size={"sm"}>
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-4">
                <h3 className="text-lg font-medium mb-2">Select Filters</h3>
                <ScrollArea className="max-h-60">
                    <div className="space-y-2">
                        {options.map((option) => (
                            <div
                                key={option}
                                className="flex items-center space-x-2"
                            >
                                <Checkbox
                                    id={option}
                                    checked={selectedFilters.includes(option)}
                                    onCheckedChange={() =>
                                        handleCheckboxChange(option)
                                    }
                                />
                                <Label htmlFor={option}>{option}</Label>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
};

export default FilterDropdown;
