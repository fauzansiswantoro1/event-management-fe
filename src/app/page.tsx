"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Search,
  MapPin,
  Users,
  Clock,
  Star,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

// Mock event data
const mockEvents = [
  {
    id: 1,
    title: "Tech Conference 2024",
    description:
      "Join industry leaders for the biggest tech conference of the year. Discover the latest innovations in AI, blockchain, and web development.",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "San Francisco, CA",
    category: "Technology",
    price: 299,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 1250,
    rating: 4.8,
    organizer: "TechEvents Inc.",
    venue: "Moscone Center",
    tags: ["AI", "Blockchain", "Web Dev"],
  },
  {
    id: 2,
    title: "Music Festival Summer",
    description:
      "Experience the best live music with top artists from around the world. Three days of non-stop entertainment.",
    date: "2024-06-20",
    time: "02:00 PM",
    location: "Austin, TX",
    category: "Music",
    price: 150,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 5000,
    rating: 4.9,
    organizer: "Music Events Co.",
    venue: "Austin Music Park",
    tags: ["Rock", "Pop", "Electronic"],
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    description:
      "Taste exquisite dishes from renowned chefs and sample premium wines from around the globe.",
    date: "2024-04-10",
    time: "11:00 AM",
    location: "New York, NY",
    category: "Food",
    price: 75,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 800,
    rating: 4.7,
    organizer: "Culinary Events",
    venue: "Jacob K. Javits Convention Center",
    tags: ["Gourmet", "Wine", "Cooking"],
  },
  {
    id: 4,
    title: "Startup Pitch Competition",
    description:
      "Watch innovative startups pitch their ideas to top investors. Network with entrepreneurs and VCs.",
    date: "2024-05-05",
    time: "10:00 AM",
    location: "Seattle, WA",
    category: "Business",
    price: 50,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 300,
    rating: 4.6,
    organizer: "Startup Hub",
    venue: "Seattle Convention Center",
    tags: ["Startups", "Investment", "Networking"],
  },
  {
    id: 5,
    title: "Art Gallery Opening",
    description:
      "Discover contemporary art from emerging and established artists. Opening night with artist meet & greet.",
    date: "2024-03-25",
    time: "06:00 PM",
    location: "Los Angeles, CA",
    category: "Art",
    price: 25,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 200,
    rating: 4.5,
    organizer: "Modern Art Gallery",
    venue: "LA Contemporary Art Museum",
    tags: ["Contemporary", "Painting", "Sculpture"],
  },
  {
    id: 6,
    title: "Marathon Championship",
    description:
      "Join thousands of runners in this annual marathon. All skill levels welcome with various distance options.",
    date: "2024-04-28",
    time: "07:00 AM",
    location: "Boston, MA",
    category: "Sports",
    price: 100,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 2500,
    rating: 4.8,
    organizer: "Boston Athletic Association",
    venue: "Boston Common",
    tags: ["Running", "Marathon", "Fitness"],
  },
  {
    id: 7,
    title: "Digital Marketing Summit",
    description:
      "Learn the latest digital marketing strategies from industry experts. Workshops and networking included.",
    date: "2024-05-15",
    time: "09:30 AM",
    location: "Chicago, IL",
    category: "Business",
    price: 199,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 600,
    rating: 4.7,
    organizer: "Marketing Pro Events",
    venue: "Chicago Convention Center",
    tags: ["SEO", "Social Media", "Analytics"],
  },
  {
    id: 8,
    title: "Jazz Night Live",
    description:
      "An intimate evening with world-class jazz musicians. Premium cocktails and fine dining available.",
    date: "2024-03-30",
    time: "08:00 PM",
    location: "New Orleans, LA",
    category: "Music",
    price: 85,
    image: "/placeholder.svg?height=200&width=300",
    attendees: 150,
    rating: 4.9,
    organizer: "Jazz Club NOLA",
    venue: "Blue Note Jazz Club",
    tags: ["Jazz", "Live Music", "Cocktails"],
  },
];

