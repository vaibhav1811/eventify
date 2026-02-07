import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

export type ThemeType = 'neon' | 'elegant' | 'minimal' | 'playful';

interface ThemeOption {
    id: ThemeType;
    name: string;
    description: string;
    previewColor: string;
    previewImage: string;
}

export const THEMES: ThemeOption[] = [
    {
        id: 'neon',
        name: 'Neon Nights',
        description: 'Vibrant & energetic. Perfect for parties.',
        previewColor: 'from-purple-600 to-blue-600',
        previewImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'elegant',
        name: 'Golden Hour',
        description: 'Sophisticated & warm. Ideal for weddings.',
        previewColor: 'from-amber-200 to-yellow-500',
        previewImage: 'https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'minimal',
        name: 'Clean Slate',
        description: 'Modern & airy. Great for professional events.',
        previewColor: 'from-emerald-400 to-teal-500',
        previewImage: 'https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'playful',
        name: 'Confetti',
        description: 'Fun & colorful. Best for birthdays.',
        previewColor: 'from-pink-400 to-rose-500',
        previewImage: 'https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=400' // Placeholder 
    }
];

interface ThemeSelectorProps {
    selectedTheme: ThemeType;
    onSelect: (theme: ThemeType) => void;
}

export function ThemeSelector({ selectedTheme, onSelect }: ThemeSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-4">
            {THEMES.map((theme) => (
                <motion.div
                    key={theme.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect(theme.id)}
                    className={cn(
                        "relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 aspect-[4/3] group",
                        selectedTheme === theme.id
                            ? "border-blue-500 shadow-lg shadow-blue-500/20"
                            : "border-transparent hover:border-gray-200"
                    )}
                >
                    {/* Background Image */}
                    <img
                        src={theme.previewImage}
                        alt={theme.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Gradient Overlay */}
                    <div className={cn(
                        "absolute inset-0 bg-gradient-to-br mix-blend-multiply opacity-60",
                        theme.previewColor
                    )} />

                    {/* Content */}
                    <div className="absolute inset-0 p-3 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex justify-between items-end">
                            <div>
                                <h3 className="text-white font-bold text-sm">{theme.name}</h3>
                                <p className="text-gray-200 text-xs line-clamp-1">{theme.description}</p>
                            </div>
                            {selectedTheme === theme.id && (
                                <div className="bg-blue-500 rounded-full p-1">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
