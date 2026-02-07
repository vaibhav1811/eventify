import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventBySlug } from '../lib/api';
import { Layout } from '../components/Layout';
import { format } from 'date-fns';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { THEMES } from '../components/ThemeSelector';
import { Calendar, MapPin, Clock, Share2, List, Image as ImageIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

export function EventDetails() {
    const { slug } = useParams();
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            getEventBySlug(slug)
                .then(setEvent)
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [slug]);

    if (loading) return <Layout><div className="text-center py-20 animate-pulse text-gray-500">Loading details...</div></Layout>;
    if (!event) return <Layout><div className="text-center py-20 text-red-500">Event not found</div></Layout>;

    // Find theme or default to neon
    const currentTheme = THEMES.find(t => t.id === event.theme) || THEMES[0];

    // Construct gradient classes based on theme
    const bgGradient = `bg-gradient-to-br ${currentTheme.previewColor}`;
    const textGradient = `bg-gradient-to-r ${currentTheme.previewColor} bg-clip-text text-transparent`;

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    return (
        <Layout>
            <div className="min-h-screen pb-20 bg-gray-50">
                {/* Hero Banner with Theme Styles */}
                <div className={cn("relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden", bgGradient)}>
                    <div className="absolute inset-0 bg-black/20" />
                    {currentTheme.previewImage && (
                        <img
                            src={currentTheme.previewImage}
                            alt="Theme Background"
                            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
                        />
                    )}

                    <div className="relative z-10 text-center space-y-4 p-4 max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl md:text-7xl font-black text-white drop-shadow-lg tracking-tight"
                        >
                            {event.title}
                        </motion.h1>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-wrap justify-center gap-6 text-white/90 text-lg font-medium"
                        >
                            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                <Calendar className="w-5 h-5" />
                                <span>{format(new Date(event.date_time), 'PPP')}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                <Clock className="w-5 h-5" />
                                <span>{format(new Date(event.date_time), 'p')}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                                <MapPin className="w-5 h-5" />
                                <span>{event.location_name}</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 -mt-20 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="md:col-span-2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="p-8 shadow-xl">
                                    <h2 className={cn("text-2xl font-bold mb-6", textGradient)}>About the Event</h2>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-lg">{event.description}</p>
                                </Card>
                            </motion.div>

                            {/* Itinerary Section */}
                            {event.itinerary && event.itinerary.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Card className="p-8 shadow-xl">
                                        <h2 className={cn("text-2xl font-bold mb-6 flex items-center gap-2", textGradient)}>
                                            <List className="w-6 h-6" /> Itinerary
                                        </h2>
                                        <div className="space-y-6">
                                            {event.itinerary.map((item: any, index: number) => (
                                                <div key={index} className="flex gap-4 items-start group">
                                                    <div className={cn("w-24 font-bold text-right pt-1", textGradient)}>
                                                        {item.time}
                                                    </div>
                                                    <div className="flex-1 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                                        <p className="text-gray-900 font-medium text-lg">{item.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            )}

                            {/* Gallery Section */}
                            {event.images && event.images.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Card className="p-8 shadow-xl">
                                        <h2 className={cn("text-2xl font-bold mb-6 flex items-center gap-2", textGradient)}>
                                            <ImageIcon className="w-6 h-6" /> Gallery
                                        </h2>
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                            {event.images.map((url: string, index: number) => (
                                                <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                    <img src={url} alt={`Event ${index}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </Card>
                                </motion.div>
                            )}
                        </div>

                        {/* Right Column: RSVP & Actions */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="sticky top-24 space-y-6"
                            >
                                <Card className="p-6 text-center shadow-xl border-t-8 border-t-blue-500">
                                    <h3 className="text-xl font-bold mb-2 text-gray-900">Are you going?</h3>
                                    <p className="text-gray-500 mb-6">Let the host know you're coming!</p>

                                    <div className="space-y-3">
                                        <Button className="w-full text-lg py-6" size="lg">
                                            Yes, I'm there!
                                        </Button>
                                        <Button variant="outline" className="w-full">
                                            Maybe
                                        </Button>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <Button variant="ghost" className="w-full gap-2 text-gray-600" onClick={handleShare}>
                                            <Share2 className="w-4 h-4" /> Share Event Link
                                        </Button>
                                    </div>
                                </Card>

                                <Card className="p-6 shadow-lg">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                                            <div>
                                                <p className="font-semibold text-gray-900">Location</p>
                                                <p className="text-gray-600">{event.location_name}</p>
                                            </div>
                                        </div>
                                        <div className="h-40 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                                            Map View
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
