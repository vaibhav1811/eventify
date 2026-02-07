import { useEffect, useState } from 'react';
import { getEvents } from '../lib/api';
import { EventCard } from '../components/EventCard';
import { Layout } from '../components/Layout';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/FeatureCard';
import { StepCard } from '../components/StepCard';
import { Calendar, Globe, Share2, Smartphone } from 'lucide-react';

export function Home() {
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        getEvents()
            .then(setEvents)
            .catch(console.error);
    }, []);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <Layout>
            <div className="space-y-24 pb-20">
                {/* Hero Section */}
                <section className="text-center space-y-8 pt-10">
                    <motion.div {...fadeInUp}>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-gray-900">
                            Your Event, <br />
                            <span className="text-blue-600">Your Private Website.</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Create a stunning, dedicated website for your event in seconds.
                            Share a single link with everything your guests need—no clutter, no ads, just your moment.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link to="/create">
                            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
                                Create Your Event Now
                            </Button>
                        </Link>
                    </motion.div>
                </section>

                {/* Features Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        icon={<Globe className="w-8 h-8 text-blue-500" />}
                        title="Private Website"
                        description="Get a unique URL just for your event. No apps to download, no accounts for guests."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<Smartphone className="w-8 h-8 text-cyan-500" />}
                        title="Mobile Perfect"
                        description="Looks amazing on any device. Your invitation adapts beautifully to phones and tablets."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Share2 className="w-8 h-8 text-blue-500" />}
                        title="Instant Sharing"
                        description="Share via WhatsApp, iMessage, or email with a single tap. It's friction-free."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={<Calendar className="w-8 h-8 text-cyan-500" />}
                        title="RSVP Management"
                        description="Track who's coming in real-time. Simple, hassle-free guest list management."
                        delay={0.4}
                    />
                </section>

                {/* How it Works */}
                <section className="relative overflow-hidden rounded-3xl bg-gray-50 border border-gray-200 p-8 md:p-12">
                    <div className="absolute inset-0 bg-grid-black/[0.02] bg-[length:32px_32px]" />
                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                                Create in 3 Simple Steps
                            </h2>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <StepCard
                                number={1}
                                title="Plan It"
                                description="Enter your event details—date, time, location, and a personal message."
                            />
                            <StepCard
                                number={2}
                                title="Customize It"
                                description="Choose a theme that matches your vibe. From elegant weddings to wild parties."
                            />
                            <StepCard
                                number={3}
                                title="Share It"
                                description="Get your private link and send it to your friends. Watch the RSVPs roll in."
                            />
                        </div>
                    </div>
                </section>

                {/* Templates Showcase (Static for now) */}
                <section className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">Stunning Templates</h2>
                        <p className="text-gray-600 text-lg">Choose a style that fits your occasion.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Template 1: Neon */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 mix-blend-multiply opacity-80" />
                            <img
                                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800"
                                alt="Neon Party"
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-2xl font-bold text-white">Neon Nights</h3>
                                <p className="text-gray-200">Perfect for parties & club events</p>
                            </div>
                        </motion.div>

                        {/* Template 2: Elegant */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-yellow-500 mix-blend-multiply opacity-60" />
                            <img
                                src="https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=800"
                                alt="Elegant Wedding"
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-2xl font-bold text-white">Golden Elegance</h3>
                                <p className="text-gray-200">Perfect for weddings & formals</p>
                            </div>
                        </motion.div>

                        {/* Template 3: Minimal */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 mix-blend-multiply opacity-60" />
                            <img
                                src="https://images.unsplash.com/photo-1530103862676-de3c9da59af7?auto=format&fit=crop&q=80&w=800"
                                alt="Casual Hangout"
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-2xl font-bold text-white">Casual Vibes</h3>
                                <p className="text-gray-200">Great for birthdays & meetups</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center py-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 rounded-3xl p-12 border border-gray-200"
                    >
                        <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Create Your Event?</h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            It only takes a minute to set up your private event website. No credit card required.
                        </p>
                        <Link to="/create">
                            <Button size="lg" className="px-10 py-6 text-lg shadow-xl shadow-blue-500/20">
                                Get Started for Free
                            </Button>
                        </Link>
                    </motion.div>
                </section>

                {/* Existing User Events Section (if any) */}
                {events.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-gray-900">Your Events</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.map((event: any, index) => (
                                <motion.div
                                    key={event._id || index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
}
