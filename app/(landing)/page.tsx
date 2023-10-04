"use client";

import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Playground from "@/components/playground";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import JournalTableLanding from "@/components/journal-table-landing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  const router = useRouter();
  const { userId } = useAuth();

  const headline = userId ? "Continue your Journal" : "Start Journaling now";

  const freqQuestions = [
    {
      question: "What is Journally?",
      answer:
        "Journally is an AI-powered journaling website designed to help individuals reflect on their daily lives, set and achieve goals, and gain insights into their personal growth and well-being through journaling.",
    },
    {
      question: "How does Journally use AI?",
      answer:
        "Journally uses advanced natural language processing (NLP) and machine learning technologies to analyze journal entries. It provides personalized insights, identifies emotional patterns, and offers suggestions for personal growth based on the user's journal content.",
    },
    {
      question: "Is Journally free to use?",
      answer:
        "Yes, Journally offers a free basic version for users. However, there may be premium features or subscription options for users who want access to advanced analytics and additional functionalities in the future.",
    },
    {
      question:
        "How can Journally ensure the privacy and security of my journal entries?",
      answer:
        "Journally takes user privacy and data security seriously. We employ industry-standard encryption protocols and follow best practices to protect user data. You have control over who can access your journal entries.",
    },
    {
      question: "What platforms and devices is Journally available on?",
      answer:
        "Journally is accessible through web browsers on desktop computers, laptops, and mobile devices. We are also working on mobile apps for a seamless on-the-go journaling experience.",
    },
  ];

  return (
    <>
      <Navbar />
      <div>
        <div className="items-center justify-center pt-10 bg-[#1A1A1D] relative">
          <div className="font-semibold text-white text-4xl md:text-5xl md:px-24 px-20 text-center">
            <p> Jot down your journal with </p>
            <a className="text-[#C3073F]">Journally.</a>
          </div>
          <div className="font-thin text-white text-sm md:text-lg/relaxed lg:mx-60 mx-20 mt-2 text-center tracking-wider">
            <p>
              Our technology provides insights to help individuals reflect, set
              goals, and achieve positive change in their lives.
            </p>
          </div>
          <div className="flex items-center justify-center pt-10">
            <Button
              onClick={() => {
                router.push("/dashboard");
              }}
              className="flex items-center rounded-lg bg-white px-4 py-2 font-ligh text-[#C3073F] text-md tracking-wider"
            >
              {headline}
              <MoveRight className="ml-2" width={16} />
            </Button>
          </div>
        </div>
        <svg
          className="mt-[-5px] mb-[-28px] md:mt-[-100px] lg:mt-[-150px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#1A1A1D"
            fill-opacity="1"
            d="M0,320L34.3,314.7C68.6,309,137,299,206,282.7C274.3,267,343,245,411,234.7C480,224,549,224,617,240C685.7,256,754,288,823,298.7C891.4,309,960,299,1029,266.7C1097.1,235,1166,181,1234,170.7C1302.9,160,1371,192,1406,208L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
          ></path>
        </svg>
        <div className="lg:mx-48 mx-10 mt-10">
          <h3 className="font-semibold text-lg tracking-wider pb-1 text-[#C3073F]">
            JOURNALLY
          </h3>
          <p className="font-bold text-3xl sm:w-[70%] font-sans pb-3">
            Elevate Your Everyday
          </p>
          <p className="font-light text-lg sm:w-[50%] font-sans">
            Seamless, creative, and effortless. Simply list your activities, and
            watch as Journally weaves them into unforgettable narratives.
          </p>
          <Playground />
        </div>
        <svg
          className="mt-[-40px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#C3073F"
            fill-opacity="1"
            d="M0,192L120,208C240,224,480,256,720,261.3C960,267,1200,245,1320,234.7L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
        <div className="bg-[#C3073F]">
          <div className="lg:mx-48 mx-10 text-white">
            <p className="font-bold text-3xl font-sans pb-3">
              Tone It Your Way
            </p>
            <p className="font-light text-lg sm:w-[80%] font-sans pb-5">
              is our invitation to users seeking a uniquely tailored journaling
              adventure. With this feature, you can shape your journals voice to
              suit your mood, preferences, and storytelling style.
            </p>
          </div>
          <div className="lg:mx-48 mx-10 grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            <Card className="border rounded-lg">
              <CardHeader className="text-[#C3073F] bg-green-100 rounded-lg">
                <CardTitle>Story Telling</CardTitle>
                <CardDescription>Fictional and Fantasy</CardDescription>
              </CardHeader>
              <CardContent className="mt-5">
                <p>
                  At 7 AM, the day began with a reluctant awakening. An 8 AM
                  shower and breakfast followed, setting the stage for my school
                  journey at 9 AM, which concluded at 11 AM. Lunchtime was a
                  rendezvous with friends, and K-dramas became the central theme
                  of our animated discussion. The clock struck 4 PM as I
                  returned home for dinner with the family. Finally, at 10 PM, I
                  surrendered to the embrace of sleep.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-[#C3073F] bg-blue-100 border rounded-md">
                <CardTitle>Creative</CardTitle>
                <CardDescription>Imaginative and artistic</CardDescription>
              </CardHeader>
              <CardContent className="mt-5">
                <p>
                  At the crack of dawn, I stirred from my slumber at 7 AM,
                  beckoned by the days first light. By 8 AM, the soothing
                  cascade of a warm shower and a nourishing breakfast set the
                  stage for my journey. With the clock ticking toward 9 AM, I
                  embarked on the path to knowledge, arriving at the hallowed
                  halls of academia ...
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-[#C3073F] bg-pink-100 border rounded-md">
                <CardTitle>Reflective</CardTitle>
                <CardDescription>Thoughtful and introspective</CardDescription>
              </CardHeader>
              <CardContent className="mt-5">
                <p>
                  As the morning sun gently broke the darkness, I found myself
                  rousing at 7 AM. It was another day, a fresh canvas upon which
                  the strokes of life would be painted. The ritual of a warm
                  shower and breakfast at 8 AM held a familiar comfort, a
                  reminder of the rhythm of existence ...
                </p>
              </CardContent>
            </Card>
            <Card className="lg:block md:hidden">
              <CardHeader className="text-[#C3073F] bg-red-100 border rounded-md">
                <CardTitle>Humorous</CardTitle>
                <CardDescription className="">
                  Light-hearted and funny
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-5">
                <p>
                  At the ungodly hour of 7 AM, my bed attempted to kidnap me,
                  but I managed a daring escape. By 8 AM, I was in the epic
                  battle of my life: the shower versus my bedhead. Spoiler
                  alert: the bedhead won. School at 9 AM felt like I had entered
                  the Twilight Zone, but by 11 AM, I was free again, ...
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#C3073F"
            fill-opacity="1"
            d="M0,128L80,112C160,96,320,64,480,74.7C640,85,800,139,960,144C1120,149,1280,107,1360,85.3L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <div className="lg:mx-48 mx-10">
          <p className="font-bold text-3xl font-sans pb-3">
            Organize Your Thoughts
          </p>
          <p className="font-light text-lg sm:w-[80%] font-sans pb-5">
            Experience streamlined journal organization with our intuitive table
            list format. Users can effortlessly structure and categorize their
            entries, fostering clarity and accessibility.
          </p>
          <JournalTableLanding />
        </div>
        <div className="lg:mx-48 mx-10 pt-20">
          <p className="font-bold text-3xl font-sans pb-3">
            Frequently Asked Questions
          </p>
          <div className="mb-10">
            {freqQuestions.map((item) => (
              <Accordion
                type="single"
                collapsible
                className="md:text-lg text-md"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
        <Separator className="mt-20" />
        <div className="lg:mx-48 mx-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