const categories = [
  "All",
  "Technology",
  "Music",
  "Food",
  "Business",
  "Art",
  "Sports",
];
const locations = [
  "All",
  "San Francisco, CA",
  "Austin, TX",
  "New York, NY",
  "Seattle, WA",
  "Los Angeles, CA",
  "Boston, MA",
  "Chicago, IL",
  "New Orleans, LA",
];

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function EventinLanding() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<
    (typeof mockEvents)[0] | null
  >(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const eventsPerPage = 6;

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        event.description
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        event.tags.some((tag) =>
          tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      const matchesLocation =
        selectedLocation === "All" || event.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [debouncedSearchTerm, selectedCategory, selectedLocation]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBuyTickets = () => {
    if (selectedEvent) {
      alert(
        `Successfully purchased ${ticketQuantity} ticket(s) for ${
          selectedEvent.title
        }! Total: $${selectedEvent.price * ticketQuantity}`
      );
      setSelectedEvent(null);
      setTicketQuantity(1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      {/* Header */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Calendar className="h-12 w-12 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl font-bold text-white">Eventin</h1>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Events
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-indigo-100">
            Find and book tickets for the best events in your city
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search events, categories, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg bg-white text-gray-900 border-0 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover events that match your interests. Click on any category
              to filter events.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => {
              const categoryCount = mockEvents.filter(
                (event) => event.category === category
              ).length;
              const categoryIcons = {
                Technology: "💻",
                Music: "🎵",
                Food: "🍽️",
                Business: "💼",
                Art: "🎨",
                Sports: "⚽",
              };

              return (
                <Card
                  key={category}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 ${
                    selectedCategory === category
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-indigo-300"
                  }`}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">
                      {categoryIcons[category as keyof typeof categoryIcons]}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {category}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {categoryCount} events
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("All");
                setCurrentPage(1);
              }}
              className={`border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white ${
                selectedCategory === "All" ? "bg-indigo-600 text-white" : ""
              }`}
            >
              View All Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-700">Filters:</span>
              </div>
              {selectedCategory !== "All" && (
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="ml-2 hover:text-indigo-900"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedLocation !== "All" && (
                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                  {selectedLocation}
                  <button
                    onClick={() => setSelectedLocation("All")}
                    className="ml-2 hover:text-indigo-900"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredEvents.length} Events Found
            </h3>
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          </div>

          {currentEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No events found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentEvents.map((event) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
                >
                  <div className="relative">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-indigo-600 hover:bg-indigo-700">
                      {event.category}
                    </Badge>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium">
                        {event.rating}
                      </span>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <h4 className="font-bold text-lg text-gray-900 line-clamp-2">
                      {event.title}
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {event.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0 pb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {event.date} at {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {event.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="text-2xl font-bold text-indigo-600">
                        ${event.price}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            className="bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => setSelectedEvent(event)}
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className={
                        currentPage === page
                          ? "bg-indigo-600 hover:bg-indigo-700"
                          : "border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                      }
                    >
                      {page}
                    </Button>
                  )
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <Dialog
          open={!!selectedEvent}
          onOpenChange={() => setSelectedEvent(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {selectedEvent.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <Image
                src={selectedEvent.image || "/placeholder.svg"}
                alt={selectedEvent.title}
                width={600}
                height={300}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Event Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span>
                          {selectedEvent.date} at {selectedEvent.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>
                          {selectedEvent.venue}, {selectedEvent.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{selectedEvent.attendees} attendees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{selectedEvent.rating} rating</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Organizer
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedEvent.organizer}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedEvent.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Description
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <Separator />

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Purchase Tickets
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Price per ticket:
                        </span>
                        <span className="font-bold text-indigo-600">
                          ${selectedEvent.price}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-600">
                          Quantity:
                        </label>
                        <Select
                          value={ticketQuantity.toString()}
                          onValueChange={(value) =>
                            setTicketQuantity(Number.parseInt(value))
                          }
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between font-bold">
                        <span>Total:</span>
                        <span className="text-indigo-600">
                          ${selectedEvent.price * ticketQuantity}
                        </span>
                      </div>

                      <Button
                        onClick={handleBuyTickets}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                      >
                        Buy Tickets
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
