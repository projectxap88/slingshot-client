
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Link,
  Bell,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Search,
  Mic,
} from "lucide-react";

export const MeetingNotes = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 justify-between">
            <div className="flex items-center gap-4 flex-1">
              <Button variant="ghost" size="icon" className="text-gray-500">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search meetings"
                  className="pl-10 bg-gray-100 border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Link className="h-5 w-5 text-gray-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Meeting Notes */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold mb-4">Intro call: AllFound</h1>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">Today</span>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs text-primary">JM</span>
                    </div>
                    <span className="text-sm text-gray-600">Jessica Mahendra +1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting Content */}
            <div className="space-y-6">
              <section>
                <h2 className="text-lg font-medium text-gray-900 mb-3">AllFound Overview</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>Currently 100 employees, adding 20 more next quarter</li>
                  <li>Office in San Francisco and Austin</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  Current Provider (Tuesday.ai)
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li>Data input is too manual and time-consuming</li>
                  <li>Too complex for non-technical team members</li>
                  <li>$180 per employee per year</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  Their Requirements
                </h2>
                <ul className="space-y-2 text-gray-600">
                  <li>Jess says finding a better employee engagement tool is "a priority for Q2"</li>
                  <li>Need secure information sharing capabilities</li>
                  <li>One-way or two-way data sharing required, contingent on internal approval</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-medium text-gray-900 mb-3">Next steps</h2>
                <ul className="space-y-2 text-gray-600">
                  <li>Jess to send over information pack</li>
                  <li>Jess to send contract if we want to proceed</li>
                  <li>Catchup scheduled for next week to figure out contractual details</li>
                </ul>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l pl-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">SHARE NOTES</h3>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-white border hover:bg-gray-50">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button className="flex-1 bg-white border hover:bg-gray-50">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Slack
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">ASK GRANOLA</h3>
                <div className="space-y-2">
                  <Button variant="secondary" className="w-full justify-start">
                    List action items
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    Write follow-up email
                  </Button>
                  <Button variant="secondary" className="w-full justify-start">
                    List Q&A
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white rounded-full shadow-lg border px-4 py-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mic className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </main>
    </div>
  );
};
