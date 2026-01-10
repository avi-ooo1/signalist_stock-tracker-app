import React, { useMemo } from 'react'
import countryList from 'react-select-country-list'
import { Controller, Control, FieldError } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface CountrySelectFieldProps {
    name: string
    label: string
    placeholder?: string
    control: Control<any>
    error?: FieldError
    required?: boolean
}

const CountrySelectField = ({ name, label, placeholder, control, error, required = false }: CountrySelectFieldProps) => {
    const options: { value: string; label: string }[] = useMemo(() => countryList().getData(), [])
    const [open, setOpen] = React.useState(false)

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">{label}</Label>
            <Controller
                name={name}
                control={control}
                rules={{ required: required ? `Please select ${label.toLowerCase()}` : false }}
                render={({ field }) => (
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className={cn(
                                    "w-full justify-between select-trigger text-white font-normal",
                                    !field.value && "!text-gray-500 font-normal"
                                )}
                            >
                                {field.value
                                    ? (
                                        <span className="flex items-center gap-2">
                                            <img
                                                src={`https://flagcdn.com/w40/${field.value.toLowerCase()}.png`}
                                                alt="flag"
                                                className="w-5 h-auto object-contain"
                                            />
                                            {options.find((option) => option.value === field.value)?.label}
                                        </span>
                                    )
                                    : placeholder}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 border-gray-600">
                            <Command className="bg-gray-800 text-white">
                                <CommandInput placeholder="Search country..." className="text-white placeholder:text-gray-400" />
                                <CommandList className="max-h-[300px]">
                                    <CommandEmpty>No country found.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((option) => (
                                            <CommandItem
                                                key={option.value}
                                                value={option.label}
                                                onSelect={(currentValue) => {
                                                    const selectedOption = options.find(o => o.label.toLowerCase() === currentValue.toLowerCase() || o.value === option.value);
                                                    if (selectedOption) {
                                                        field.onChange(selectedOption.value)
                                                    }
                                                    setOpen(false)
                                                }}
                                                className="data-[selected=true]:bg-gray-700 data-[selected=true]:text-white cursor-pointer"
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === option.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                <span className="flex items-center gap-2">
                                                    <img
                                                        src={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png`}
                                                        alt={`${option.label} flag`}
                                                        className="w-5 h-auto object-contain"
                                                    />
                                                    {option.label}
                                                </span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                )}
            />
            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    )
}

export default CountrySelectField;