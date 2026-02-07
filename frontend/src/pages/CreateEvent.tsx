import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../lib/api';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Layout } from '../components/Layout';
import { ThemeSelector, ThemeType } from '../components/ThemeSelector';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Info, Check as CheckIcon, Plus, Trash2, Image as ImageIcon, List } from 'lucide-react';
import { cn } from '../lib/utils';

interface ItineraryItem {
    time: string;
    description: string;
}

export function CreateEvent() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState<ThemeType>('neon');
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date_time: '',
        location_name: '',
        itinerary: [] as ItineraryItem[],
        images: [] as string[],
    });

    // Temp state for new itinerary item
    const [newItem, setNewItem] = useState<ItineraryItem>({ time: '', description: '' });
    // Temp state for new image URL
    const [newImage, setNewImage] = useState('');

    const addItineraryItem = () => {
        if (newItem.time && newItem.description) {
            setFormData({ ...formData, itinerary: [...formData.itinerary, newItem] });
            setNewItem({ time: '', description: '' });
        }
    };

    const removeItineraryItem = (index: number) => {
        setFormData({ ...formData, itinerary: formData.itinerary.filter((_, i) => i !== index) });
    };

    const addImage = () => {
        if (newImage) {
            setFormData({ ...formData, images: [...formData.images, newImage] });
            setNewImage('');
        }
    };

    const removeImage = (index: number) => {
        setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const eventDataArray = { ...formData, theme };
            // @ts-ignore
            const event = await createEvent(eventDataArray);
            navigate(`/event/${event.slug}`);
        } catch (error) {
            console.error(error);
            alert('Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="text-4xl font-bold mb-2 text-gray-900">Create Your Event</h1>
                            <p className="text-gray-500 mb-8">Fill in the details to generate your private event website.</p>

                            <Card className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {/* Basic Details */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                            <Info className="w-5 h-5 text-blue-500" /> Event Details
                                        </h3>
                                        <Input
                                            label="Event Title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                            placeholder="e.g., Vaibhav's Birthday Bash"
                                            className="bg-gray-50 border-gray-200 focus:bg-white"
                                        />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                label="Date & Time"
                                                type="datetime-local"
                                                value={formData.date_time}
                                                onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                                                required
                                                className="bg-gray-50 border-gray-200 focus:bg-white"
                                            />
                                            <Input
                                                label="Location"
                                                value={formData.location_name}
                                                onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                                                required
                                                placeholder="e.g., Central Park, NY"
                                                className="bg-gray-50 border-gray-200 focus:bg-white"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-700">Description</label>
                                            <textarea
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all min-h-[120px] resize-y"
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                placeholder="Tell your guests what to expect..."
                                            />
                                        </div>
                                    </div>

                                    {/* Itinerary Section */}
                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                            <List className="w-5 h-5 text-blue-500" /> Itinerary (Optional)
                                        </h3>

                                        <div className="space-y-3">
                                            {formData.itinerary.map((item, index) => (
                                                <div key={index} className="flex gap-2 items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                                                    <span className="font-medium text-gray-900 min-w-[80px]">{item.time}</span>
                                                    <span className="flex-1 text-gray-600">{item.description}</span>
                                                    <button type="button" onClick={() => removeItineraryItem(index)} className="text-red-400 hover:text-red-600 p-1">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}

                                            <div className="flex gap-2">
                                                <Input
                                                    type="time"
                                                    value={newItem.time}
                                                    onChange={(e) => setNewItem({ ...newItem, time: e.target.value })}
                                                    className="w-[140px] bg-gray-50 border-gray-200 focus:bg-white"
                                                />
                                                <Input
                                                    placeholder="Activity (e.g., Cake Cutting)"
                                                    value={newItem.description}
                                                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                                    className="flex-1 bg-gray-50 border-gray-200 focus:bg-white"
                                                />
                                                <Button type="button" onClick={addItineraryItem} size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200 shadow-none">
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Gallery Section */}
                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                            <ImageIcon className="w-5 h-5 text-blue-500" /> Gallery (Optional)
                                        </h3>
                                        <div className="space-y-3">
                                            <div className="flex gap-2">
                                                <Input
                                                    placeholder="Paste Image URL..."
                                                    value={newImage}
                                                    onChange={(e) => setNewImage(e.target.value)}
                                                    className="flex-1 bg-gray-50 border-gray-200 focus:bg-white"
                                                />
                                                <Button type="button" onClick={addImage} size="sm" className="bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200 shadow-none">
                                                    <Plus className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            {formData.images.length > 0 && (
                                                <div className="grid grid-cols-3 gap-2 mt-2">
                                                    {formData.images.map((url, index) => (
                                                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                                                            <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <Button type="submit" disabled={loading} className="w-full py-4 text-lg font-medium" size="lg">
                                            {loading ? 'Creating Magic...' : 'Create & Publish Event'}
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </motion.div>

                        {/* Extra Content Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-blue-50 rounded-2xl p-8 border border-blue-100"
                        >
                            <h3 className="text-xl font-bold text-blue-900 mb-4">Why use Eventify?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3 text-blue-800">
                                    <div className="mt-1 bg-blue-200 rounded-full p-1"><CheckIcon className="w-3 h-3 text-blue-700" /></div>
                                    <span><strong>No Accounts Required:</strong> Guests can RSVP instantly without signing up.</span>
                                </li>
                                <li className="flex items-start gap-3 text-blue-800">
                                    <div className="mt-1 bg-blue-200 rounded-full p-1"><CheckIcon className="w-3 h-3 text-blue-700" /></div>
                                    <span><strong>Real-time Updates:</strong> Change details anytime and everyone sees the latest info.</span>
                                </li>
                                <li className="flex items-start gap-3 text-blue-800">
                                    <div className="mt-1 bg-blue-200 rounded-full p-1"><CheckIcon className="w-3 h-3 text-blue-700" /></div>
                                    <span><strong>Privacy First:</strong> Your event is only visible to people with the link.</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>

                    {/* Right Column: Sticky Preview & Theme */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="sticky top-24 space-y-8">
                            {/* Theme Selection */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose a Theme</h3>
                                <ThemeSelector selectedTheme={theme} onSelect={setTheme} />
                            </motion.div>

                            {/* Live Preview Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                                <div className="relative group perspective-1000">
                                    <div className={cn(
                                        "relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 aspect-[3/4] bg-gray-900 text-white p-6 flex flex-col justify-end",
                                        // Dynamic classes based on theme could go here
                                    )}>
                                        {/* Background based on theme */}
                                        <div className="absolute inset-0 transition-opacity duration-500">
                                            {theme === 'neon' && <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 mix-blend-multiply opacity-80" />}
                                            {theme === 'elegant' && <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-yellow-500 mix-blend-multiply opacity-60" />}
                                            {theme === 'minimal' && <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 mix-blend-multiply opacity-60" />}
                                            {theme === 'playful' && <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 mix-blend-multiply opacity-60" />}

                                            <img
                                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
                                                alt="Preview"
                                                className="absolute inset-0 w-full h-full object-cover -z-10"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        </div>

                                        <div className="relative z-10 space-y-4">
                                            <div>
                                                <p className="text-blue-200 text-sm font-medium tracking-wider uppercase mb-1">{theme} Theme</p>
                                                <h2 className="text-3xl font-bold leading-tight">
                                                    {formData.title || "Your Event Title"}
                                                </h2>
                                            </div>

                                            <div className="space-y-2 text-gray-200 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formData.date_time ? new Date(formData.date_time).toLocaleDateString() : "Date needs setting"}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{formData.date_time ? new Date(formData.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Time TBD"}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{formData.location_name || "Location TBD"}</span>
                                                </div>
                                            </div>

                                            <Button size="sm" className="w-full mt-4 bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 text-white">
                                                RSVP Now
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-center text-sm text-gray-400 mt-4">
                                        This is how your guests will see your invite card.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}


