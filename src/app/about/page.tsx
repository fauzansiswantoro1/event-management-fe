import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Zap, Shield, Heart, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-50 to-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 mb-4">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900">
                  About Eventin
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
                  Revolutionizing event management with intelligent planning,
                  seamless coordination, and unforgettable experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                  Empowering Event Excellence
                </h2>
                <p className="text-gray-600 md:text-lg">
                  At Eventin, we believe every event has the potential to create
                  lasting memories and meaningful connections. Our mission is to
                  provide event organizers with the tools, insights, and support
                  they need to transform their vision into extraordinary
                  experiences.
                </p>
                <div className="flex items-center space-x-2 text-indigo-600">
                  <Target className="h-5 w-5" />
                  <span className="font-medium">
                    Founded in 2024 with a vision for the future
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/event-picture.png"
                  width={500}
                  height={400}
                  alt="Team collaboration"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                  Our Values
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  What Drives Us Forward
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  Our core values shape everything we do, from product
                  development to customer relationships.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mx-auto mb-4">
                    <Zap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    We continuously push boundaries to deliver cutting-edge
                    solutions that anticipate and exceed our users needs.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mx-auto mb-4">
                    <Heart className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    Passion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Every event matters to us. We bring enthusiasm and
                    dedication to help create experiences that truly resonate.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mx-auto mb-4">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">
                    Reliability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    Trust is earned through consistent performance. We ensure
                    our platform is dependable when it matters most.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <Image
                  src="/party-image.jpg"
                  width={500}
                  height={400}
                  alt="Event planning dashboard"
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                  What We Do
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                  Comprehensive Event Solutions
                </h2>
                <p className="text-gray-600 md:text-lg">
                  From intimate gatherings to large-scale conferences, Eventin
                  provides a complete suite of tools to plan, manage, and
                  execute successful events. Our platform combines intuitive
                  design with powerful functionality to streamline every aspect
                  of event management.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-gray-700">
                      Smart event planning and scheduling
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-gray-700">
                      Seamless attendee management
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-gray-700">
                      Real-time analytics and insights
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                    <span className="text-gray-700">
                      Integrated communication tools
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm text-indigo-800">
                  Our Team
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                  Meet the People Behind Eventin
                </h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl">
                  A diverse team of passionate professionals dedicated to
                  revolutionizing the event industry.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              {[1, 2].map((i) => (
                <Card
                  key={i}
                  className="border-0 shadow-md hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="text-center">
                    <Image
                      src={`/avatar-placeholder.png`}
                      width={120}
                      height={120}
                      alt={`Team member ${i}`}
                      className="rounded-full mx-auto mb-4"
                    />
                    <CardTitle className="text-xl text-gray-900">
                      Team Member {i}
                    </CardTitle>
                    <CardDescription className="text-indigo-600 font-medium">
                      {i === 1
                        ? "Muhamad Fauzan Siswantoro"
                        : i === 2
                        ? "Rizki Cahyo Sasongko"
                        : "Head of Design"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">
                      Passionate about creating exceptional event experiences
                      through innovative technology and user-centered design.
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-indigo-600">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Ready to Transform Your Events?
                </h2>
                <p className="max-w-[600px] text-indigo-100 md:text-xl">
                  Join thousands of event organizers who trust Eventin to bring
                  their vision to life.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/register">
                  <Button className="bg-white text-indigo-600 hover:bg-gray-100">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
